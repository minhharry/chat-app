import React, { useContext } from "react";
import { usercontext } from "./App";

export default function Page() {
    const { username, setUsername } = useContext(usercontext);
    return (
        <div className="bg-blue-100 h-screen w-screen flex flex-col items-center justify-center">
            <div className="w-80 text-2xl">
                <div className="text-4xl mb-6 text-center">
                    Hello <strong>{username}</strong>!
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        setUsername(null);
                    }}
                    className="w-full border rounded-md p-2 mb-2 text-white bg-blue-500 hover:bg-blue-700"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}
