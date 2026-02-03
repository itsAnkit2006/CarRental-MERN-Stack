import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin, axios, setToken, navigate } = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try {
          event.preventDefault();
          const {data} = await axios.post(`/api/user/${state}`, {name,email,password})

          if(data.success){
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
  className="fixed inset-0 z-[100] flex items-center justify-center px-4
  bg-black/70 backdrop-blur-sm"
>
  <form
    onSubmit={onSubmitHandler}
    onClick={(e) => e.stopPropagation()}
    className="
      flex flex-col gap-4
      w-80 sm:w-[380px]
      p-8 py-10
      rounded-3xl
      bg-white/5 backdrop-blur-xl
      border border-yellow-500/15
      shadow-[0px_20px_60px_rgba(0,0,0,0.75)]
      text-gray-200
    "
  >
    {/* Title */}
    <p className="text-2xl font-extrabold m-auto tracking-tight">
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
            text-gray-200 placeholder-gray-500
            focus:border-yellow-400 transition-all
          "
          type="text"
          required
        />
      </div>
    )}

    {/* Email */}
    <div className="w-full">
      <p className="text-sm text-gray-300 font-semibold">Email</p>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
        className="
          w-full px-4 py-3 mt-2 rounded-xl outline-none
          bg-black/30 border border-yellow-500/15
          text-gray-200 placeholder-gray-500
          focus:border-yellow-400 transition-all
        "
        type="email"
        required
      />
    </div>

    {/* Password */}
    <div className="w-full">
      <p className="text-sm text-gray-300 font-semibold">Password</p>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your password"
        className="
          w-full px-4 py-3 mt-2 rounded-xl outline-none
          bg-black/30 border border-yellow-500/15
          text-gray-200 placeholder-gray-500
          focus:border-yellow-400 transition-all
        "
        type="password"
        required
      />
    </div>

    {/* Switch login/register */}
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
      "
    >
      {state === "register" ? "Create Account" : "Login"}
    </button>

    {/* Small line */}
    <p className="text-xs text-gray-500 text-center">
      By continuing, you agree to our Terms & Privacy Policy.
    </p>
  </form>
</div>

  )
}

export default Login
