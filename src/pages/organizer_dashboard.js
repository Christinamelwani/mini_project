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
            <Navbar title={"Organizer Dashboard"}/>
            <div className="container mx-auto mt-8">
                {/* Organizer Information Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6 flex items-center">
                    <div className="w-1/8">
                        {/* Profile picture here */}
                        <img src={Organizer.image} alt="Organizer" className="rounded-full w-32 h-32" />
                    </div>
                    <div className="w-7/8 ml-6">
                        <h2 className="text-xl font-bold mb-4">Organizer Information</h2>
                        <p className="mb-2">Name: {Organizer.name}</p>
                        <p className="mb-2">Email: {Organizer.email}</p>
                        <p className="mb-2">Contact: {Organizer.contact}</p>
                        <p className="mb-2">Address: {Organizer.address}</p>
                    </div>
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
