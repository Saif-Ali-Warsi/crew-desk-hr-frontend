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
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await login({
        email,
        password,
      });

      if (result.success) {
        setAccessToken(result.data.accessToken);
        setUser(result.data.user);
        navigate("/dashboard");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 p-6 sm:p-12 transition-all duration-500">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl min-h-[550px] transition-all duration-300 hover:shadow-teal-900/20">
        
        <div className="flex w-full flex-col items-center justify-center bg-[#fff] p-8 sm:p-12 md:w-1/2">
          <div className="w-full max-w-xs space-y-10">
            
            <div className="flex items-center justify-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-2xl font-black text-white shadow-md shadow-teal-600/30 transition-transform duration-300 hover:scale-105">
                H
              </div>
              <span className="text-3xl font-black tracking-tight text-teal-800">
                Help Desk HR
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group relative">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="john@gmail.com"
                  className={`block w-full border-b-2 py-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-200 focus:border-teal-600"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-bold text-red-600 animate-pulse">{errors.email}</p>
                )}
              </div>

              <div className="group relative">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className={`block w-full border-b-2 py-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-200 focus:border-teal-600"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs font-bold text-red-600 animate-pulse">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer rounded-full bg-teal-600 px-12 py-3 text-sm font-extrabold text-white shadow-lg shadow-teal-600/30 transition-all duration-300 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {loading ? "Logging in.." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden w-1/2 items-center justify-center bg-[#fff] p-8 md:flex transition-all duration-300">
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