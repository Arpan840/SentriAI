"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import { useRouter } from "next/navigation";
const SignUp = () => {
   const router = useRouter();
  
    // Callback handler to manage redirection when login is successful via the form component
    const handleLoginSuccess = () => {
      // The actual authentication success logic (like redirecting) should ideally happen here,
      // or managed by a Context/State Provider that monitors the token.
      router.push("/dashboard");
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <RegisterForm onLoginSuccess={handleLoginSuccess}/>
    </div>
  );
};
export default SignUp;
