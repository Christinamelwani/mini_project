import React, { useState, useEffect } from "react";
import api from "../api";

export default function EventsTable() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [organizer, setOrganizer] = useState({});
    const [filterEvents, setFilterEvents] = useState([]);

    useEffect(() => {
        const savedOrganizer = JSON.parse(localStorage.getItem("organizer"));
        if (savedOrganizer) {
            setOrganizer(savedOrganizer);
        }
    }, []);
    
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

    useEffect(() => {
        const filteredEvents = events.filter((event) => event.organizer_id === organizer.id);
        setFilterEvents(filteredEvents);
    }, [events, organizer]);

    
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
            {filterEvents.map((event, index) => (
            <tr key={event.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{event.eventName}</td>
                <td className="border px-4 py-2">{event.date}</td>
                <td className="border px-4 py-2">{event.time}</td>
                <td className="border px-4 py-2">{event.location}</td>
                <td className="border px-4 py-2">{event.description}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
    }
