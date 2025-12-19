import { NextResponse } from "next/server";

import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

// Helper function to generate a unique filename
function generateUniqueFilename(originalName) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  const nameWithoutExt = originalName.split(".").slice(0, -1).join(".");
  return `${nameWithoutExt}_${timestamp}_${randomString}.${extension}`;
}

// Helper function to validate file type
function validateFileType(file) {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  return allowedTypes.includes(file.type);
}

// Helper function to validate file size (5MB max)
function validateFileSize(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("document");

    await new Promise((res) =>
      setTimeout(() => {
        res(true);
      }, 1000)
    );

    if (!file) {
      return NextResponse.json(
        {
          Message: {
            Code: 400,
            Text: "No document provided",
          },
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!validateFileType(file)) {
      return NextResponse.json(
        {
          Message: {
            Code: 400,
            Text: "Invalid file format. Only PDF, JPG, PNG, DOC, DOCX, XLS, XLSX files are allowed.",
          },
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (!validateFileSize(file)) {
      return NextResponse.json(
        {
          Message: {
            Code: 400,
            Text: "File size too large. Maximum size is 5MB.",
          },
        },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);
    const filePath = join(uploadsDir, uniqueFilename);

    // Convert file to buffer and save to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    // Generate the file URL that will be accessible
    const fileUrl = `/uploads/${uniqueFilename}`;

    // Return success response
    return NextResponse.json({
      Message: {
        Code: 200,
        Text: "File uploaded successfully",
      },
      Data: {
        fileUrl: fileUrl,
        fileName: file.name,
        fileSize: file.size,
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
      Type: "FILE_UPLOAD",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        Message: {
          Code: 500,
          Text: "File upload failed",
        },
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      Message: {
        Code: 405,
        Text: "Method not allowed",
      },
    },
    { status: 405 }
  );
}
