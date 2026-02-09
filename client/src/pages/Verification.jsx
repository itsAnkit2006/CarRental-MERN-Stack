import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import Title from "../components/Title";

const Verification = () => {

  const fileRef = useRef(null);

  const { axios, user, fetchUser } = useAppContext();

  const [status, setStatus] = useState("checking");

  const [idType, setIdType] = useState("Aadhar");
  const [idNumber, setIdNumber] = useState("");

  // ✅ document image upload
  const [document, setDocument] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // ✅ fetch verification data
  const fetchStatus = async () => {
    try {
      setStatus("checking");

      const { data } = await axios.get("/api/verification/me");

      if (data.success) {
        const ver = data.verification;

        if (!ver) {
          setStatus("not_submitted");
        } else {
          setStatus(ver.status);
          setIdType(ver.id_type || "Aadhar");
          setIdNumber(ver.id_number || "");
        }
      } else {
        toast.error(data.message);
        setStatus("error");
      }
    } catch (e) {
      setStatus("error");
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (user) fetchStatus();
  }, [user]);

  // ✅ upload submit
  const submitVerification = async () => {
    if (!idNumber.trim()) return toast.error("Enter ID number");
    if (!idType.trim()) return toast.error("Select ID type");
    if (!document) {
      return toast.error("Please upload document photo");
    }

    try {
      setLoading(true);

      // ✅ multipart form data
      const formData = new FormData();
      formData.append("id_type", idType);
      formData.append("id_number", idNumber);

      // ✅ image file
      if (document) {
        formData.append("document", document);
      }

      const { data } = await axios.post("/api/verification/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message || "Verification submitted ✅");
        setDocument(null);
        setPreview("");
        fetchStatus();
        fetchUser?.();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (s) => {
    const base = "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border";
    if (s === "verified")
      return <span className={`${base} bg-green-500/10 text-green-400 border-green-500/20`}>Verified</span>;
    if (s === "pending")
      return <span className={`${base} bg-yellow-500/10 text-yellow-300 border-yellow-500/20`}>Pending</span>;
    if (s === "rejected")
      return <span className={`${base} bg-red-500/10 text-red-400 border-red-500/20`}>Rejected</span>;
    return <span className={`${base} bg-white/5 text-gray-300 border-white/10`}>Not Submitted</span>;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
    
    <div className="min-h-screen bg-[#0B0B0B] text-white px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 pt-28 pb-24 max-w-7xl mx-auto">
      <motion.div initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Title
          title="Profile Verification"
          subTitle="Upload ID photo for verification (Aadhar / PAN / DL). Admin will review it."
          align="left"
          variant="dark"
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-white/5 backdrop-blur-xl border border-yellow-500/15 p-7 shadow-[0px_14px_40px_rgba(0,0,0,0.60)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold">Your Verification Status</h2>
              {statusBadge(status)}
            </div>

            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              Please upload your document image. Your details are safe and only admin can access it.
            </p>

            {(status === "not_submitted" || status === "rejected") && (
              <div className="mt-6 space-y-4">

                {/* Styled Upload */}
                <div>
                  <label className="text-sm text-gray-300 font-semibold">
                    Upload Document Photo *
                  </label>

                  <div
                    className="
                      mt-3 border-2 border-dashed border-yellow-500/30
                      rounded-2xl p-6 text-center
                      bg-black/30 hover:border-yellow-400 transition
                      cursor-pointer
                    "
                    onClick={() => fileRef.current?.click()}
                  >
                    <p className="text-gray-400 text-sm">
                      Click to upload ID image (JPG / PNG)
                    </p>

                    {document && (
                      <p className="text-yellow-300 text-xs mt-2 font-semibold">
                        Selected: {document.name}
                      </p>
                    )}
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setDocument(file);

                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      } else {
                        setPreview("");
                      }
                    }}
                  />

                  {/* Preview */}
                  {preview && (
                    <div className="mt-6 flex justify-center">
                      <img
                        src={preview}
                        alt="preview"
                        className="
                          w-40 h-40
                          object-cover
                          rounded-xl
                          shadow-lg
                        "
                      />
                    </div>
                  )}
                </div>


                {/* ID Type */}
                <div>
                  <label className="text-sm text-gray-300">ID Type</label>
                  <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    className="mt-2 w-full rounded-2xl bg-[#0B0B0B] border border-white/10 px-4 py-3 text-gray-200 outline-none focus:border-yellow-500/30"
                  >
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                    <option value="DL">Driving License</option>
                  </select>
                </div>

                {/* ID Number */}
                <div>
                  <label className="text-sm text-gray-300">ID Number</label>
                  <input
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="mt-2 w-full rounded-2xl bg-[#0B0B0B] border border-white/10 px-4 py-3 text-gray-200 outline-none focus:border-yellow-500/30"
                    placeholder="Enter ID number"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    disabled={loading}
                    onClick={submitVerification}
                    className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-bold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Verification"}
                  </button>

                  <button
                    onClick={fetchStatus}
                    className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            )}

            {status === "pending" && (
              <div className="mt-6 rounded-2xl border border-yellow-500/15 bg-yellow-500/5 p-5">
                <p className="text-yellow-200 font-semibold">Your verification is under review.</p>
                <p className="text-gray-400 text-sm mt-1">Please wait for admin approval.</p>
              </div>
            )}

            {status === "verified" && (
              <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="text-green-300 font-semibold">Verified Successfully ✅</p>
                <p className="text-gray-400 text-sm mt-1">You can now book cars smoothly.</p>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-[#0F0F0F] border border-white/10 p-7">
            <h3 className="text-lg font-bold">Why Verification?</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>• Reduce fake bookings</li>
              <li>• Faster booking approvals</li>
              <li>• More trust & security</li>
              <li>• Admin can approve/reject users</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  </div>

  );
};

export default Verification;
