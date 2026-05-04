import React from "react";
import { Link } from "react-router-dom";

export default function Card({ image, heading, description, buttonText, onClick }) {
  return (
    <div
      className=" h-[60vh] mt-10 relative rounded-xl overflow-hidden flex items-end p-6 shadow-[0_10px_30px_-15px_rgba(0,242,173,0.6)]"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-white">
        <h3 className="text-2xl font-bold mb-2">{heading}</h3>
        <p className="mb-4">{description}</p>
      </div>
    </div>
  );
}
