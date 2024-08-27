import Image from "next/image";
import React from "react";

function Header() {
  return (
    <header className="h-auto bg-white logo flex items-center">
      {/* <div className=""> */}
      <Image src={"/todo.png"} width={50} height={50} alt="Todo Image" />
      <h1 className="px-2 font-bold text-2xl">TODO</h1>
      {/* </div> */}
    </header>
  );
}

export default Header;
