import React, { useState } from 'react'

const Navbar = ({coins,filteredCoin,setFilteredCoin}) => {
    const [isHover, setIsHover] = useState(false);

    const search_coin = (e)=>{
        if (coins && coins.length>0) {
            if (e.target.value && typeof e.target.value=='string') {
                setFilteredCoin(coins.filter(coin=>(coin.name.toLowerCase()).includes(e.target.value.toLowerCase())));
            }
            if(e.target.value==='') setFilteredCoin(coins);
        }
    }
    // console.log('coins');
    console.log(filteredCoin);
    return (
        <div class="grid grid-cols-2 mb-2 lg:my-12">
            <div className=''>
                <h1 className='text-6xl text-orange'>Logo</h1>
            </div>
            <div className='grid grid-cols-3 gap-2 py-2'>
                <div className={`${isHover ? "relative" : ""}`}>
                    <input onChange={(e)=>search_coin(e)} onMouseEnter={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} type="text" placeholder="bitcoin/ethereum.." class="w-full p-3 border border-gray-800 rounded-full focus:outline-none focus:ring-2 relative z-20" />
                    {isHover ?
                        <div class="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 hover:from-indigo-400 hover:to-cyan-400 blur-lg rounded-lg"></div>
                        : ""}
                </div>
                <button className="flex items-center gap-2 bg-orange-900 text-white px-4 rounded-full hover:bg-blue-700">
                    <img src="/images/paypal.png" alt="PayPal" className="w-8 h-8 rounded-full" />
                    <span>Buy with PayPal</span>
                </button>
                <button className='text-center text-white bg-orange-900 rounded-full hover:bg-blue-700'>Track an Ethereum Address</button>
            </div>
        </div>
    )
}

export default Navbar