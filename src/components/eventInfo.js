import api from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalIsOpen } from "../features/modal/modalSlice";  
import { setActiveEvent } from "../features/event/eventSlice";

function EventInfo() {
    const [eventData, setEventData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [organizer, setOrganizer] = useState({});
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser);
      }
    }, []);

    useEffect(() => {
      const savedOrganizer = JSON.parse(localStorage.getItem("organizer"));
      if (savedOrganizer) {
        setOrganizer(savedOrganizer);
      }
    }, []);
  
    useEffect(() => {
      api
        .get(`/events/${id}`)
        .then((response) => {
          const eventData = response.data;
          setEventData(eventData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }, [id]);
    
    if (!eventData) {
      return <div>Loading...</div>;
    }

    function registerForEvent() {
      if (user && user.name) {
        dispatch(setModalIsOpen(true));
        dispatch(setActiveEvent(eventData));
      } else if (organizer && organizer.name) {
        alert("Organizer cannot register for event!");
      } else {
        alert("Please login first!");
      }
    }

    return (
      <div className="p-4">
        <div style={{ display: 'flex', gap: '15px'}}>
          <div id="poster">
            <img src={eventData.poster} alt={eventData.eventName} />
          </div>
          <div id="information">
            <h1 className="text-xl font-bold" style={{ maxWidth: '80%', paddingRight: '20px' }} >{eventData.eventName}</h1>
            <h2 className="text-lg font-bold">{eventData.category.charAt(0).toUpperCase() + eventData.category.slice(1)}</h2>
            <p className="text-sm">{eventData.date}</p>
            <p className="text-sm">{eventData.time}</p>
            <p className="text-sm">{eventData.location}</p>
            <p className="text-sm">{eventData.venue}</p>
            <p className="text-sm">{eventData.quota}</p>
            <p className="text-sm">{eventData.ticketPrice}</p>
            <p className="text-sm">{eventData.maxAttendees}</p>
            <p className="mt-2" style={{ maxWidth: '40%', paddingRight: '20px' }}>{eventData.description}</p>
            <br />
            <button
              onClick={() => registerForEvent()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default EventInfo;   