"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CloseJobDialog({
  jobTitle = "this job",
  onConfirm,
  isClosing = false,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="rounded-xl"
          disabled={isClosing}
        >
          {isClosing ? "Closing..." : "Close Job"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Close this job?</AlertDialogTitle>
          <AlertDialogDescription>
            Students will no longer be able to apply to{" "}
            <span className="font-medium">{jobTitle}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isClosing}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={isClosing}>
            {isClosing ? "Closing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}