import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import InputField from "@/components/inputField/InputField";
import blw from "/images/logo.png";
import "./signUp.scss";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Toast from "@/components/toast/Toast";
import LoadingBar from "@/components/LoadingBar/LoadingBar";
import { smoothScrollTo } from "@/interface/functions";

export default function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  const newErrors: { [key: string]: string } = {};
  const validateField = () => {
    // Explicitly type the error object
    if (!formData.title) {
      newErrors.title = "title";
    }
    if (!formData.firstName) {
      newErrors.firstName = "What is your name?";
    }
    if (!formData.lastName) {
      newErrors.lastName =
        "Declare your last name";
    }
  
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email =
        "“Stay connected! A valid email keeps us in fellowship.”";
    }
    if (formData.password.length < 8) {
      newErrors.password =
        "passwords must be at least 8 characters";
    }
    if (confirmPassword !== formData.password) {
      newErrors.confirmPassword =
        "passwords do not match";
    } 

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = formRef.current;

    if (form === null) return; // Guard to ensure formRef.current is not null

    // TypeScript now knows `form` is not null, so `querySelector` is safe
    const firstInvalidField = form.querySelector(
      ":invalid"
    ) as HTMLElement | null;

    if (firstInvalidField) {
      smoothScrollTo(firstInvalidField, 500); // Slow scroll (1000ms)
      firstInvalidField.focus();
    }

    const validationErrors = validateField();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      // wait for 1.5s before navigating to signin, authentication has been removed
      setTimeout(() => {
        setLoading(false);
        setToastType("success");
        setSuccessMessage("Info has been entered into the book of life");
        setTimeout(() => {
          navigate("/signin");
          setToastType(""); // Reset after navigation
        }, 3000);
      }, 1500);
    }
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  //this section displays stylish loader
  const [loadingBar, setloadingBar] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloadingBar(false);
    }, 1500);
  });
  if (loadingBar) return <LoadingBar height="90vh" />;

  return (
    <div className="signupContainer">
      <div className="backgroundImage">
        <div className="content">
          <div className="header flex flex-col items-center text-center text-white justify-center mb-6 space-y-3">
            <img src={blw} className="w-14 h-12" />
            <h2 className="text-[32px] font-bold leading-10">
              Welcome to KingsRecord
            </h2>
            <p className="font-normal text-sm px-7">
              Manage all your sales and purchase data effectively.
            </p>
          </div>
        </div>
      </div>
      {/* right hand side of signup */}
      <div className="formContainer">
        <form ref={formRef} method="post">
          <div>
            <InputField
              type="text"
              label="Title"
              placeholder="eg. Brother, Sister, Pastor"
              required
              autoComplete="title"
              name="title"
              value={capitalizeFirstLetter(formData.title)}
              onChange={handleChange}
            />
            <span>{errors.title}</span>
          </div>

          <div>
            <InputField
              type="text"
              label="First Name"
              placeholder="David"
              required
              name="firstName"
              value={capitalizeFirstLetter(formData.firstName)}
              onChange={handleChange}
            />
            <span>{errors.firstName}</span>
          </div>

          <div>
            <InputField
              type="text"
              label="Last Name"
              placeholder="Maduabuchi"
              required
              name="lastName"
              value={capitalizeFirstLetter(formData.lastName)}
              onChange={handleChange}
            />
            <span>{errors.lastName}</span>
          </div>

         
          <div>
            <InputField
              type="email"
              label="Email"
              placeholder="davidmaduabuchi62@gmail.com"
              required
              autoComplete="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span>{errors.email}</span>
          </div>

          <div>
            <InputField
              type="password"
              placeholder="**********"
              label="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span>{errors.password}</span>
          </div>

          <span className="flex text-xs space-x-2 leading-[18px]">
            <Switch className="h-6" />
            <p className="capitalize text-[#2D3748]">remember me</p>
          </span>

          <div>
            <InputField
              type="password"
              placeholder="**********"
              label="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors) {
                  setErrors({
                    ...errors,
                    confirmPassword: "",
                  });
                }
              }}
            />
            <span>{errors.confirmPassword}</span>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full uppercase p-6 bg-[#347AE2] text-base font-normal leading-6 text-white hover:bg-indigo-500 animate duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {loading ? <span className="loader"></span> : "sign up"}
          </Button>
          <span className="login-success">{successMessage}</span>
          <p className="mt-3.5 text-left font-normal text-sm leading-5 text-[#A0AEC0]">
            Already have an account?
            <NavLink to={"/signin"} className="text-[#347AE2] ml-2">
              Sign in
            </NavLink>
          </p>
        </form>

        {toastType !== "" && (
          <Toast
            type={toastType}
            successMessage="Admin Account Created"
            successSubmessage="Redirecting to signin..."
          />
        )}
      </div>
    </div>
  );
}
