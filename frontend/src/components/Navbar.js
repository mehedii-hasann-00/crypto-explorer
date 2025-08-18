import React,{useState} from 'react'

const Navbar = () => {
    const [isHover, setIsHover] = useState(false);
  return (
      <div class="grid grid-cols-2 mb-2 lg:my-12">
        <div className=''>
            <h1>Logo</h1>
        </div>
        <div>
            <div className={`${isHover ? "relative" : ""}`}>
                <input onMouseEnter={()=>setIsHover(true)} onMouseOut={()=>setIsHover(false)} type="text" placeholder="Enter text..." class="w-full p-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 relative z-20" />
                {isHover ? 
                <div class="absolute inset-0 bg-gradient-to-r from-blue-800 via-pink-800 to-cyan-800 hover:from-indigo-600 hover:to-cyan-600 blur-md rounded-lg"></div>
                : ""}
            </div>

        </div>
      </div>
  )
}

export default Navbar