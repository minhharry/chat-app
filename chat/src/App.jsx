import axios from "axios";
import { createContext, useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Page from "./Page";

export const usercontext = createContext(null);

function App() {
    axios.defaults.baseURL = "http://localhost:8000/";
    axios.defaults.withCredentials = true;
    const [username, setUsername] = useState(null);
    const token = localStorage.getItem("token");
    if (!username && token) {
        axios
            .get("/get_username_from_token", { params: { token } })
            .then((e) => {
                setUsername(e.data.message);
            })
            .catch((err) => console.log(err));
    }
    username = "a";
    if (username) {
        return (
            <usercontext.Provider value={{ username, setUsername }}>
                <Page />
            </usercontext.Provider>
        );
    }
    return (
        <usercontext.Provider value={{ username, setUsername }}>
            <Auth />
        </usercontext.Provider>
    );
}

export default App;
