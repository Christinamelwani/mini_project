import { useState } from "react";
import api from "../api";

function validateForm() {
  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");

  let isValid = true;

  if (!nameValue.trim()) {
    nameError.textContent = "Name is required!";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  if (!emailValue.trim()) {
    emailError.textContent = "Email is required!";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  return isValid;
}

export default function Register({ activeEvent }) {
  const [mode, setMode] = useState("register");
  const [code, setCode] = useState("BLANK");
  const user = JSON.parse(localStorage.getItem("user"));

  async function registerForEvent(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const referralCode = document.getElementById("referral_code").value;

    if (referralCode) {
      const referralCodes = await api.get("/referral_codes");

      const referral = referralCodes.data.find(
        (code) => code.code === referralCode
      );

      if (!referral) {
        alert("Invalid referral code");
        return;
      }

      if (referral.user_id === user.id) {
        alert("Cannot use your own referral code!");
        return;
      }

      // update 10 points for user with id that matches referral and 10 points for current user
      const userWhoCreatedReferral = await api.get(
        `/users/${referral.user_id}`
      );
      await api.patch(`/users/${referral.user_id}`, {
        points: userWhoCreatedReferral.data.points + 10,
      });

      await api.patch(`/users/${user.id}`, {
        points: user.points + 10,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, points: user.points + 10 })
      );
    }

    const newCode = (Math.random() + 1).toString(36).substring(7);
    await api.post("/referral_codes", { code: newCode, user_id: user.id });
    setCode(newCode);
    setMode("code");
  }

  if (mode === "register") {
    return (
      <div class="flex flex-col items-center lg:h-[70%] mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-black">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-orange-900 md:text-2xl dark:text-white">
              Register for {activeEvent.eventName}
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Christina"
                  class="bg-orange-50 border border-orange-300 text-orange-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="true"
                />
                <span id="nameError" class="text-red-500 text-xs"></span>
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Your email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-orange-50 border border-orange-300 text-orange-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required="true"
                />
                <span id="emailError" class="text-red-500 text-xs"></span>
              </div>

              <div>
                <label
                  for="referral_code"
                  class="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Referral code
                </label>
                <input
                  type="text"
                  name="referral_code"
                  id="referral_code"
                  class="bg-orange-50 border border-orange-300 text-orange-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-orange-700 dark:border-orange-600 dark:placeholder-orange-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="12345"
                  required=""
                />
              </div>

              <button
                onClick={registerForEvent}
                class="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else if (mode === "code") {
    return (
      <div className="text-white gap-5 flex flex-col w-full justify-center items-center mt-[25%]">
        <h2 className="text-3xl">
          Congratulations, you have registered for {activeEvent.eventName}
        </h2>
        <p className="text-2xl">Your referral code is {code}</p>
        <p className="text-2xl">Share it with your friends:</p>
        <div className="flex gap-10">
          <img
            className="w-[50px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
          ></img>
          <img
            className="w-[50px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
          ></img>
          <img
            className="w-[50px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
          ></img>
        </div>
      </div>
    );
  }
}
