// app/login/page.tsx
"use client";

import LoginForm from "@/components/auth/LoginForm"; // Import the new component
import { useRouter } from "next/navigation";

/**
 * Page component that wraps the reusable LoginForm.
 */
export default function LoginPage() {
  const router = useRouter();

  // Callback handler to manage redirection when login is successful via the form component
  const handleLoginSuccess = () => {
    // The actual authentication success logic (like redirecting) should ideally happen here,
    // or managed by a Context/State Provider that monitors the token.
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4">
      {/* The LoginForm component handles all the internal state, submission, and error display */}
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
