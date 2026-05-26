import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Login failed"
        );
      }

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login successful");

      navigate("/add-project");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md border border-white/10 bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="space-y-3 mb-10">
          <p className="text-[#00f2ad] uppercase tracking-[0.3em] text-sm">
            Admin Panel
          </p>

          <h1 className="text-4xl font-bold">
            Login
          </h1>

          <p className="text-gray-400 text-sm">
            Authenticate to manage projects
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="
                w-full
                bg-black
                border
                border-white/10
                rounded-xl
                px-4
                py-4
                outline-none
                focus:border-[#00f2ad]
                transition
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="
                w-full
                bg-black
                border
                border-white/10
                rounded-xl
                px-4
                py-4
                outline-none
                focus:border-[#00f2ad]
                transition
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#00f2ad]
              text-black
              font-bold
              py-4
              rounded-xl
              hover:opacity-90
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Authenticating..."
              : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}