import React from "react";

const Actorpg = () => {
	return (
		<div className="w-[95vw] h-screen py-[2vh] mx-auto">
			<img
				src="/imgs/paper.jpg"
				className="fixed top-0 left-0 w-full h-screen object-cover z-0"
				alt=""
			/>
			<div className="z-10 relative">
				<div className="flex items-center justify-between w-full">
					<h1 className="text-[10vh] vintageone tracking-[-0.15vw] text-black">
						d<i>REEM</i>oji...
					</h1>
					<h1 className="text-[6vh] vintageone tracking-[-0.15vw] text-black">
						(Actor)
					</h1>
				</div>
				<div className="flex items-center justify-center w-fit absolute top-[0vh] -translate-y-[10vh] right-[2vw] gap-[0vw]">
					<img
						src="/emojis/yay.gif"
						className="top-[20vh] left-[6.5vw] absolute w-[6vw]"
						alt="emoji"
					/>
					<img src="/imgs/dream.png" className="w-[20vw]" alt="" />
					<img
						src="/imgs/reem.png"
						className="mt-[45vh] w-[12vw] border-3 border-dotted rounded-[1vh]"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Actorpg;
