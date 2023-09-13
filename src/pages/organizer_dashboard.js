import EventsTable from "../components/eventsTable";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useState } from "react";

export default function OrgDashboard() {
    const [Organizer, setOrganizer] = useState({});

    useEffect(() => {
        const savedOrganizer = JSON.parse(localStorage.getItem("organizer"));
        if (savedOrganizer) {
            setOrganizer(savedOrganizer);
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8">
                {/* Poster Section (Placeholder) */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-xl font-bold mb-4">Profile Picture</h2>
                    <img src={Organizer.image} alt={Organizer.name} className="w-1/4" />
                    {/* Include poster components or information here */}
                </div>

                {/* Organizer Information Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-xl font-bold mb-4">Organizer Information</h2>
                    <p className="mb-2">Name: {Organizer.name}</p>
                    <p className="mb-2">Email: {Organizer.email}</p>
                    <p className="mb-2">Contact: {Organizer.contact}</p>
                    <p className="mb-2">Address: {Organizer.address}</p>
                </div>

                {/* Events Table Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Events Table</h2>
                    <EventsTable />
                </div>
            </div>
            <Footer />
        </div>
    );
}
