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
          <div
            className=" rounded py-4 md:w-[95%] md:h-[95%] w-full h-full backdrop-blur-sm bg-top bg-opacity-25"
            style={{
              backgroundImage:
                "url(https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fimage_uploads%2Fhomepage%2Fhomepage-medium.jpg&w=3840&q=75)",
            }}
          >
            <div className="flex flex-col items-center mb-2">
              <h1 className="text-xl text-orange-500">Terima Kasih!</h1>
              <h1 className="text-xl text-orange-500">
                Pembayaranmu Sudah Kami Terima!
              </h1>
            </div>
            <div className="flex items-center mb-[23px] border-orange-600 p-5">
              <div className="flex  flex-col lg:flex-row ">
                <img
                  className="mr-5 "
                  src={events.poster}
                  alt={events.eventName}
                />
                <div className="flex flex-col mt-20">
                  <p className="font-bold text-white">{events.eventName}</p>
                  <p className="font-bold text-white">{events.venue}</p>
                  <p className="font-bold mb-3 text-white">{events.date}</p>
                  <p className="font-bold text-orange-500">
                    Silahkan cek E-mail kamu untuk melihat tiket
                  </p>
                  <img
                    className=" justify-center items-center hidden lg:block w-[600px] h-[300px]"
                    src="https://www.pngkit.com/png/full/16-168761_party-crowd-png-crowd-at-concert-png.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="mt-3 font-bold text-orange-600 text-3xl">
                Your Next Best Night Ever is Waiting
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
