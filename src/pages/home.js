import ModalComponent from "../components/modal";
import Register from "../components/registerModal";
import Hero from "../components/hero";
import PopularEvents from "../components/popularEvents";
import Footer from "../components/footer";
import Filters from "../components/filters";
import { useSelector } from "react-redux";
import Referral from "../components/referralModal";

export default function Home() {
  const modalContent = useSelector((state) => state.modal.content);

  return (
    <div>
      <Hero />
      <Filters />
      <PopularEvents />
      <Footer />
      <ModalComponent>
        {modalContent === "register" ? <Register /> : <Referral />}
      </ModalComponent>
    </div>
  );
}
