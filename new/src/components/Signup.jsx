import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      if (!username || !email || !password || !phoneNo) {
        setError("All fields are required");
        return;
      }
    }
    try {
      const response = await fetch(
        "http://localhost:3333/api/admin-users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, phoneNo }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/login");
        setSuccess("Signup successful!");
        setError("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="wrapper login">
      <div className="container">
        <div className="col-left">
          <div className="login-text">
            <h2>Welcome!</h2>
            <p>
              Create your account.
              <br />
              For Free!
            </p>
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out btn"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h1 className="pt-4 pb-3 font-bold dark:text-gray-800 text-5xl text-center cursor-default">
              Sign Up
            </h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form action="#" className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="mb-2  text-gray-800 text-lg"
                >
                  Username
                </label>
                <input
                  id="username"
                  className="border p-3  dark:text-gray-800  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="username"
                  value={username}
                  placeholder="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2  text-gray-800 text-lg">
                  Email
                </label>
                <input
                  id="email"
                  className="border p-3  dark:text-gray-800  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="email"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="mb-2 dark:text-gray-800 text-lg"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="border p-3 shadow-md  dark:text-gray-800  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <h6
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 mb-7 flex items-center text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </h6>
              </div>
              <div>
                <label
                  htmlFor="PhoneNumber"
                  className="mb-2  text-gray-800 text-lg"
                >
                  Phone No
                </label>
                <input
                  id="PhoneNO"
                  className="border p-3  dark:text-gray-800  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="PhoneNo"
                  value={phoneNo}
                  placeholder="PhoneNO"
                  required
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>

              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out"
                href="#"
              ></a>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;

{/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      if (!username || !email || !password || !phoneNo) {
        setError("All fields are required");
        return;
      }
    }
    try {
      const response = await fetch(
        "http://localhost:3333/api/admin-users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, phoneNo }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/login");
        setSuccess("Signup successful!");
        setError("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex  items-center justify-center pt-6 img ">
      <div className=" w-5/6 flex justify-center items-center  top">
        <div className="grid gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
            <div className="border-[20px] border-transparent rounded-[20px]  bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              <h1 className="pt-4 pb-3 font-bold dark:text-gray-800 text-5xl text-center cursor-default">
                Sign Up
              </h1>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <form action="#" className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2  text-gray-800 text-lg"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    className="border p-3  dark:text-gray-800  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="username"
                    value={username}
                    placeholder="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2  text-gray-800 text-lg"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    className="border p-3  dark:text-gray-800  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="email"
                    value={email}
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative w-full max-w-sm mx-auto">
                  <label
                    htmlFor="password"
                    className="mb-2 dark:text-gray-800 text-lg"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="border p-3 shadow-md  dark:text-gray-800  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 mt-4 flex items-center text-gray-500 hover:text-indigo-600"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={24} />
                    ) : (
                      <AiFillEye size={24} />
                    )}
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="PhoneNumber"
                    className="mb-2  text-gray-800 text-lg"
                  >
                    Phone No
                  </label>
                  <input
                    id="PhoneNO"
                    className="border p-3  dark:text-gray-800  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                    type="PhoneNo"
                    value={phoneNo}
                    placeholder="PhoneNO"
                    required
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>

                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Forget your password?
                  </span>
                </a>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
              <div className="flex flex-col mt-4 items-center justify-center text-sm">
                <h3 className="dark:text-gray-600">
                  Don't have an account?
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="/login"
                  >
                    <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Login
                    </span>
                  </a>
                </h3>
              </div>
              <div
                id="third-party-auth"
                className="flex items-center justify-center mt-5 flex-wrap"
              ></div>

              <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
                <p className="cursor-default">
                  By signing in, you agree to our
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="#"
                  >
                    <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Terms
                    </span>
                  </a>
                  <a
                    className="group text-blue-400 transition-all duration-100 ease-in-out"
                    href="#"
                  >
                    <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                      Privacy Policy
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;*/
}
