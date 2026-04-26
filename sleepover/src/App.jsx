import "./App.css";
import { useEffect, useRef } from "react";
import Actorpg from "./components/Actorpg";
import Start from "./components/Start";
import Selection from "./components/Selection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guesserpg from "./components/Guesserpg";
import Yay from "./components/Yay";
import Nay from "./components/Nay";
import introMusic from "./assets/intro.mp3";

function App() {
	// play audio
	const audioRef = useRef(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.loop = true;
		audio.volume = 0.4;

		const tryPlay = () => {
			audio.play().catch(() => {
			});
		};

		tryPlay();
		window.addEventListener("pointerdown", tryPlay, { once: true });

		return () => {
			window.removeEventListener("pointerdown", tryPlay);
		};
	}, []);

	return (
		<BrowserRouter>
			<audio ref={audioRef} src={introMusic} preload="auto" />
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/actor" element={<Actorpg />} />
				<Route path="/selection" element={<Selection />} />
				<Route path="/guesser" element={<Guesserpg />} />
				<Route path="/yay" element={<Yay />} />
				<Route path="/nay" element={<Nay />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
