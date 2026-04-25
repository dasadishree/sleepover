import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";


const characters = [
    { id: "celeste", src: "/characters/celeste.jpeg", name: "CELESTE-CAKE :)"},
    { id: "kailing", src: "/characters/kailing.png", name: "KAI-LING-CAKE :D" },
    { id: "olive", src: "/characters/olive.jpeg", name: "OLIVE-CAKE :P"},
    { id: "reem", src: "/characters/reem.png", name: "REEM-CAKE :-)"},
    { id: "tongyu", src: "/characters/tongyu.png", name: "TONGYU-CAKE :O"},
    { id: "renran", src: "/characters/renran.png", name: "RENRAN-CAKE :3"},
]

const Selection = () => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(0)
    const [role, setRole] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    // sslect character & store
    async function handleCharacterSelect() {
        if (!role) return;
        const selectedCharacter = characters[selected];
        setIsSubmitting(true);

        try {
            await setDoc(
                doc(db, "players", role),
                {
                    role,
                    characterId: selectedCharacter.id,
                    characterName: selectedCharacter.name,
                    updatedAt: Date.now(),
                },
                { merge: true }
            );

            navigate(role === "actor" ? "/actor" : "/guesser");
        } catch (error) {
            console.error("failed to store character selection:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <div>
                <img src="public/start.png" className="fixed top-0 left-0 w-full h-screen object-cover z-0" alt="background"/>
            </div>

            {/* role pick */}
            {!role && (
                <div className="absolute z-10 top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[4vh]">
                    <div className="flex gap-[6vw]">
                        <button onClick={() => setRole("actor")} style={{fontFamily: "cursive"}} className="bg-white px-[8vw] py-[5vh] rounded-full text-[3vh] text-pink-400 font-bold">ACTOR</button>
                        <button onClick={() => setRole("guesser")} style={{fontFamily: "cursive"}} className="bg-white px-[8vw] py-[5vh] rounded-full text-[3vh] text-pink-400 font-bold">GUESSER</button>
                    </div>

                    <div style={{fontFamily: "'Rubik Bubbles', cursive"}} className="text-pink-400 text-[5vh] whitespace-nowrap">
                        <h1>PICK YOUR ROLE!!!!</h1>
                    </div>
                </div>
            )}

            {/* carosel */}
            {role && (
                <>
                <div className="absolute z-10 bottom-[25%] left-1/2 -translate-x-1/2 flex items-center justify-center mt-[40vh] gap-[2vw]">
                        <button onClick={goLeft} className="text-white text-[5vh] px-4">◀</button>
                        
                        <div className="flex items-center gap-[2vw]">
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
                        </div>
                        <button onClick={goRight} className="text-white text-[5vh] px-4">▶</button>
                    </div>

{/* submit button for character */}
                    <button
                        onClick={handleCharacterSelect}
                        disabled={isSubmitting}
                        style={{fontFamily: "cursive"}}
                        className="absolute z-10 bottom-[3%] left-1/2 -translate-x-1/2 bg-white px-[6vw] py-[2vh] rounded-full text-[2.5vh] text-pink-400 font-bold disabled:opacity-60"
                    >
                        {isSubmitting ? "SAVING..." : "SELECT"}
                    </button>

                    <div style={{fontFamily: "'Rubik Bubbles', cursive"}} className="absolute z-10 bottom-[10%] left-1/2 -translate-x-1/2 text-pink-400 text-[5vh]">
                        <h1>PICK YOUR CHARACTER!!!!</h1>
                    </div>
                </>
            )}

        </div>
    );
};

export default Selection;