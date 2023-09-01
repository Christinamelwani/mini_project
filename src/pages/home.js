import { useEffect, useState } from "react";
import ModalComponent from "../components/modal";
import Register from "../components/register";
import Hero from "../components/hero";
import PopularEvents from "../components/popularEvents";
import Footer from "../components/footer";
import Filters from "../components/filters";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [activeEvent, setActiveEvent] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const openRegisterModal = () => setModalIsOpen(true);
  const closeRegisterModal = () => setModalIsOpen(false);

  return (
    <div>
      <Hero user={user} />
      <Filters />
      <PopularEvents
        openRegisterModal={openRegisterModal}
        setActiveEvent={setActiveEvent}
      />
      <Footer />
      <ModalComponent isOpen={modalIsOpen} onRequestClose={closeRegisterModal}>
        <Register activeEvent={activeEvent} />
      </ModalComponent>
    </div>
  );
}
