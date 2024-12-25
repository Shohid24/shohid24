"use client";
import { Button } from "@/components/ui/button";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center gap-5">
        <h2 className="my-5 text-2xl font-semibold md:text-4xl">
          Something went wrong!
        </h2>
        <Button variant="secondary" onClick={() => reset()}>
          Try again
        </Button>
        <pre className="my-5 bg-muted p-2">{error.message}</pre>
      </body>
    </html>
  );
}
