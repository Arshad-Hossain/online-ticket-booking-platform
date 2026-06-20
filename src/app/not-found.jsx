import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1c120d] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-20 h-20 text-[#c8a27a]" />
        </div>

        <h1 className="text-7xl font-bold text-white mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-[#c8a27a] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold hover:scale-105 transition"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
