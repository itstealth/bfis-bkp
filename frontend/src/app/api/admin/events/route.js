import { NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/admin-auth";
import axios from "axios";

// Points to Hostinger: https://api.bfis.in/api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.bfis.in/api";

// 1. GET Handler (Restored!) - Fixes the 405 Error
export async function GET() {
  try {
    await requireAuth();
    // Fetches the list from your Hostinger backend
    const response = await axios.get(`${API_BASE_URL}/gallery-events`);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// 2. POST Handler (The "Required" Fix)
export async function POST(request) {
  try {
    await requireAuth();
    const formData = await request.formData();

    // Directly proxy the FormData to the backend
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to create event" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
