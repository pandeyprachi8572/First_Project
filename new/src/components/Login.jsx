import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { login } from "../utils/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("authent", email, password);
  //const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3333/api/admin-users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate("/dashboard");
        console.log(data);
      } else {
        setError(data.message || "Invalid login ");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };
  //const togglePasswordVisibility = () => {
  //setShowPassword(!showPassword);
  //};
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
            <a className="btn" href="/signup">
              Sign Up
            </a>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-800 text-5xl text-center cursor-default">
              Log in
            </h1>
            {error && <p classNameName="text-red-500 mb-4">{error}</p>}
            <form action="#" className="space-y-4" onSubmit={handleSubmit}>
              <p>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="border p-3 shadow-md dark:text-gray-800 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="border p-3 shadow-md dark:text-gray-800 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/*<p
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 mt-4 flex items-center text-gray-500 hover:text-indigo-600"
                >*/}
                {/*{showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}*/}
              </p>

              <button
                className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit"
              >
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

//type={showPassword ? "text" : "password"} ye password ke input me add krna h

/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { login } from "../utils/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("authent", email, password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3333/api/admin-users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate("/dashboard");
        console.log(data);
      } else {
        setError(data.message || "Invalid login credentials");
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

            <a className="btn" href="/signup">
              Sign Up
            </a>
          </div>
        </div>

        <div class="col-right">
          <div class="login-form">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-800 text-5xl text-center cursor-default">
              Log in
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form action="#" className="space-y-4" onSubmit={handleSubmit}>
              <p>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="border p-3 shadow-md dark:text-gray-800 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="border p-3 shadow-md dark:text-gray-800 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <p
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 mt-4 flex items-center text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={24} />
                  ) : (
                    <AiFillEye size={24} />
                  )}
                </p>
              </p>
              <button
                className="bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                type="submit">
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;*/
