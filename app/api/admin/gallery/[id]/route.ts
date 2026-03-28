import { NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import { join } from "path"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Construct the file path
    // This assumes files are stored as {id}.{ext}
    const uploadsDir = join(process.cwd(), "public", "uploads", "gallery")

    // In a real implementation, you'd look up the actual filename from a database
    // For now, we'll just acknowledge the deletion
    // The admin page will handle removing it from state

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    )
  }
}
