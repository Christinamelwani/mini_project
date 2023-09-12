import EventsTable from "../components/eventsTable"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

export default function OrgDashboard() {
    return (
        <div>
        <Navbar title={"Organizer Dashboard"} />
        <EventsTable />
        <Footer />
        </div>
    )
}