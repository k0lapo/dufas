import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to our local "database" file
const DATA_PATH = path.join(process.cwd(), "data", "gallery.json");

// Helper to ensure the data folder and file exist
const ensureDataFile = () => {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, JSON.stringify([]));
};

// GET: Load images from the JSON file
export async function GET() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(DATA_PATH, "utf8");
    const images = JSON.parse(data);
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

// POST: Save new image to the JSON file
export async function POST(req: Request) {
  try {
    ensureDataFile();
    const { url, caption, alt } = await req.json();

    const data = fs.readFileSync(DATA_PATH, "utf8");
    const images = JSON.parse(data);

    const newImage = {
      id: Date.now().toString(),
      url,
      caption,
      alt: alt || caption,
    };

    const updatedImages = [newImage, ...images];
    fs.writeFileSync(DATA_PATH, JSON.stringify(updatedImages, null, 2));

    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}

// DELETE: Remove image from the JSON file
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const data = fs.readFileSync(DATA_PATH, "utf8");
    let images = JSON.parse(data);

    images = images.filter((img: any) => img.id !== id);
    fs.writeFileSync(DATA_PATH, JSON.stringify(images, null, 2));

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}