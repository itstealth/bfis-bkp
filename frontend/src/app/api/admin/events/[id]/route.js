import { NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/admin-auth";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.bfis.in/api";

// PATCH - Update event
export async function PATCH(request, { params }) {
  try {
    await requireAuth();
    const { id } = await params;
    
    const formData = await request.formData();
    
    // Forward to backend API - assuming it supports PATCH for multipart
    // If backend only supports PUT for events, we might need to proxy PATCH to PUT
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PATCH", 
      body: formData,
    });
    
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to update event" },
        { status: res.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(request, { params }) {
  try {
    await requireAuth();
    const { id } = await params;
    
    // Backend route is DELETE /events/:id
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to delete event" },
        { status: res.status }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}

