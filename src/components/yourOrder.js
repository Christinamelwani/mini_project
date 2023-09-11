import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function YourOrder() {
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1); // Initialize with 1 ticket
  const [ticketPrice, setTicketPrice] = useState(null);
  const [taxPercentage, setTaxPercentage] = useState(11);
  const adminFee = 1000;

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((response) => {
        const eventData = response.data;
        setEvents(eventData);
        setTicketPrice(eventData.ticketPrice);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setIsLoading(false);
      });
  }, [id]);

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

  const applyCoupon = () => {
    if (events.ticketPrice === "Free") {
      alert("You cannot apply a coupon to a free event.");
      return;
    }
    setIsApplyingCoupon(true);
    setTimeout(() => {
      const selectedCoupon = coupons.find(
        (coupon) => coupon.code === couponCode
      );
      if (selectedCoupon) {
        const discountPercentage = selectedCoupon.discount;
        const discountAmount = (ticketPrice * discountPercentage) / 100;

        setAppliedCoupon({
          code: couponCode,
          discount: discountPercentage,
          discountAmount: discountAmount,
        });

        // Calculate the discounted price for one ticket
        const discountedPriceForOneTicket = ticketPrice - discountAmount;
        setDiscountedPrice(discountedPriceForOneTicket);
      } else {
        alert("Invalid or Expired Coupon");
        setAppliedCoupon(null);
        setDiscountedPrice(null);
        console.log("Coupon not found");
      }
      setIsApplyingCoupon(false);
    }, 1500); // Simulated delay of 1500ms
  };

  useEffect(() => {
    if (discountedPrice !== null) {
      const subtotal = discountedPrice * ticketQuantity;
      const taxAmount = (subtotal * taxPercentage) / 100;
      const total = subtotal + taxAmount + adminFee;
      setTotalPrice(total);
    } else {
      const subtotal = ticketPrice * ticketQuantity;
      const taxAmount = (subtotal * taxPercentage) / 100;
      const total = subtotal + taxAmount + adminFee;
      setTotalPrice(total);
    }
  }, [discountedPrice, ticketPrice, ticketQuantity, taxPercentage]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const incrementQuantity = () => {
    setTicketQuantity(ticketQuantity + 1);
  };

  const decrementQuantity = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
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
        <div className="mb-5">
          <label htmlFor="ticketQuantity">Quantity of Tickets</label>
          <div className="flex items-center">
            <button
              className="border border-black rounded-l px-2 text-orange-600 text-lg font-bold"
              onClick={decrementQuantity}
            >
              {"<"}
            </button>
            <input
              className="border border-black rounded-r mx-2 px-4 py-1 w-12"
              id="ticketQuantity"
              type="text"
              value={ticketQuantity}
              readOnly
            />
            <button
              className="border border-black rounded-r px-2 text-orange-600 text-lg font-bold"
              onClick={incrementQuantity}
            >
              {">"}
            </button>
          </div>
        </div>
        <label htmlFor="couponCode">Coupon</label>
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
            isApplyingCoupon || events.ticketPrice === "Free"
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={isApplyingCoupon || events.ticketPrice === "Free"}
        >
          Apply Coupon
        </button>
        <div className="p-2 flex justify-between items-center">
          <p className="p-2">Subtotal:</p>
          <p className="p-2">
            {events.ticketPrice === "Free"
              ? "FREE"
              : formatter.format(ticketPrice * ticketQuantity)}
          </p>
        </div>
        <hr />
        {appliedCoupon ? (
          <div className="p-2 flex justify-between items-center">
            <p className="p-2">Discount ({appliedCoupon.code}):</p>
            <p className="p-2">
              - {formatter.format(appliedCoupon.discountAmount)}
            </p>
          </div>
        ) : null}
        <hr />
        <div className="p-2 flex justify-between items-center">
          <p className="p-2">Tax ({taxPercentage}%):</p>
          <p className="p-2">
            {formatter.format((totalPrice - adminFee) * (taxPercentage / 100))}
          </p>
        </div>
        <hr />
        <div className="p-2 flex justify-between items-center">
          <p className="p-2">Admin Fee:</p>
          <p className="p-2">{formatter.format(adminFee)}</p>
        </div>
        <hr />
        <div className="p-2 flex justify-between items-center my-5">
          <p className="p-2 font-bold">Total:</p>
          <p className="p-2 font-bold">{formatter.format(totalPrice)}</p>
        </div>
        <hr />
      </div>
    </div>
  );
}
