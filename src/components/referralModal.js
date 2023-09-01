import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";

export default function Referral() {
  const [code, setCode] = useState("BLANK");

  useEffect(() => {
    const newCode = (Math.random() + 1).toString(36).substring(7);
    setCode(newCode);
    api.post("/referral_codes", {
      code: newCode,
      user_id: user.id,
    });
  }, []);

  const activeEvent = useSelector((state) => state.event.activeEvent);
  const user = useSelector((state) => state.user.user);

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
