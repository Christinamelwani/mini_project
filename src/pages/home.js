import { useEffect, useState } from "react";
import ModalComponent from "../components/modal";
import Register from "../components/register";
import Hero from "../components/hero";
import PopularEvents from "../components/popularEvents";
import Footer from "../components/footer";
import Filters from "../components/filters";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState({});
  const navigate = useNavigate();

  const openRegisterModal = () => {
    if (localStorage.getItem("user")) {
      setModalIsOpen(true);
    } else {
      navigate("/login");
    }
  };
  const closeRegisterModal = () => setModalIsOpen(false);

  return (
    <div>
      <Hero />
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
