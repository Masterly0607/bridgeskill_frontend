"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackButton({ href, label = "Back" }) {
  return (
    <Button
      asChild
      variant="secondary"
      className="rounded-xl border-0 shadow-none"
    >
      <Link href={href}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}