import { Suspense } from "react";
import ResetPassword from "./ResetPassword"; // your file above

export const dynamic = "force-dynamic"; // avoids static prerender error for this page

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-[#161719]">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
