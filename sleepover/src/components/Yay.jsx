import { useNavigate } from "react-router-dom";

const Yay = () => {
	const navigate = useNavigate();

	return (
		<div className="w-[95vw] h-screen py-[2vh] mx-auto flex flex-col items-center justify-center gap-6">
			<img
				src="/imgs/gradient.png"
				className="fixed top-0 left-0 w-full h-screen object-cover z-0"
				alt=""
			/>
			<h1 className="z-10 text-[6vh] vintageone text-pink-700 text-center">
				YAY! YOU GUESSED RIGHT!!! <br></br>PANCAKE IS HAPPY :D
			</h1>
			<img src="/imgs/happypancake.png" className="z-10 h-[30vh]" alt="" />
			<button
				type="button"
				onClick={() => navigate("/")}
				className="z-10 px-8 py-3 rounded-full text-white font-bold text-lg"
				style={{ background: "pink" }}
			>
				restart
			</button>
		</div>
	);
};

export default Yay;