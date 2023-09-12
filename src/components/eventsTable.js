import React, { useState, useEffect } from "react";
import api from "../api";

export default function EventsTable() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const events = await api.get("/events");
            setEvents(events.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };
    
        fetchEvents();
    }, []);
    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>{error}</p>;
    }
    
    return (
        <table className="table-auto w-full">
        <thead>
            <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Event Name</th>
            <th className="px-4 py-2">Event Date</th>
            <th className="px-4 py-2">Event Time</th>
            <th className="px-4 py-2">Event Location</th>
            <th className="px-4 py-2">Event Description</th>
            </tr>
        </thead>
        <tbody>
            {events.map((event, index) => (
            <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{event.eventName}</td>
                <td className="border px-4 py-2">
                    {event.date.map((date, index) => (
                        <div key={index}>{date}</div>
                    ))}
                </td>
                <td className="border px-4 py-2">{event.time}</td>
                <td className="border px-4 py-2">{event.location}</td>
                <td className="border px-4 py-2">{event.description}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
    }
