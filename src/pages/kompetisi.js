import { useSelector } from "react-redux";
import Event from "../components/event"
import ModalComponent from "../components/modal";
import Register from "../components/registerModal";
import Referral from "../components/referralModal";

export default function Kompetisi() {
  const events = useSelector((state) => state.event.events);
  const modalContent = useSelector((state) => state.modal.content);

  return (
    <section className="p-4 md:p-20 gap-5">
      <h2 className="text-xl font-bold">Kompetisi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.filter(event => event.category === 'kompetisi').map((event) => (
            <Event key={event.id} eventData={event} />
        ))}
      <ModalComponent>
        {modalContent === "register" ? <Register /> : <Referral />}
      </ModalComponent>
      </div>
    </section>
  );
}
