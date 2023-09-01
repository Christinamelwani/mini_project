import { useEffect, useState } from "react";
import api from "../api";
import Event from "./event";

export default function PopularEvents({ openRegisterModal, setActiveEvent }) {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const response = await api.get("/events");
    setEvents(response.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <section className="p-4 md:p-20 gap-5">
      <h2 className="text-xl font-bold">Popular Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.slice(0, 3).map((event) => (
          <Event
            key={event.id}
            eventData={event}
            onOpenRegister={() => {
              openRegisterModal();
              setActiveEvent(event);
            }}
          />
        ))}
      </div>
    </section>
  );
}
