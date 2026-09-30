import { Pool } from 'pg'
import fs from 'fs'
import path from 'path'

function cleanUrl(raw?: string): string | undefined {
  if (!raw) return undefined
  let cleaned = raw.trim()
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim()
  }
  // Remove channel_binding parameter as node-pg doesn't support SCRAM channel binding in connection string
  cleaned = cleaned.replace(/[?&]channel_binding=[^&]+/g, '')
  // Ensure query string is well formed if leading ? was removed
  if (cleaned.includes('&') && !cleaned.includes('?')) {
    cleaned = cleaned.replace('&', '?')
  }
  return cleaned
}

// Get Neon database URL from environment
const rawDatabaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL
const databaseUrl = cleanUrl(rawDatabaseUrl)

let pool: Pool | null = null

if (databaseUrl) {
  try {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  } catch (err) {
    console.error('Failed to initialize Neon database pool:', err)
  }
}

export interface InstitutionRequest {
  id?: number | string
  school_name: string
  admin_name: string
  email: string
  phone?: string
  student_count?: string
  plan_selected?: string
  currency?: string
  country?: string
  notes?: string
  status?: string
  created_at?: string
}

const FALLBACK_FILE_PATH = path.join(process.cwd(), 'data', 'institution_requests.json')

function ensureFallbackDirectory() {
  const dir = path.dirname(FALLBACK_FILE_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function readFallbackRequests(): InstitutionRequest[] {
  try {
    ensureFallbackDirectory()
    if (!fs.existsSync(FALLBACK_FILE_PATH)) {
      // Seed with initial realistic demonstration request
      const initial: InstitutionRequest[] = [
        {
          id: 1,
          school_name: "Oakridge International Academy",
          admin_name: "Dr. Sarah Vance",
          email: "s.vance@oakridge.edu",
          phone: "+234 803 456 7890",
          student_count: "300 - 1,500 students",
          plan_selected: "Growth Plan (₦120,000/mo)",
          currency: "NGN",
          country: "Nigeria",
          notes: "Need secondary school SIS, parent fee billing portal in Naira, and attendance tracker.",
          status: "active_trial",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: 2,
          school_name: "Corona High School Lekki",
          admin_name: "Engr. Patrick Alabi",
          email: "admin@coronalekki.sch.ng",
          phone: "+234 802 334 1122",
          student_count: "1,500+ students",
          plan_selected: "Enterprise Custom (₦250,000/mo)",
          currency: "NGN",
          country: "Nigeria",
          notes: "Multi-campus branch deployment with custom fee collection gateway.",
          status: "pending_review",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        }
      ]
      fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(initial, null, 2))
      return initial
    }
    const raw = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8')
    return JSON.parse(raw) as InstitutionRequest[]
  } catch (err) {
    console.error('Error reading fallback storage:', err)
    return []
  }
}

function writeFallbackRequest(req: InstitutionRequest): InstitutionRequest {
  try {
    ensureFallbackDirectory()
    const current = readFallbackRequests()
    const newReq: InstitutionRequest = {
      ...req,
      id: current.length + 1,
      status: req.status || 'pending_review',
      created_at: new Date().toISOString(),
    }
    current.unshift(newReq)
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(current, null, 2))
    return newReq
  } catch (err) {
    console.error('Error writing fallback storage:', err)
    return req
  }
}

export async function checkDatabaseConnection(): Promise<{ connected: boolean; provider: 'neon' | 'local_fallback'; message: string }> {
  if (!pool) {
    return {
      connected: false,
      provider: 'local_fallback',
      message: 'Neon Database URL not configured yet. Using local persistent storage ready for Neon sync.',
    }
  }

  try {
    const client = await pool.connect()
    try {
      await client.query('SELECT 1')
      return {
        connected: true,
        provider: 'neon',
        message: 'Successfully connected to Neon PostgreSQL Database.',
      }
    } finally {
      client.release()
    }
  } catch (error: unknown) {
    const err = error as Error
    return {
      connected: false,
      provider: 'local_fallback',
      message: `Neon connection attempt failed: ${err.message}. Storage falling back to local store safely.`,
    }
  }
}

export async function initDatabase(): Promise<boolean> {
  if (!pool) return false
  try {
    const client = await pool.connect()
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS institution_requests (
          id SERIAL PRIMARY KEY,
          school_name VARCHAR(255) NOT NULL,
          admin_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(100),
          student_count VARCHAR(50),
          plan_selected VARCHAR(100),
          currency VARCHAR(10) DEFAULT 'NGN',
          country VARCHAR(100) DEFAULT 'Nigeria',
          notes TEXT,
          status VARCHAR(50) DEFAULT 'pending_review',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `)
      return true
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Failed to initialize institution_requests table in Neon:', err)
    return false
  }
}

export async function saveInstitutionRequest(data: Omit<InstitutionRequest, 'id' | 'created_at'>): Promise<{ record: InstitutionRequest; source: 'neon' | 'local_fallback' }> {
  if (pool) {
    try {
      await initDatabase()
      const client = await pool.connect()
      try {
        const query = `
          INSERT INTO institution_requests 
          (school_name, admin_name, email, phone, student_count, plan_selected, currency, country, notes, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
        `
        const values = [
          data.school_name,
          data.admin_name,
          data.email,
          data.phone || null,
          data.student_count || null,
          data.plan_selected || 'Growth Plan (₦120,000/mo)',
          data.currency || 'NGN',
          data.country || 'Nigeria',
          data.notes || null,
          data.status || 'pending_review',
        ]
        const res = await client.query(query, values)
        const record = res.rows[0] as InstitutionRequest

        // Also duplicate to fallback for audit/offline tolerance
        writeFallbackRequest(record)

        return { record, source: 'neon' }
      } finally {
        client.release()
      }
    } catch (err) {
      console.warn('Writing to Neon failed, persisting to local fallback store:', err)
    }
  }

  const record = writeFallbackRequest({
    ...data,
    status: data.status || 'pending_review',
  })
  return { record, source: 'local_fallback' }
}

export async function getInstitutionRequests(): Promise<{ requests: InstitutionRequest[]; source: 'neon' | 'local_fallback' }> {
  if (pool) {
    try {
      const client = await pool.connect()
      try {
        await initDatabase()
        const res = await client.query('SELECT * FROM institution_requests ORDER BY created_at DESC')
        if (res.rows && res.rows.length > 0) {
          return { requests: res.rows as InstitutionRequest[], source: 'neon' }
        }
      } finally {
        client.release()
      }
    } catch (err) {
      console.warn('Reading from Neon failed, reading local fallback store:', err)
    }
  }

  return { requests: readFallbackRequests(), source: 'local_fallback' }
}
