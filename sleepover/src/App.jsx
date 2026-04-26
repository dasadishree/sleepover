import "./App.css";
import Actorpg from "./components/Actorpg";
import Start from "./components/Start";
import Selection from "./components/Selection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guesserpg from "./components/Guesserpg";
import Yay from "./components/Yay";
import Nay from "./components/Nay";

function App() {
	return (
		<BrowserRouter>
		  <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/actor" element={<Actorpg/>}/>
        <Route path="/selection" element={<Selection/>}/>
		<Route path="/guesser" element={<Guesserpg />} />
		<Route path="/yay" element={<Yay/>}/>
		<Route path="/nay" element={<Nay/>}/>
		</Routes>
		</BrowserRouter>
	);
}

export default App;
