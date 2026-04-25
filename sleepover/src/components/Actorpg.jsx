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
						I have a dream...
					</h1>
					<h1 className="text-[6vh] vintageone tracking-[-0.15vw] text-black">
						(Actor)
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Actorpg;
