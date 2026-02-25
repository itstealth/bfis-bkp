"use client";

import { Button } from "@/app/components/ui/button";
import { Link2 } from "lucide-react";

export default function ZohoAuthButton() {
  // Get Zoho auth URL from environment variable or use default
  const zohoAuthUrl = process.env.NEXT_PUBLIC_ZOHO_AUTH_URL || "https://stealthlearn.in/bfis-lp/BFIS/zoho-auth.php";

  const handleZohoAuth = () => {
    // Navigate to PHP zoho-auth endpoint (it will redirect to Zoho OAuth)
    window.location.href = zohoAuthUrl;
  };

  return (
    <Button
      onClick={handleZohoAuth}
      className="w-full justify-center"
      size="sm"
      variant="outline"
    >
      <Link2 className="h-4 w-4 mr-2" />
      Connect Zoho CRM
    </Button>
  );
}

