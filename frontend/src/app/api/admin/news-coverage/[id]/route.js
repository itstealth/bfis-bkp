import { NextResponse } from "next/server";
import { requireAuth } from "@/app/lib/admin-auth";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.bfis.in/api";

// Optional: get single item
export async function GET(request, { params }) {
  try {
    await requireAuth();
    const { id } = await params; // params is a Promise in newer Next.js route handlers [web:18]
    const response = await axios.get(
      `${API_BASE_URL}/gallery-news-coverage/${id}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error fetching news coverage:", error);
    return NextResponse.json(
      { error: "Failed to fetch news coverage" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await requireAuth();
    const { id } = await params; // params is a Promise in newer Next.js route handlers [web:18]
    const formData = await request.formData();

    // Forward multipart update to backend (your backend must support PATCH/PUT)
    const res = await fetch(`${API_BASE_URL}/gallery-news-coverage/${id}`, {
      method: "PATCH",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error || "Failed to update news coverage" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error updating news coverage:", error);
    return NextResponse.json(
      { error: "Failed to update news coverage" },
      { status: 500 }
    );
  }
}

// export async function DELETE(request, context) {
//   try {
//     await requireAuth();

//     const { id } = await context.params; // important in newer Next.js [web:18]
//     console.log("Deleting news coverage id:", id);

//     const res = await fetch(`${API_BASE_URL}/gallery-news-coverage/${id}`, {
//       method: "DELETE",
//     });

//     const data = await res.json().catch(() => null);

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: data?.error || `Backend delete failed (${res.status})` },
//         { status: res.status }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     if (error.message === "Unauthorized") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     console.error("Error deleting news coverage:", error);
//     return NextResponse.json(
//       { error: "Failed to delete news coverage" },
//       { status: 500 }
//     );
//   }
// }
