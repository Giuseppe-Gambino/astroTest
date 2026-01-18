import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="layout-nav relative">
      <nav className={`flex justify-between p-5 ${isOpen && "bg-white pos-100"}`}>
        <h1 className={`font-bold text-3xl ${isOpen && "text-gradient"}`} alt="logo Go">
          GO.
        </h1>

        <ul className="hidden md:flex gap-5">
          <li href="/home">Home</li>
          <li>Contatti</li>
        </ul>
        <img className={`md:hidden font-bold text-gray-700 h-7.5 ${!isOpen && "ham"}`} src="/menu.png" alt="logo pulsar" onClick={() => setIsOpen(!isOpen)} />
      </nav>
      {/* SottoMenu Mobile */}
      <div
        className={`menu-mobile text-center overflow-hidden transition-all duration-300 ease absolute w-full left-0 bg-white ${
          isOpen ? "max-h-96 pb-3" : "max-h-0 pb-0"
        }`}
      >
        <ul className="text-center px-5">
          <li>Home</li>
          <li>Contatti</li>
        </ul>
        <button type="button" className="bg-[#4e84e9] mt-3 py-3 px-4 rounded-md text-white text-sm font-semibold uppercase tracking-wider">
          Contattaci
        </button>
      </div>
    </header>
  );
}
