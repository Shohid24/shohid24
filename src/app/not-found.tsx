import Link from "next/link";
import { Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md space-y-6 px-4 text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="text-2xl text-foreground/80">Page not found</p>
        <p className="text-muted-foreground">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go back home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/contact">
              <Mail className="mr-2 h-5 w-5" />
              Contact support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
