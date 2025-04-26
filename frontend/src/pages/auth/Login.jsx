import CommanForm from "@/components/comman/form";
import { loginFormControls } from "@/components/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setFormData] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formdata)).then((data) => {
      // console.log(data)
      if (data?.payload?.success) {
        toast.success(data?.payload?.message); 
      } 
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login Your Account
        </h1>
        <p className="mt-2">
          Already have't account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to={"/auth/register"}
          >
            Sign Up
          </Link>
        </p>
      </div>
      <CommanForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formdata}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
