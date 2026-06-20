import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1c120d] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
