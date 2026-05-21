import API from "../config/API.js";
import ChatRoom from "./pages/ChatRoom.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useEffect, useState ,useRef } from "react";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserContext from "./context/UserContext.jsx";
import Layout from "./context/Layout.jsx";
import AdminHomePage from "./pages/AdminHomePage.jsx";
import WSocket from "./WSocket.js";

function App() {
  const socket = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const currentUser = await API.get("/users/check-auth");
        setUser(currentUser.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);
  useEffect(()=>{
    if(user){
      WSocket.io.opts.query = {
        userId : user._id,
      };
      socket.current = WSocket.connect();
      socket.current.on('connect',()=>{
        console.log('connected to socket server with id: ' + socket.current.id);
      })
    }
    return ()=>{
      if(socket.current){
        socket.current.disconnect();
      }
    }
  },[user])

  return user ? (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="flex">
          <Routes>
            {user.role === "admin" ? (
              <Route path="/" element={<AdminHomePage />} />
            ) : (
              <Route path="/" element={<Layout><HomePage /></Layout>} />
            )}
            <Route path="/chatRoom/:id" element={<Layout><ChatRoom /></Layout>} />
          </Routes>
        </div>
      </UserContext.Provider>
    </>
  ) : (
    <>
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
