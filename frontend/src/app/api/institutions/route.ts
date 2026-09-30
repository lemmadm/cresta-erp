import { NextResponse } from 'next/server'
import { saveInstitutionRequest, getInstitutionRequests, checkDatabaseConnection } from '~/lib/db'

export async function GET() {
  try {
    const dbStatus = await checkDatabaseConnection()
    const { requests, source } = await getInstitutionRequests()

    return NextResponse.json({
      success: true,
      database: dbStatus,
      source,
      count: requests.length,
      requests,
    })
  } catch (error: unknown) {
    const err = error as Error
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.school_name || !body.admin_name || !body.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'School Name, Administrator Name, and Email are required fields.',
        },
        { status: 400 }
      )
    }

    const { record, source } = await saveInstitutionRequest({
      school_name: body.school_name.trim(),
      admin_name: body.admin_name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || '',
      student_count: body.student_count || '300 - 1,500 students',
      plan_selected: body.plan_selected || 'Growth Plan (₦120,000/mo)',
      currency: body.currency || 'NGN',
      country: body.country || 'Nigeria',
      notes: body.notes?.trim() || '',
      status: 'pending_review',
    })

    const dbStatus = await checkDatabaseConnection()

    return NextResponse.json({
      success: true,
      message: source === 'neon' 
        ? 'Institution request recorded directly into Neon PostgreSQL database!' 
        : 'Institution request recorded into storage! Ready to automatically sync to Neon as soon as DATABASE_URL is connected.',
      record,
      storage_source: source,
      database: dbStatus,
    })
  } catch (error: unknown) {
    const err = error as Error
    console.error('API Error in /api/institutions:', err)
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
