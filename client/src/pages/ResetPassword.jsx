import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword(){

const { token } = useParams();

const [password,setPassword] = useState("");
const [confirm,setConfirm] = useState("");
const [msg,setMsg] = useState("");
const [loading,setLoading] = useState(false);

const submit = async(e)=>{
e.preventDefault();

if(password !== confirm){
  setMsg("Passwords do not match");
  return;
}

try{
  setLoading(true);

  const res = await axios.post(
    `/api/user/reset-password/${token}`,
    { password }
  );

  setMsg(res.data.message);

}catch(err){
  console.log(err.response);
  setMsg(err.response?.data?.message || "Reset failed");
}finally{
  setLoading(false);
}

};

return(

<div className="
    min-h-screen
    flex items-center justify-center
    bg-black
    px-4
">

  <form
    onSubmit={submit}
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
        <span className="text-yellow-400">Create</span> New Password
      </h2>
    </div>

    {/* Password */}
    <div>
      <label className="text-sm text-gray-300 font-semibold">
        New Password
      </label>

      <input
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
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

    {/* Confirm */}
    <div>
      <label className="text-sm text-gray-300 font-semibold">
        Confirm Password
      </label>

      <input
        type="password"
        value={confirm}
        onChange={(e)=>setConfirm(e.target.value)}
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
      {loading ? "Updating..." : "Reset Password"}
    </button>

    {/* Message */}
    {msg && (
      <p className="text-center text-sm text-gray-400">
        {msg}
      </p>
    )}

  </form>

</div>

);
}
