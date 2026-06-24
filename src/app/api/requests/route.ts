import { NextRequest, NextResponse } from "next/server";
import { getRequests, getRequestById, addRequest, updateRequest } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (id) {
      const data = getRequestById(id);
      if (!data) {
        return NextResponse.json({ error: "Request not found" }, { status: 404 });
      }
      return NextResponse.json(data);
    }

    const data = getRequests();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/requests error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, phone, service, vehicleType, location } = body;
    if (!name || !phone || !service || !vehicleType || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate a unique ID (e.g. RR-XXXXXX)
    const id = "RR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newRequest = addRequest({
      id,
      name,
      phone,
      email: body.email || "",
      service,
      vehicleType,
      vehicleMake: body.vehicleMake || "",
      vehicleModel: body.vehicleModel || "",
      vehicleYear: body.vehicleYear || "",
      vehicleColor: body.vehicleColor || "",
      location,
      landmark: body.landmark || "",
      notes: body.notes || "",
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("POST /api/requests error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing request ID" }, { status: 400 });
    }

    const updated = updateRequest(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/requests error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
