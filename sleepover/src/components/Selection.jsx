import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";


const characters = [
    { id: "celeste", src: "/characters/celeste.jpeg", name: "CELESTE-CAKE :)"},
    { id: "kailing", src: "/characters/kailing.png", name: "KAI-LING-CAKE :D" },
    { id: "olive", src: "/characters/olive.jpeg", name: "OLIVE-CAKE :P"},
    { id: "reem", src: "/characters/reem.png", name: "REEM-CAKE :-)"},
    { id: "tongyu", src: "/characters/tongyu.png", name: "PAN-CAKE :O"},
    { id: "renran", src: "/characters/renran.png", name: "RENRAN-CAKE :3"},
]

const Selection = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(0)


    function goLeft(){
        setSelected((selected - 1 + characters.length) % characters.length)
    }
    function goRight(){
        setSelected((selected + 1) % characters.length)
    }
    useEffect(() => {
        function handleKey(e) {
            if(e.key==="ArrowLeft") goLeft()
            if(e.key==="ArrowRight") goRight()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    return (
        <div>
            <div>
                <img src="public/start.png" className="fixed top-0 left-0 w-full h-screen object-cover z-0" alt="background"/>
            </div>

            {/* carosel */}
            <div className="absolute z-10 bottom-[30%] left-1/2 -translate-x-1/2 flex items-center justify-center mt-[40vh] gap-[2vw]">
                <button onClick={goLeft} className="text-white text-[5vh] px-4">◀</button>
                
                {[-1,0,1].map(offset => {
                    const index = (selected + offset + characters.length) % characters.length
                    const char = characters[index]
                    const isCenter = offset ===0
                    return(
                        <div key={char.id} className="flex flex-col items-center transition-all duration-300"
                            style={{
                                transform: isCenter ? "scale(1.2)" : "scale(0.8)",
                                opacity: isCenter ? 1:0.5,
                            }}>
                            <img src={char.src} alt={char.id} className={`w-[15vw] h-[15vw] object-cover rounded-full transition-all duration-300 ${
                                isCenter ? "border-4 border-pink-400" : "border-2 border-transparent"
                            }`}/>
                            {isCenter && (
                                <p className="text-pink-700 text-[2vh] mt-4 capitalize">
                                    {char.name}
                                </p>
                            )}
                        </div>
                    )
                })}
                <button onClick={goRight} className="text-white text-[5vh] px-4">▶</button>
            </div>

            {/* caption */}
            <div style={{fontFamily: "'Rubik Bubbles', cursive"}} className="absolute z-10 bottom-[10%] left-1/2 -translate-x-1/2 text-pink-400 text-[5vh]">
                <h1>PICK YOUR CHARACTER!!!!</h1>
            </div>
        </div>
    );
};

export default Selection;