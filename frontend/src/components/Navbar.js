import React,{useState} from 'react'

const Navbar = () => {
    const [isHover, setIsHover] = useState(false);
  return (
      <div class="grid grid-cols-2 mb-2 lg:my-12">
        <div className=''>
            <h1 className='text-6xl text-orange'>Logo</h1>
        </div>
        <div>
            <div className={`${isHover ? "relative" : ""}`}>
                <input onMouseEnter={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)} type="text" placeholder="Enter text..." class="w-full p-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 relative z-20" />
                {isHover ? 
                <div class="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-cyan-400 hover:from-indigo-400 hover:to-cyan-400 blur-lg rounded-lg"></div>
                : ""}
            </div>

        </div>
      </div>
  )
}

export default Navbar