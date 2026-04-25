import { useState } from "react";
import "./App.css";

function App() {
	return (
		<div className="w-[95vw] h-screen py-[2vh] mx-auto">
			<img
				src="/imgs/paper.jpg"
				className="fixed top-0 left-0 w-full h-screen object-cover z-0"
				alt=""
			/>
			<div className="z-10 relative">
				<h1 className="text-[10vh] vintageone tracking-[-0.15vw] text-black">
					I have a dream...
				</h1>
			</div>
		</div>
	);
}

export default App;
