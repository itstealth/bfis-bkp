export async function POST(request) {
  try {
    const form = await request.formData();

    const endpoint =
      process.env.CONTACT_FORM_ENDPOINT ||
      "https://www.bfis.in/BFIS/bfis_crm.php";

    let upstreamResponse;
    try {
      upstreamResponse = await fetch(endpoint, {
        method: "POST",
        body: form,
      });
    } catch (fetchError) {
      // Network error or connection failed
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unable to connect to server. Please try again later.",
          message: "Server connection failed",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!upstreamResponse.ok) {
      // Handle specific upstream error codes
      let errorMessage = "Server is temporarily unavailable. Please try again later.";
      
      if (upstreamResponse.status === 502) {
        errorMessage = "Server is temporarily unavailable. Please try again later.";
      } else if (upstreamResponse.status === 503) {
        errorMessage = "Service is temporarily unavailable. Please try again later.";
      } else if (upstreamResponse.status === 500) {
        errorMessage = "Server error occurred. Please try again later.";
      }

      const text = await upstreamResponse.text().catch(() => "");
      
      return new Response(
        JSON.stringify({
          success: false,
          error: errorMessage,
          message: errorMessage,
          status: upstreamResponse.status,
        }),
        {
          status: upstreamResponse.status === 502 || upstreamResponse.status === 503 ? 503 : 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Try to parse JSON response
    let data;
    const text = await upstreamResponse.text();
    try {
      data = text ? JSON.parse(text) : { success: false, message: "Empty response from server" };
    } catch (parseError) {
      // If not JSON, check if it's a success indicator
      if (text.toLowerCase().includes("success") || upstreamResponse.status === 200) {
        data = { success: true };
      } else {
        data = { success: false, message: "Invalid response format from server" };
      }
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "An unexpected error occurred. Please try again later.",
        message: String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
