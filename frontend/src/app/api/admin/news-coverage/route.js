import { NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/admin-auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.bfis.in/api";

export async function GET() {
  try {
    await requireAuth();
    const res = await fetch(`${API_BASE_URL}/gallery-news-coverage`, {
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to fetch news coverages" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching news coverages:", error);
    return NextResponse.json(
      { error: "Failed to fetch news coverages" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await requireAuth();

    const formData = await request.formData();

    // Backend route is POST /news-coverage [file:163]
    const res = await fetch(`${API_BASE_URL}/news-coverage`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to create news coverage" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating news coverage:", error);
    return NextResponse.json(
      { error: "Failed to create news coverage" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await requireAuth();

    const id = request.nextUrl.searchParams.get("id"); // query param helper [web:2]
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Backend route is DELETE /news-coverage/:id [file:163]
    const res = await fetch(`${API_BASE_URL}/news-coverage/${id}`, {
      method: "DELETE",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to delete news coverage" },
        { status: res.status }
      );
    }

    return NextResponse.json(data || { success: true });
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("DELETE route error:", error);
    return NextResponse.json(
      { error: "Failed to delete news coverage" },
      { status: 500 }
    );
  }
}
