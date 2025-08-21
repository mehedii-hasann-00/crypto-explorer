
import React, { useState, useEffect} from "react";
import Navbar from "./components/Navbar.js"
import Buy from "./components/Buy.js";
function App() {
  const [coins, setCoins] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [coinLogos, setCoinLogos] = useState([]);
  const [filteredCoin, setFilteredCoin] = useState([]);
  const [showQty, setShowQty] = useState(10);

  useEffect(() => {
    get_coins()
  }, []);

  const get_coins = async()=>{
    let response = await fetch('/api/get');
    response = await response.json();
    setCoins(response.all_coins);
    setCoinLogos(response.logos);
    setInterval(()=>fetch_latest(), 5000);
  }
  const fetch_latest = async()=>{
    console.log('fetching...');
    
    let response = await fetch('/api/fetch-latest');
    response = await response.json();
    setCoins(prev=>{
      setOldData(prev);
      return response.all_coins;
    });
  }

  // console.log(coinLogos)
  return (
    <div className="mt-2 mx-2 md:mx-4 md:mt-6 lg:mt-8 lg:mx-12 ">
      <Navbar coins={coins} filteredCoin={filteredCoin} setFilteredCoin={setFilteredCoin}/>
      <div className="text-center my-2 lg:my-12">
        <h1 className="relative text-2xl md:text-4xl lg:text-8xl font-bold bg-gradient-to-br from-orange-500 to-white-900 bg-clip-text text-transparent">
          Buy Real Money <br />
          <span className="text-2xl lg:text-6xl">with fake money</span>
        </h1>
      </div>
      {/* <Buy/> */}
      {coins && coins.length>0 ?
        <div className="mb-8">
          <table className="table-auto border-collapse border border-gray-600 w-full text-center">
            <thead className="bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 text-white">
              <tr>
                <th className="border border-gray-600 px-4 py-2">Rank</th>
                <th className="border border-gray-600 px-4 py-2">Name</th>
                <th className="border border-gray-600 px-4 py-2">1h %</th>
                <th className="border border-gray-600 px-4 py-2">24h %</th>
                <th className="border border-gray-600 px-4 py-2">7d %</th>
                <th className="border border-gray-600 px-4 py-2">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {(filteredCoin && filteredCoin.length > 0
                ? filteredCoin : coins).map((coin, index) => {
                    if (index >= showQty) return null;
                    return (
                      <tr
                        key={coin.id}
                        className="group hover:bg-gray-700 hover:shadow-lg transition-all duration-200"
                      >
                        <td className="border border-gray-600 px-4 py-2 text-white group-hover:text-orange-400">
                          {coin.rank}
                        </td>
                        <td className="border border-gray-600 px-4 py-2 text-white group-hover:text-orange-400 relative">
                          {coinLogos && coinLogos[coin.id] ?
                          <img src={`${coinLogos[coin.id]}`} className="h-6 w-6 absolute left-[25%]"/> : null}
                          <span>{coin.name}</span>
                        </td>
                        <td className={`border border-gray-600 px-4 py-2 ${coin.one_h > 0 ? "text-green-500" : "text-red-500"} group-hover:text-orange-400`}>
                          {coin.one_h}
                        </td>
                        <td className={`border border-gray-600 px-4 py-2 ${coin.one_day > 0 ? "text-green-500" : "text-red-500"} group-hover:text-orange-400`}>
                          {coin.one_day}
                        </td>
                        <td className={`border border-gray-600 px-4 py-2 ${coin.seven_day > 0 ? "text-green-500" : "text-red-500"} group-hover:text-orange-400`}>
                          {coin.seven_day}
                        </td>
                        <td className={`border border-gray-600 px-4 py-2 ${oldData.length===0 ? "text-white" : coin.price > oldData[index].price ? "text-green-500" : coin.price < oldData[index].price ? "text-red-500" : "text-white"} group-hover:text-orange-400`}>
                          {coin.price}
                        </td>
                      </tr>
                    );
                  })
                }
            </tbody>
          </table>
        </div> : null}
      {coins && coins.length>0 ?
        <div className="grid place-items-center">
          <button onClick={()=>setShowQty(prev=>prev+10)} className=" py-2 px-6 bg-gradient-to-r from-cyan-400 via-pink-400 to-blue-400 rounded-full">
            Show More
          </button>
        </div> : null}
    </div>
  );
}

export default App;


