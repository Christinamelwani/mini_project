import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function PaymentReceivedModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((response) => {
        const eventData = response.data;
        setEvents(eventData);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, [id]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="bg-white rounded py-4 md:w-[95%] md:h-[95%] w-full h-full">
            <div className="flex flex-col items-center border-b mb-2">
              <h1 className="text-xl text-orange-600">Terima Kasih!</h1>
              <h1 className="text-xl text-orange-600">
                Pembayaranmu Sudah Kami Terima!
              </h1>
            </div>
            <div className="flex flex-col items-center mb-[23px]">
              <p>Kamu membeli tiket untuk:</p>
              <p className="font-bold">{events.eventName}</p>
              <img src={events.poster} alt={events.eventName} />
            </div>
            <div
              className="z-0 flex flex-col text-orange-600 font-bold items-center justify-center bg-cover bg-top lg:h-[344px] "
              style={{
                backgroundImage:
                  "url(https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fimage_uploads%2Fhomepage%2Fhomepage-medium.jpg&w=3840&q=75)",
              }}
            >
              <p className="text-2xl my-20">
                Silahkan Cek E-Mail Kamu Untuk Melihat Tiket
              </p>
              <h1 className=" z-10 text-4xl">We'll See You There!</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
