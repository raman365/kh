import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordPageProps {
  onSubmit: (password: string) => void;
}

const PasswordPage = ({ onSubmit }: PasswordPageProps) => {
  const [input, setInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
      <h2 className="text-2xl font-semibold text-pink-600 mb-4">
        Enter the Secret Password 💗
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Type it here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Unlock 💘
        </button>
      </form>
    </div>
  );
};

export default PasswordPage;
