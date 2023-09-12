import api from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EventInfo() {
    const [eventData, setEventData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
  
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
  
    return (
      <div className="p-4">
        <img src={eventData.poster} alt={eventData.eventName} />
        <h1 className="text-xl font-bold">{eventData.eventName}</h1>
        <h2 className="text-lg font-bold">{eventData.category.charAt(0).toUpperCase() + eventData.category.slice(1)}</h2>
        <p className="text-sm">{eventData.date}</p>
        <p className="text-sm">{eventData.time}</p>
        <p className="text-sm">{eventData.location}</p>
        <p className="text-sm">{eventData.venue}</p>
        <p className="text-sm">{eventData.quota}</p>
        <p className="text-sm">{eventData.ticketPrice}</p>
        <p className="text-sm">{eventData.maxAttendees}</p>
        <p className="mt-2">{eventData.description}</p>
      </div>
    );
  }
  
  export default EventInfo;   