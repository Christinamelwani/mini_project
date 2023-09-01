import { useDispatch } from "react-redux";
import { setModalIsOpen } from "../features/modal/modalSlice";
import { setActiveEvent } from "../features/event/eventSlice";

export default function Event({ eventData }) {
  const dispatch = useDispatch();

  function registerForEvent() {
    dispatch(setModalIsOpen(true));
    dispatch(setActiveEvent(eventData));
  }

  return (
    <div className="bg-black text-white rounded p-4">
      <img src={eventData.poster} className="mb-4 w-full" />
      <div className="flex flex-col items-center md:flex-row md:items-center justify-between">
        <h3 className="text-xl font-semibold mb-2 md:mb-0 md:mr-4 text-center md:text-left">
          {eventData.eventName}
        </h3>
        <button
          onClick={() => registerForEvent()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
