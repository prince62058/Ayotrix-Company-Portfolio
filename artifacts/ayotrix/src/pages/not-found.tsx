import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <SeoHead
        title="Page Not Found | Ayotrix Infotech"
        description="The page you requested could not be found on ayotrix.com."
        path="/404"
        noindex
      />
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-600 mb-4">
            This page does not exist. Head back to the homepage or contact us.
          </p>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            Go to Homepage
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
