import React from "react";
import {useNavigate} from "react-router-dom";

const Start = () => {
    const navigate = useNavigate();

    return (
        <div>
            <img src="public/start.png" className="fixed top-0 left-0 w-full h-screen object-cover z-0" alt="background"/>
            <button 
                onClick={() => navigate("/actor")}
                style={{fontFamily: "cursive"}} 
                className="absolute z-10 bottom-[30%] left-1/2 -translate-x-1/2 bg-white px-[8vw] py-[5vh] rounded-full text-[3vh] text-pink-400 font-bold">
                honk shoo...honk shoo...
            </button>
        </div>
    );
};

export default Start;