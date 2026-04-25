import { useState } from "react";
import "./App.css";
import Actorpg from "./components/actorpg";
import Start from "./components/Start";
import Selection from "./components/Selection";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
		  <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/actor" element={<Actorpg/>}/>
        <Route path="/selection" element={<Selection/>}/>
      </Routes>
		</BrowserRouter>
	);
}

export default App;