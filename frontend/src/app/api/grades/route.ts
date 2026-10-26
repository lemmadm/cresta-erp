import { NextResponse } from 'next/server'
import {
  saveStudentGrades,
  getStudentGrades,
  checkDatabaseConnection,
  computeWaecGrade,
  StudentGradeRecord,
} from '~/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const className = searchParams.get('class_name') || undefined
    const subject = searchParams.get('subject') || undefined

    const dbStatus = await checkDatabaseConnection()
    const { records, source } = await getStudentGrades({ class_name: className, subject })

    return NextResponse.json({
      success: true,
      database: dbStatus,
      source,
      count: records.length,
      records,
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

    // Accept either a single grade record or an array of records
    const rawItems: Array<Record<string, unknown>> = Array.isArray(body)
      ? (body as Array<Record<string, unknown>>)
      : Array.isArray(body.grades)
      ? (body.grades as Array<Record<string, unknown>>)
      : [body as Record<string, unknown>]

    if (rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No grade records provided in payload.' },
        { status: 400 }
      )
    }

    const preparedRecords: Omit<StudentGradeRecord, 'id' | 'created_at'>[] = []

    for (const item of rawItems) {
      if (!item.student_name || !item.subject || !item.class_name) {
        return NextResponse.json(
          {
            success: false,
            error: 'Each grade entry requires student_name, subject, and class_name.',
          },
          { status: 400 }
        )
      }

      const ca1 = Number(item.ca1 ?? 0)
      const ca2 = Number(item.ca2 ?? 0)
      const midterm = Number(item.midterm ?? 0)
      const exam = Number(item.exam ?? 0)
      const total = Math.min(100, Math.max(0, Number(item.total ?? (ca1 + ca2 + midterm + exam))))
      const waec = computeWaecGrade(total)

      preparedRecords.push({
        student_id: item.student_id ? String(item.student_id) : `STU-${Math.floor(1000 + Math.random() * 9000)}`,
        student_name: String(item.student_name).trim(),
        class_name: String(item.class_name).trim(),
        subject: String(item.subject).trim(),
        term: item.term ? String(item.term) : 'Term 2 - 2026/2027',
        ca1,
        ca2,
        midterm,
        exam,
        total,
        letter_grade: item.letter_grade ? String(item.letter_grade) : waec.grade,
        remarks: item.remarks ? String(item.remarks).trim() : waec.remark,
        teacher_name: item.teacher_name ? String(item.teacher_name) : 'Ms. Helena Brooks',
      })
    }

    const { records: savedRecords, source } = await saveStudentGrades(preparedRecords)
    const dbStatus = await checkDatabaseConnection()

    return NextResponse.json({
      success: true,
      message:
        source === 'neon'
          ? `Successfully persisted ${savedRecords.length} student grade(s) directly into Neon PostgreSQL!`
          : `Successfully persisted ${savedRecords.length} student grade(s) to secure local database store.`,
      source,
      database: dbStatus,
      savedCount: savedRecords.length,
      records: savedRecords,
    })
  } catch (error: unknown) {
    const err = error as Error
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
