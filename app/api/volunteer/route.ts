import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Get your Google Sheets Web App URL from deployment
    // You'll need to create a Google Apps Script and deploy it as a web app
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

    if (!GOOGLE_SHEETS_URL) {
      return NextResponse.json(
        { error: "Google Sheets webhook not configured" },
        { status: 500 }
      )
    }

    // Send data to Google Sheets via webhook
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        age: body.age,
        email: body.email,
        phone: body.phone,
        sex: body.sex,
        skills: body.skills,
        reason: body.reason,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Google Sheets")
    }

    return NextResponse.json(
      { message: "Volunteer form submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Volunteer submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit volunteer form" },
      { status: 500 }
    )
  }
}
