import { useSignInMutation } from "@/app/services/AuthApi";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { LoginFormProps } from "@/app/interfaces/auth.interface";
import { useToast } from "@/app/hooks/useToast";

const RegisterForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { success, error } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [SignUpMutation, { isLoading }] = useSignInMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      error("Passwords do not match.");
      return;
    }

    const response = await SignUpMutation({
      email,
      password,
    }).unwrap();
    Cookies.set("token", response.token);

    onLoginSuccess();
  };
  return (
    <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-900 p-12 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded relative dark:bg-red-900/30 dark:border-red-700 dark:text-red-300"
        >
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <div className="relative mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <div className="relative mt-1">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={confirmPassword}
              disabled={isLoading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};
export default RegisterForm;
