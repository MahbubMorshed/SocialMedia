import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, fireDb } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { loading } = useSelector((store) => store);
  const dispatch = useDispatch();

  const register = () => {
    const auth = getAuth(app);
    dispatch({ type: "showLoading" });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          profilePicUrl: "",
          bio: "Hi , Iam using mushfiqeen",
        };
        setDoc(doc(fireDb, "users", user.uid), userData);
        dispatch({ type: "hideLoading" });
        toast.success("Registarion Successfull");
        navigate("/login");
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="h-screen flex justify-between flex-col overflow-x-hidden bg-primary">
      {loading && <Loader />}
      {/* top corner */}
      <div className="flex justify-start">
        <div className="h-40 bg-white w-96 transform -skew-x-[25deg] -ml-10 flex items-center justify-center">
          <h1 className="text-center text-4xl font-semibold skew-x-[25deg] text-primary">
            MUSHFIQEEN
          </h1>
        </div>
      </div>

      {/* form */}
      <div className="flex justify-center  bg-primary ">
        <div className="w-[420px] flex flex-col space-y-5 card p-10">
          <h1 className="text-4xl text-gray-400 font-semibold">Get---In</h1>
          <hr />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="border border-gray-500 h-10 text-white rounded-sm focus:border-gray-500 pl-5 bg-transparent"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="border border-gray-500 h-10 text-white rounded-sm focus:border-gray-500 pl-5 bg-transparent"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="comfirm password"
            className="border border-gray-500 h-10 text-white rounded-sm focus:border-gray-500 pl-5 bg-transparent"
          />
          <div className="flex justify-end">
            <button
              className="bg-gray-100 h-10 rounded-sm text-primary px-10"
              onClick={register}
            >
              REGISTER
            </button>
          </div>
          <hr />
          <Link to="/login" className="text-[14px] text-gray-400">
            ALL READY REGISTED ? CLICK HERE TO LOGIN
          </Link>
        </div>
      </div>

      {/* bottom corner */}
      <div className="flex justify-end">
        <div className="h-40 bg-white w-96 transform skew-x-[25deg] -mr-10 flex items-center justify-center">
          <h1 className="text-center text-4xl font-semibold -skew-x-[25deg] text-primary">
            .com
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Register;
