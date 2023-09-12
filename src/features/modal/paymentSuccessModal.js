import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "./animation_lmeziwr1.json";
import PaymentReceivedModal from "./paymentReceivedModal";

export default function PaymentSuccessModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [showPaymentReceivedModal, setShowPaymentReceivedModal] =
    useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setIsContentLoading(true);
    }, 4000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    if (isContentLoading) {
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  }, [isContentLoading]);

  useEffect(() => {
    // This useEffect will trigger when isContentLoading becomes true.
    if (isContentLoading) {
      // After 2 seconds (adjust this time as needed), open the PaymentReceivedModal.
      const modalTimeout = setTimeout(() => {
        setShowPaymentReceivedModal(true);
      }, 2000); // Set the time to open the PaymentReceivedModal after 2 seconds.

      // Cleanup the timeout on unmount or when isContentLoading changes
      return () => {
        clearTimeout(modalTimeout);
      };
    }
  }, [isContentLoading]);

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="md:bg-white md:p-16 md:rounded md:w-[60%] md:h-[95%]">
            {isContentLoading ? (
              <Lottie animationData={animationData} />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-4 border-orange-600 border-solid h-12 w-12"></div>
        </div>
      )}
      {showPaymentReceivedModal && (
        <PaymentReceivedModal
          onClose={() => setShowPaymentReceivedModal(false)}
        />
      )}
    </>
  );
}
