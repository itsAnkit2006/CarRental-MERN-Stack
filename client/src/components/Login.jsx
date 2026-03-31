import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {

    const { setShowLogin, axios, setToken, navigate } = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            if (state === "login" && !email && !phone) {
                return toast.error("Enter email or phone");
            }
            if (state === "register" && password !== confirmPassword) {
                return toast.error("Passwords do not match");
            }

            let payload;
            if (state === "login") {
                payload = {
                    identifier: email || phone,
                    password
                };
            } else {
                payload = {
                    name,
                    email,
                    password,
                    phone
                };
            }
            const { data } = await axios.post(`/api/user/${state}`, payload);

            if (data.success) {
                navigate('/')
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div
            onClick={() => setShowLogin(false)}
            className="
                fixed inset-0 z-[100]
                flex items-center justify-center
                px-3 sm:px-4 py-6
                bg-black/70 backdrop-blur-sm
            "
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="
                    flex flex-col gap-4
                    w-full max-w-sm sm:max-w-md
                    max-h-[90vh] overflow-y-auto
                    p-6 sm:p-8
                    rounded-3xl
                    bg-white/5 backdrop-blur-xl
                    border border-yellow-500/15
                    shadow-[0px_20px_60px_rgba(0,0,0,0.75)]
                    text-gray-200
                "
            >
                {/* Title */}
                <p className="text-xl sm:text-2xl font-extrabold m-auto tracking-tight">
                    <span className="text-primary">User</span>{" "}
                    {state === "login" ? "Login" : "Sign Up"}
                </p>

                {/* Register: Name */}
                {state === "register" && (
                    <div className="w-full">
                        <p className="text-sm text-gray-300 font-semibold">Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Enter your name"
                            className="
                                w-full px-4 py-3 mt-2 rounded-xl outline-none
                                bg-black/30 border border-yellow-500/15
                                text-sm sm:text-base
                                text-gray-200 placeholder-gray-500
                                focus:border-yellow-400 transition-all
                            "
                            type="text"
                            required
                        />
                    </div>
                )}

                {/* Register: Email */}
                {state === "register" && (
                    <div className="w-full">
                        <p className="text-sm text-gray-300 font-semibold">Email</p>
                        <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                        className="
                            w-full px-4 py-3 mt-2 rounded-xl outline-none
                            bg-black/30 border border-yellow-500/15
                            text-sm sm:text-base
                            text-gray-200 placeholder-gray-500
                            focus:border-yellow-400 transition-all
                        "
                        type="email"
                        required
                        />
                    </div>
                )}

                {/* Register: Phone */}
                {state === "register" && (
                    <div className="w-full">
                        <p className="text-sm text-gray-300 font-semibold">Phone</p>
                        <input
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder="Enter your phone number"
                        className="
                            w-full px-4 py-3 mt-2 rounded-xl outline-none
                            bg-black/30 border border-yellow-500/15
                            text-sm sm:text-base
                            text-gray-200 placeholder-gray-500
                            focus:border-yellow-400 transition-all
                        "
                        type="tel"
                        required
                        />
                    </div>
                )}

                {/* Login: Email or Phone */}
                {state === "login" && (
                <div className="w-full">
                    <p className="text-sm text-gray-300 font-semibold">Email or Phone</p>
                    <input
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d+$/.test(value)) {
                        setPhone(value);
                        setEmail("");
                        } else {
                        setEmail(value);
                        setPhone("");
                        }
                    }}
                    placeholder="Enter email or phone"
                    className="
                        w-full px-4 py-3 mt-2 rounded-xl outline-none
                        bg-black/30 border border-yellow-500/15
                        text-sm sm:text-base
                        text-gray-200 placeholder-gray-500
                        focus:border-yellow-400 transition-all
                    "
                    type="text"
                    required
                    />
                </div>
                )}

                {/* Password */}
                <div className="w-full">
  <p className="text-sm text-gray-300 font-semibold">Password</p>

  <div className="relative">
    <input
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      placeholder="Enter your password"
      className="
        w-full px-4 py-3 mt-2 rounded-xl outline-none
        bg-black/30 border border-yellow-500/15
        text-sm sm:text-base
        text-gray-200 placeholder-gray-500
        focus:border-yellow-400 transition-all
        pr-10
      "
      type={showPassword ? "text" : "password"}
      required
    />

    {/* 👁️ SVG Eye Icon */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
    >
      {showPassword ? (
        // Eye OFF
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a17.02 17.02 0 013.69-4.95M6.1 6.1A9.97 9.97 0 0112 5c5 0 9 7 9 7a17.05 17.05 0 01-4.35 5.15M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3" />
        </svg>
      ) : (
        // Eye ON
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.458 2.458A9.97 9.97 0 0021 12s-4-7-9-7-9 7-9 7a9.97 9.97 0 003.542 2.458M9.88 9.88a3 3 0 104.24 4.24" />
        </svg>
      )}
    </button>
  </div>
</div>

{state === "register" && (
  <div className="w-full">
    <p className="text-sm text-gray-300 font-semibold">Confirm Password</p>

    <div className="relative">
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        placeholder="Re-enter password"
        className="
          w-full px-4 py-3 mt-2 rounded-xl outline-none
          bg-black/30 border border-yellow-500/15
          text-sm sm:text-base
          text-gray-200 placeholder-gray-500
          focus:border-yellow-400 transition-all
          pr-10
        "
        type={showConfirmPassword ? "text" : "password"} // ✅ FIX
        required
      />

      <button
        type="button"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // ✅ FIX
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
      >
        {showConfirmPassword ? ( // ✅ FIX
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a17.02 17.02 0 013.69-4.95M6.1 6.1A9.97 9.97 0 0112 5c5 0 9 7 9 7a17.05 17.05 0 01-4.35 5.15M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.458 2.458A9.97 9.97 0 0021 12s-4-7-9-7-9 7-9 7a9.97 9.97 0 003.542 2.458M9.88 9.88a3 3 0 104.24 4.24" />
          </svg>
        )}
      </button>
    </div>
  </div>
)}



            {state === "login" && (
                <div className="flex -mt-2">
                    <Link
                        to="/forgot-password"
                        onClick={() => setShowLogin(false)}
                        className="
                            text-xs sm:text-sm
                            text-primary
                            hover:text-yellow-300
                            transition-all
                            font-medium
                        "
                        >
                        Forgot Password?
                    </Link>
                </div>
            )}

                {/* Switch */}
                {state === "register" ? (
                    <p className="text-sm text-gray-400">
                        Already have an account?{" "}
                        <span
                            onClick={() => setState("login")}
                            className="text-primary font-semibold cursor-pointer hover:text-yellow-300 transition-all"
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p className="text-sm text-gray-400">
                        Create an account?{" "}
                        <span
                            onClick={() => setState("register")}
                            className="text-primary font-semibold cursor-pointer hover:text-yellow-300 transition-all"
                        >
                            Click here
                        </span>
                    </p>
                )}

                {/* Button */}
                <button
                    className="
                        bg-primary hover:bg-primary-dull transition-all
                        text-black font-bold
                        w-full py-3 rounded-xl cursor-pointer
                        shadow-lg shadow-yellow-500/20
                        text-sm sm:text-base
                    "
                >
                    {state === "register" ? "Create Account" : "Login"}
                </button>

                {/* Legal */}
                <p className="text-xs text-gray-500 text-center">
                    By continuing, you agree to our Terms & Privacy Policy.
                </p>
            </form>
        </div>
    )
}

export default Login
