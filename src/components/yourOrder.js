import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function YourOrder() {
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // events.id
  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setIsLoading(false);
      });
  }, [id]);

  //coupons
  useEffect(() => {
    api
      .get(`/coupons`)
      .then((response) => {
        setCoupons(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coupons data:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (discountedPrice !== null) {
      setTotalPrice(discountedPrice);
    } else {
      setTotalPrice(events.ticketPrice);
    }
  }, [discountedPrice, events.ticketPrice]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const applyCoupon = () => {
    setIsApplyingCoupon(true);

    setTimeout(() => {
      const selectedCoupon = coupons.find(
        (coupon) => coupon.code === couponCode
      );

      if (selectedCoupon) {
        const discountPercentage = selectedCoupon.discount;
        const discount = (events.ticketPrice * discountPercentage) / 100;
        const newDiscountedPrice = events.ticketPrice - discount;

        setAppliedCoupon({ code: couponCode, discount: discountPercentage });
        setDiscountedPrice(newDiscountedPrice);
      } else {
        alert("Invalid or Expired Coupon");
        setAppliedCoupon(null);
        setDiscountedPrice(null);
        console.log("Coupon not found");
      }

      setIsApplyingCoupon(false); // Reset loading state after coupon logic
    }, 1500); // Simulated delay of 1500ms
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold">Your Order</h1>
      <div className="border-[1px] shadow-md mb-8 rounded p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : events ? (
          <div className="flex flex-col">
            <p>Event Name: {events.eventName}</p>
            <p>Date: {events.date}</p>
            <p>Event Venue: {events.venue}</p>
            <p>Location: {events.location}</p>
            <p>
              <img
                className="shadow-md mt-5"
                src={events.poster}
                alt={events.eventName}
              />
            </p>
          </div>
        ) : (
          <p>No order data available.</p>
        )}
      </div>
      <div className="justify-between flex flex-col ">
        <label htmlFor="couponCode">Kupon</label>
        <input
          className="mb-5 border border-black rounded-xl py-2"
          id="couponCode"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          onClick={applyCoupon}
          className={`rounded-lg p-1 w-auto bg-orange-600 text-white font-semibold ${
            isApplyingCoupon ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isApplyingCoupon}
        >
          Pakai Kupon
        </button>
        <div className="p-2 flex justify-between items-center">
          <p className="p-2">Subtotal:</p>
          <p className="p-2">{formatter.format(events.ticketPrice)}</p>
        </div>
        <hr />
        {appliedCoupon ? (
          <div className="p-2 flex justify-between items-center">
            <p className="p-2">Discount ({appliedCoupon.code}):</p>
            <p className="p-2">
              - {formatter.format(events.ticketPrice - totalPrice)}
            </p>
          </div>
        ) : null}
        <hr />
        <div className="p-2 flex justify-between items-center">
          <p className="p-2">Total:</p>
          <p className="p-2">{formatter.format(totalPrice)}</p>{" "}
          {/* Format totalPrice */}
        </div>
        <hr />
      </div>
    </div>
  );
}
