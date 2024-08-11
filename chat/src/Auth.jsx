import axios from "axios";
import { useContext, useState } from "react";
import { usercontext } from "./App.jsx";

export default function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(true);
    const { username: globalUsername, setUsername: setGlobalUsername } =
        useContext(usercontext);
    function handleRegister(e) {
        e.preventDefault();
        axios
            .post("/register", { username: username, password: password })
            .then(() => alert("Registration completed successfully!"))
            .catch((err) => {
                console.log(err);
                alert(err.response.data.detail);
            });
    }
    function handleLogin(e) {
        e.preventDefault();
        axios
            .post("/login", { username: username, password: password })
            .then((e) => {
                if (e.data.message.isLoginOK) {
                    console.log(e);
                    localStorage.setItem("token", e.data.message.token);
                    setGlobalUsername(username);
                } else {
                    alert("Username or password is incorrect.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className="bg-blue-100 h-screen w-screen flex flex-col items-center justify-center">
            <div className="text-4xl mb-6">
                {isRegister ? "Register" : "Log in"}
            </div>
            <div>
                <form className="w-80 text-2xl">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        className="w-full border rounded-md p-2 mb-2 bg-white"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="w-full border rounded-md p-2 mb-2 bg-white"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button
                        className="w-full border rounded-md p-2 mb-2 text-white bg-blue-500 hover:bg-blue-700"
                        onClick={(e) => {
                            if (isRegister) handleRegister(e);
                            else handleLogin(e);
                        }}
                    >
                        {isRegister ? "Register" : "Log in"}
                    </button>
                </form>
                <p className="m-2">
                    {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}
                    &nbsp;
                    <a
                        className="font-semibold hover:font-bold text-blue-500 hover:text-blue-700"
                        onClick={() => {
                            setIsRegister(!isRegister);
                        }}
                    >
                        {isRegister ? "Log in" : "Register"}
                    </a>
                </p>
            </div>
        </div>
    );
}
