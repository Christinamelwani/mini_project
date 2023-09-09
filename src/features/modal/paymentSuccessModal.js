import React, { useState, useEffect } from "react";

export default function PaymentSuccessModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the delay time as needed

    return () => {
      clearTimeout(delay);
    };
  }, []);

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
          {isLoading ? (
            <div className="animate-spin rounded-full border-t-4 border-orange-600 border-solid h-12 w-12"></div>
          ) : (
            <div className="bg-white p-16 rounded w-[60%] h-[95%]">
              <div>
                <h1 className="text-xl text-orange-600">Terima Kasih!</h1>
                <h1 className="text-xl text-orange-600">
                  Pembayaranmu Sudah Kami Terima!
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
