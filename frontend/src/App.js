
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js"
function App() {
  useEffect(() => {
    get_coins()
  }, [])

  const get_coins = async () => {
    
    let response = await fetch('http://localhost:5000/get');
    // console.log(response);
    response = await response.json();
    console.log(response);
  }

  return (
    <div className="mt-2 mx-2 md:mx-4 md:mt-6 lg:mt-8 lg:mx-12 color-grey">
      <Navbar />
      <div className="text-center my-2 lg:my-12">
        <h1 className=" text-2xl md:text-4xl lg:text-8xl font-bold bg-gradient-to-br from-orange-800 to-white-800 bg-clip-text text-transparent">
          <span className="text-orange-500">B</span>uy Real Money <br />
          <span className="text-2xl lg:text-6xl">with fake money</span>
        </h1>
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
