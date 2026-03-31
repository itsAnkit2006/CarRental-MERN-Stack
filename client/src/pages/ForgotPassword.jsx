import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

const [email,setEmail] = useState("");
const [message,setMessage] = useState("");
const [loading,setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

try{
  setLoading(true);

  const res = await axios.post(
    "/api/user/forgot-password",
    { email }
  );

  setMessage(res.data.message);

}catch(err){
  setMessage(
    err.response?.data?.message ||
    "Error sending email"
  );
}finally{
  setLoading(false);
}

};

return (

<div className="
    min-h-screen
    flex items-center justify-center
    bg-black
    px-4
">

  <form
    onSubmit={handleSubmit}
    className="
        w-full max-w-md
        p-8
        rounded-3xl
        bg-black/80
        backdrop-blur-xl
        border border-yellow-500/20
        shadow-[0px_25px_80px_rgba(0,0,0,0.9)]
        text-gray-200
        flex flex-col gap-6
    "
  >

    {/* Header */}
    <div className="text-center">
      <h2 className="text-3xl font-extrabold tracking-tight">
        <span className="text-yellow-400">Reset</span> Access
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Enter your registered email to continue
      </p>
    </div>

    {/* Input */}
    <div>
      <label className="text-sm text-gray-300 font-semibold">
        Email Address
      </label>

      <input
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="
            w-full mt-2 px-4 py-3
            rounded-xl outline-none
            bg-black border border-yellow-500/20
            text-gray-200
            focus:border-yellow-400
            focus:shadow-[0_0_12px_rgba(250,204,21,0.45)]
            transition-all
        "
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      disabled={loading}
      className="
          w-full py-3 rounded-xl
          bg-yellow-400 text-black font-bold
          hover:bg-yellow-300
          transition-all
          shadow-lg shadow-yellow-500/20
          disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {loading ? "Sending..." : "Send Reset Link"}
    </button>

    {/* Message */}
    {message && (
      <p className="text-center text-sm text-gray-400">
        {message}
      </p>
    )}

    {/* Back */}
    <div className="text-center text-sm">
      <Link
        to="/"
        className="text-yellow-400 hover:text-yellow-300 font-semibold"
      >
        ← Back to Login
      </Link>
    </div>

  </form>

</div>

);
}
