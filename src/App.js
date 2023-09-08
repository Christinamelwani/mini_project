import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Music from "./pages/music";
import Workshop from "./pages/workshop";
import Kompetisi from "./pages/kompetisi";
import Others from "./pages/others";
import api from "./api";
import { setEvents } from "./features/event/eventSlice";
import { setUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const getEvents = async () => {
    const response = await api.get("/events");
    dispatch(setEvents(response.data));
  };
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(setUser(user));
  };

  useEffect(() => {
    getEvents();
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/music" element={<Music />} />
      <Route path="/workshop" element={<Workshop />} />
      <Route path="/kompetisi" element={<Kompetisi />} />
      <Route path="/others" element={<Others />} />
    </Routes>
  );
}

export default App;
