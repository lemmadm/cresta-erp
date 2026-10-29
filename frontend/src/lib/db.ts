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
          plan_selected: "Growth Plan (₦85,000/mo)",
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

        CREATE TABLE IF NOT EXISTS student_grades (
          id SERIAL PRIMARY KEY,
          student_id VARCHAR(50) NOT NULL,
          student_name VARCHAR(255) NOT NULL,
          class_name VARCHAR(100) NOT NULL,
          subject VARCHAR(100) NOT NULL,
          term VARCHAR(100) NOT NULL,
          ca1 NUMERIC(5,2) DEFAULT 0,
          ca2 NUMERIC(5,2) DEFAULT 0,
          midterm NUMERIC(5,2) DEFAULT 0,
          exam NUMERIC(5,2) DEFAULT 0,
          total NUMERIC(5,2) NOT NULL,
          letter_grade VARCHAR(10) NOT NULL,
          remarks TEXT,
          teacher_name VARCHAR(255) DEFAULT 'Ms. Helena Brooks',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `)
      return true
    } finally {
      client.release()
    }
  } catch (err) {
    console.error('Failed to initialize tables in Neon:', err)
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
          data.plan_selected || 'Growth Plan (₦85,000/mo)',
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

// ---------------------------------------------------------------------------
// TEACHER STUDENT GRADES DATA PERSISTENCE (NEON DB + LOCAL JSON FALLBACK)
// ---------------------------------------------------------------------------

export interface StudentGradeRecord {
  id?: number | string
  student_id: string
  student_name: string
  class_name: string
  subject: string
  term: string
  ca1: number
  ca2: number
  midterm: number
  exam: number
  total: number
  letter_grade: string
  remarks?: string
  teacher_name?: string
  created_at?: string
}

export function computeWaecGrade(total: number): { grade: string; remark: string } {
  if (total >= 75) return { grade: "A1", remark: "Distinction / Excellent" }
  if (total >= 70) return { grade: "B2", remark: "Very Good" }
  if (total >= 65) return { grade: "B3", remark: "Good" }
  if (total >= 60) return { grade: "C4", remark: "Credit" }
  if (total >= 55) return { grade: "C5", remark: "Credit" }
  if (total >= 50) return { grade: "C6", remark: "Credit" }
  if (total >= 45) return { grade: "D7", remark: "Pass" }
  if (total >= 40) return { grade: "E8", remark: "Pass" }
  return { grade: "F9", remark: "Fail / Needs Remediation" }
}

const FALLBACK_GRADES_PATH = path.join(process.cwd(), 'data', 'student_grades.json')

function readFallbackGrades(): StudentGradeRecord[] {
  try {
    ensureFallbackDirectory()
    if (!fs.existsSync(FALLBACK_GRADES_PATH)) {
      const initialGrades: StudentGradeRecord[] = [
        {
          id: 1,
          student_id: "CRST-STU-8821",
          student_name: "Samuel Adeyemi",
          class_name: "Grade 10-A (SSS 1)",
          subject: "Biology",
          term: "Term 2 - 2026/2027",
          ca1: 9.5,
          ca2: 9.0,
          midterm: 19.0,
          exam: 56.5,
          total: 94.0,
          letter_grade: "A1",
          remarks: "Exceptional analytical precision in genetic Punnett squares and cellular respiration.",
          teacher_name: "Ms. Helena Brooks",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: 2,
          student_id: "CRST-STU-8822",
          student_name: "Chioma Okonkwo",
          class_name: "Grade 10-A (SSS 1)",
          subject: "Biology",
          term: "Term 2 - 2026/2027",
          ca1: 8.5,
          ca2: 8.5,
          midterm: 18.0,
          exam: 52.0,
          total: 87.0,
          letter_grade: "A1",
          remarks: "Excellent grasp of plant anatomy and specimen dissection techniques.",
          teacher_name: "Ms. Helena Brooks",
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: 3,
          student_id: "CRST-STU-8823",
          student_name: "Tunde Bakare",
          class_name: "Grade 10-A (SSS 1)",
          subject: "Biology",
          term: "Term 2 - 2026/2027",
          ca1: 8.0,
          ca2: 7.5,
          midterm: 16.5,
          exam: 48.0,
          total: 80.0,
          letter_grade: "A1",
          remarks: "Very diligent lab reports, shows strong aptitude in physiology.",
          teacher_name: "Ms. Helena Brooks",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 4,
          student_id: "CRST-STU-8824",
          student_name: "Amina Bello",
          class_name: "Grade 10-A (SSS 1)",
          subject: "Biology",
          term: "Term 2 - 2026/2027",
          ca1: 7.5,
          ca2: 8.0,
          midterm: 15.0,
          exam: 46.5,
          total: 77.0,
          letter_grade: "A1",
          remarks: "Good theoretical understanding; practical microscope focusing has improved.",
          teacher_name: "Ms. Helena Brooks",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 5,
          student_id: "CRST-STU-8825",
          student_name: "David Adeleke",
          class_name: "Grade 10-A (SSS 1)",
          subject: "Biology",
          term: "Term 2 - 2026/2027",
          ca1: 7.0,
          ca2: 7.0,
          midterm: 14.0,
          exam: 44.0,
          total: 72.0,
          letter_grade: "B2",
          remarks: "Very good improvement from CA 1. Keep up the consistent focus.",
          teacher_name: "Ms. Helena Brooks",
          created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
        {
          id: 6,
          student_id: "CRST-STU-8826",
          student_name: "Fatima Mohammed",
          class_name: "Grade 10-A (SSS 1)",
          subject: "Chemistry",
          term: "Term 2 - 2026/2027",
          ca1: 8.0,
          ca2: 8.0,
          midterm: 16.0,
          exam: 49.0,
          total: 81.0,
          letter_grade: "A1",
          remarks: "Excellent work on stoichiometry calculations and titration curves.",
          teacher_name: "Ms. Helena Brooks",
          created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
        },
      ]
      fs.writeFileSync(FALLBACK_GRADES_PATH, JSON.stringify(initialGrades, null, 2))
      return initialGrades
    }
    const raw = fs.readFileSync(FALLBACK_GRADES_PATH, 'utf-8')
    return JSON.parse(raw) as StudentGradeRecord[]
  } catch (err) {
    console.error('Error reading fallback grades:', err)
    return []
  }
}

function writeFallbackGrades(newRecords: StudentGradeRecord[]): StudentGradeRecord[] {
  try {
    ensureFallbackDirectory()
    const current = readFallbackGrades()
    const mapped = newRecords.map((rec, idx) => ({
      ...rec,
      id: current.length + idx + 1,
      created_at: rec.created_at || new Date().toISOString(),
    }))
    const updated = [...mapped, ...current]
    fs.writeFileSync(FALLBACK_GRADES_PATH, JSON.stringify(updated, null, 2))
    return mapped
  } catch (err) {
    console.error('Error writing fallback grades:', err)
    return newRecords
  }
}

export async function saveStudentGrades(
  records: Omit<StudentGradeRecord, 'id' | 'created_at'>[]
): Promise<{ records: StudentGradeRecord[]; source: 'neon' | 'local_fallback' }> {
  if (pool) {
    try {
      await initDatabase()
      const client = await pool.connect()
      try {
        const savedRows: StudentGradeRecord[] = []
        for (const data of records) {
          const query = `
            INSERT INTO student_grades 
            (student_id, student_name, class_name, subject, term, ca1, ca2, midterm, exam, total, letter_grade, remarks, teacher_name)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING *;
          `
          const values = [
            data.student_id,
            data.student_name,
            data.class_name,
            data.subject,
            data.term,
            data.ca1,
            data.ca2,
            data.midterm,
            data.exam,
            data.total,
            data.letter_grade,
            data.remarks || null,
            data.teacher_name || 'Ms. Helena Brooks',
          ]
          const res = await client.query(query, values)
          savedRows.push(res.rows[0] as StudentGradeRecord)
        }

        // Duplicate to local fallback for audit/instant caching
        writeFallbackGrades(savedRows)
        return { records: savedRows, source: 'neon' }
      } finally {
        client.release()
      }
    } catch (err) {
      console.warn('Writing grades to Neon failed, falling back to local storage:', err)
    }
  }

  const saved = writeFallbackGrades(
    records.map((r) => ({
      ...r,
      created_at: new Date().toISOString(),
    }))
  )
  return { records: saved, source: 'local_fallback' }
}

export async function getStudentGrades(filter?: {
  class_name?: string
  subject?: string
}): Promise<{ records: StudentGradeRecord[]; source: 'neon' | 'local_fallback' }> {
  if (pool) {
    try {
      const client = await pool.connect()
      try {
        await initDatabase()
        let query = 'SELECT * FROM student_grades'
        const conditions: string[] = []
        const values: (string | number)[] = []

        if (filter?.class_name) {
          conditions.push(`class_name = $${values.length + 1}`)
          values.push(filter.class_name)
        }
        if (filter?.subject) {
          conditions.push(`subject = $${values.length + 1}`)
          values.push(filter.subject)
        }

        if (conditions.length > 0) {
          query += ' WHERE ' + conditions.join(' AND ')
        }

        query += ' ORDER BY created_at DESC'

        const res = await client.query(query, values)
        if (res.rows && res.rows.length > 0) {
          return { records: res.rows as StudentGradeRecord[], source: 'neon' }
        }
      } finally {
        client.release()
      }
    } catch (err) {
      console.warn('Reading grades from Neon failed, reading fallback:', err)
    }
  }

  let list = readFallbackGrades()
  if (filter?.class_name) {
    list = list.filter((r) => r.class_name.toLowerCase().includes(filter.class_name!.toLowerCase()))
  }
  if (filter?.subject) {
    list = list.filter((r) => r.subject.toLowerCase() === filter.subject!.toLowerCase())
  }
  return { records: list, source: 'local_fallback' }
}
