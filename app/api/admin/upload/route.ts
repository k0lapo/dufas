import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { randomUUID } from "crypto"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const caption = formData.get("caption") as string
    const alt = formData.get("alt") as string

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    if (!caption || !alt) {
      return NextResponse.json(
        { error: "Caption and alt text are required" },
        { status: 400 }
      )
    }

    // Create unique filename
    const id = randomUUID()
    const ext = file.name.split(".").pop()
    const filename = `${id}.${ext}`

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "gallery")
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      console.error("[v0] Directory creation error:", error)
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = join(uploadsDir, filename)

    await writeFile(filepath, buffer)

    // Return the image data
    const imageUrl = `/uploads/gallery/${filename}`

    return NextResponse.json(
      {
        image: {
          id,
          url: imageUrl,
          caption,
          alt,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    )
  }
}
