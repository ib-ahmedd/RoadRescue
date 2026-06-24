import { NextRequest, NextResponse } from "next/server";
import { addContact } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Save to the database
    const newContact = addContact({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been received.", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
