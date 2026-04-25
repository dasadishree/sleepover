import React from "react";

const Actorpg = () => {
	return (
		<div className="w-[95vw] h-screen py-[2vh] mx-auto">
			<img
				src="/imgs/paper.jpg"
				className="fixed top-0 left-0 w-full h-screen object-cover z-0"
				alt=""
			/>
			<div className="z-10 relative h-screen">
				<div className="flex items-center justify-between w-full">
					<h1 className="text-[10vh] vintageone tracking-[-0.15vw] text-black">
						d<i>REEM</i>oji...
					</h1>
					<h1 className="text-[6vh] vintageone tracking-[-0.15vw] text-black">
						(Actor)
					</h1>
				</div>
				<div className="flex flex-col items-center justify-center w-fit absolute bottom-[0vh] bg-blue-500/0 right-[-2.5vw] gap-[0vw] h-fit">
					<img
						src="/emojis/yay.gif"
						className="top-[25vh] left-[6.5vw] absolute w-[6vw]"
						alt="emoji"
					/>
					<img
						src="/imgs/dream.png"
						className="w-[20vw] mr-auto translate-y-[18vh]"
						alt=""
					/>
					<img
						src="/imgs/reem-new.png"
						className="w-[25vw] ml-[13vw] rounded-[1vh] -scale-x-100"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Actorpg;
