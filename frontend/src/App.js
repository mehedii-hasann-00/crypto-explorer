
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js"
function App() {
  const [coins, setCoins] = useState([]);
  const [showMore, setShowMore] = useState(10);
  useEffect(() => {
    get_coins();
    // setInterval(price_fetch, 3000);
  }, [])


  const get_coins = async () => {
    let response = await fetch('http://localhost:5000/get');
    response = await response.json();
    setCoins(response.all_coins);
  }

  // const price_fetch = ()=>{

  //   setInterval(price_fetch, 3000);
  // }

  // console.log(coins[0].quote.USD.price)
  return (
    <div className="mt-2 mx-2 md:mx-4 md:mt-6 lg:mt-8 lg:mx-12 ">
      <Navbar />
      <div className="text-center my-2 lg:my-12">
        <h1 className="relative text-2xl md:text-4xl lg:text-8xl font-bold bg-gradient-to-br from-orange-500 to-white-900 bg-clip-text text-transparent">
          <span className="text-orange-500">{coins && coins[0] ? <img src={`${coins[0].logo}`} className="h-32 w-32 absolute left-[16%]"/> : "B"}</span>uy Real Money <br />
          <span className="text-2xl lg:text-6xl">with fake money</span>
        </h1>
      </div>
      <div>
        <table className="table-auto border-collapse border border-gray-600 w-full text-center">
          <thead className="bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 text-white">
            <tr>
              <th className="border border-gray-600 px-4 py-2">Rank</th>
              <th className="border border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-600 px-4 py-2">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {coins && coins.length > 0
              ? coins.map((coin, index) => {
                  if (index >= 10) return null;
                  return (
                    <tr
                      key={coin.id}
                      className="group hover:bg-gray-700 hover:shadow-lg transition-all duration-200"
                    >
                      <td className="border border-gray-600 px-4 py-2 text-white group-hover:text-orange-400">
                        {coin.cmc_rank}
                      </td>
                      <td className="border border-gray-600 px-4 py-2 text-white group-hover:text-orange-400">
                        {coin.name}
                      </td>
                      <td className="border border-gray-600 px-4 py-2 text-white group-hover:text-orange-400">
                        {coin.quote?.USD?.price?.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>


      </div>
    </div>
  );
}

export default App;
