import { useState, useEffect } from "react";
import { Wallet, isAddress, Mnemonic, formatEther, InfuraProvider } from "ethers";
const provider = new InfuraProvider('mainnet', 'e8e1754ff5e64e73867f9041b1df1f45');


export default function Modal({ openModal, setOpenModal }) {
    const [wallet, setWallet] = useState({ status: false, value: false,address:false});

    const check_wallet = async(address) => {
        if(address==""){
            setWallet(prev => ({ ...prev, status: false, address:false, value: false }))
        }
        if (address!=="" && isAddress(address)){
            provider.getBalance(address).then((balance) => {
                setWallet(prev=>({...prev,value:formatEther(balance),address:true, status: true})) ;
            })
        }
        if (address!=="" && !isAddress(address)){
            setWallet(prev => ({ ...prev, status: false, address:true, value: false }))
        }
    }

    return (
        <div className="p-6">
            {openModal && (
                <div
                    className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={() => setOpenModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
              relative isolate w-full max-w-md overflow-hidden rounded-3xl
              bg-white/10 backdrop-blur-xl ring-1 ring-white/20 
              shadow-[0_8px_32px_rgba(0,0,0,0.35)]
            "
                    >
                        {/* subtle glass sheen + edge light */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-[inherit] 
                         bg-gradient-to-br from-white/30 to-white/5 opacity-60"
                        />
                        {/* soft glow blobs */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full
                         bg-[radial-gradient(closest-side,rgba(255,255,255,.35),transparent)]"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full
                         bg-[radial-gradient(closest-side,rgba(120,90,255,.28),transparent)]"
                        />

                        <div className="relative p-6">
                            <h2 className="text-xl font-semibold text-white drop-shadow mb-3">
                                Modal Title
                            </h2>
                            <p className="text-white/85 drop-shadow mb-5">
                                This is a frosted glass Tailwind modal. Add any content here.
                            </p>

                            {/* Title + Gradient Input */}
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                enter a valid Ethereum address
                            </label>
                            <input
                                type="text"
                                onChange={(e) => check_wallet(e.target.value)}
                                placeholder="0x0000...abcd"
                                spellCheck={false}
                                autoComplete="off"
                                className="
                  w-full rounded-2xl px-4 py-3 text-white placeholder-white/60
                  bg-gradient-to-br bg-black
                  border border-white backdrop-blur-md
                  ring-0 focus:outline-none focus:ring-2 focus:ring-white/40
                "
                            />
                            {wallet.address && <label className="block text-sm font-medium text-white/90 my-2">
                                {wallet.status ? <span className="text-green-500">
                                    <span>Valid Address</span><br/>
                                    <span className="font-semibold text-lg">Balance : {wallet.value} ETH</span>
                                </span>
                                    : <span className="text-red-500">Invalid Address</span>}
                            </label>}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="px-4 py-2 rounded-xl border border-white/30 text-white/90 hover:bg-white/10"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
