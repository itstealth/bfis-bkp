import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Calendar, Newspaper, BarChart3, Link2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import ZohoAuthButton from "./components/ZohoAuthButton";

export default async function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-nblue">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Quickly manage your events and news coverage galleries. Upload new
          images, keep dates up to date, and ensure the website media always
          looks fresh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-nblue/5 via-white to-vgreen/5 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-nblue text-white">
                <Calendar className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-base font-semibold">
                  Events Management
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Gallery & event photos
                </span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Add new school events, upload thumbnails and multiple gallery
              images, and keep event dates in sync with what visitors see.
            </p>
            <Link href="/admin/events">
              <Button className="w-full justify-center" size="sm">
                Manage Events
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-vgreen/5 via-white to-nblue/5 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-vgreen text-white">
                <Newspaper className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-base font-semibold">News Coverage</span>
                <span className="text-xs font-normal text-gray-500">
                  Press & media mentions
                </span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload featured images and galleries for newspaper articles,
              magazine features, and other media coverage.
            </p>
            <Link href="/admin/news-coverage">
              <Button className="w-full justify-center" size="sm">
                Manage News Coverage
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Link2 className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-base font-semibold">
                  Zoho CRM Integration
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Lead form connection
                </span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Connect your Zoho CRM account to automatically sync contact form
              submissions as leads. Authenticate once to enable automatic lead
              creation.
            </p>
            <ZohoAuthButton />
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-gray-200 bg-white/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white">
                <BarChart3 className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-base font-semibold">At a glance</span>
                <span className="text-xs font-normal text-gray-500">
                  Quick overview
                </span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>
              Use the sections on the left to keep your galleries updated.
              Coming soon: quick stats for number of events, news coverages, and
              latest updates.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-500">
              <li>Upload thumbnails and multiple images in one go</li>
              <li>Changes reflect instantly on the live website</li>
              <li>Designed for quick day-to-day content updates</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
