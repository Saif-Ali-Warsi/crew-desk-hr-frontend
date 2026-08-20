import { useState } from "react";
import { login } from "../api/auth";
import { setAccessToken } from "../utils/authStorage";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setEmail(value);

    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setPassword(value);

    if (errors.password) {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
      }));
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await login({
        email: email.trim(),
        password,
      });

      if (result.success) {
        setAccessToken(result.data.accessToken);
        setUser(result.data.user);

        toast.success("Login successful");

        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Login failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 p-6 sm:p-12 overflow-hidden">
    
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
      style={{
        backgroundImage: `url('https://www.image2url.com/r2/default/images/1787160173091-abcee5eb-16c0-4139-8637-f55e79f09b55.png')`,
      }}
    />

    <div className="relative z-10 flex min-h-[550px] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

      <div className="flex w-full flex-col items-center justify-center p-8 sm:p-12 md:w-1/2">
        <div className="w-full max-w-xs">

          <div className="mb-10 flex items-center justify-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center">
              <img
                src="https://www.image2url.com/r2/default/images/1787239332865-2edc4dd1-17a6-49a8-8f65-394a957ccbd9.png"
                alt="Crew Desk HR"
                className="h-full w-full object-contain"
              />
            </div>

            <span className="text-3xl font-black tracking-tight text-teal-500">
              Crew Desk HR
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-center text-2xl font-bold text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-center text-sm text-gray-500">
              Sign in to continue to your HR dashboard.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="john@gmail.com"
                autoComplete="email"
                className={`block w-full border-b-2 py-2.5 px-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-teal-600"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-xs font-bold text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`block w-full border-b-2 py-2.5 px-2.5 pr-10 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-200 focus:border-teal-600"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-semibold text-gray-500 hover:text-teal-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs font-bold text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer rounded-full bg-teal-600 px-12 py-3 text-sm font-extrabold text-white shadow-lg shadow-teal-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/40 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="cursor-pointer font-semibold text-teal-600 hover:text-teal-700"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden w-1/2 items-center justify-center bg-white p-8 md:flex">
        <img
          src="https://www.image2url.com/r2/default/images/1786891265146-fb6c9cab-0ffa-4722-bea5-a16d797c966c.jpg"
          alt="Workspace Illustration"
          className="max-h-full w-full object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  </div>
);
}

export default LoginForm;