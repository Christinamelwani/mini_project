import { useDispatch } from "react-redux";
import { setModalIsOpen } from "../features/modal/modalSlice";
import { setActiveEvent } from "../features/event/eventSlice";
import { useEffect, useState } from "react";

export default function Event({ eventData }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  function registerForEvent() {
    console.log(user);
    if (user.name === undefined) {
      alert("Please login first!");
      return;
    } else if (user.role === "organizer") {
      alert("Organizer cannot register for event!");
      return;
    } else {
      dispatch(setModalIsOpen(true));
      dispatch(setActiveEvent(eventData));
    }
  }

  return (
    <div className="bg-black text-white rounded p-4">
      <img 
        src={eventData.poster} 
        className="mb-4 w-full object-cover" 
        style={{ width: '1000px', height: '200px' }}
      />
      <div className="flex flex-col items-center md:flex-row md:items-center justify-between">
        <h3 className="text-xl font-semibold mb-2 md:mb-0 md:mr-4 text-center md:text-left">
          {eventData.eventName}
        </h3>
        <button
          onClick={() => registerForEvent()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
