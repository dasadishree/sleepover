import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { usePeer } from "./usePeer";

const Actorpg = () => {
	const webcamRef = useRef(null);
	const [localStream, setLocalStream] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [camReady, setCamReady] = useState(false);
	const [callStatus, setCallStatus] = useState("waiting");

	const { peer, peerId, ready } = usePeer();

	// guesser calls, answer with stream in peer.. double checking needed
	useEffect(() => {
		if (!ready || !localStream) return;
		const p = peer.current;
		p.on("call", (call) => {
			call.answer(localStream);
			setCallStatus("connected");
		});
	}, [ready, localStream]);

	// saves peer id to firebase
	const handleReady = async () => {
		if (!localStream || !peerId) return;
		setIsReady(true);
		await setDoc(doc(db, "players", "actor"), {
			ready: true,
			peerId: peerId,
		});
	};

	const handleUserMedia = (stream) => {
		setLocalStream(stream);
		setCamReady(true);
	};

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

				<div className="mt-[12vh] flex flex-col items-center gap-4">
					<div className="relative rounded-2xl overflow-hidden border-4 border-black w-[40vw] aspect-video">
						<Webcam
							ref={webcamRef}
							audio={false}
							mirrored={true}
							onUserMedia={handleUserMedia}
							onUserMediaError={() => setCamReady(false)}
							videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
							style={{ width: "100%", height: "100%", objectFit: "cover" }}
						/>
						{camReady && (
							<div
								style={{
									position: "absolute",
									top: 10,
									left: 10,
									background: "rgba(0,0,0,0.6)",
									borderRadius: 99,
									padding: "4px 12px",
									fontSize: 12,
									fontWeight: 700,
									color: "white",
									display: "flex",
									alignItems: "center",
									gap: 6,
								}}
							>
								<span
									style={{
										width: 8,
										height: 8,
										borderRadius: "50%",
										background:
											callStatus === "connected" ? "#3db87a" : "#e05c7a",
										display: "inline-block",
									}}
								/>
								{callStatus === "connected"
									? "the guesser can see you nowwww"
									: "CAM ON"}
							</div>
						)}
					</div>

					<p style={{ fontSize: 14, color: "#555" }}>
						{!ready
							? "the connection is being set up rn!!"
							: !isReady
							? "click to start!"
							: callStatus === "connected"
							? "guesser is watching"
							: "waiting……."}
					</p>

					{!isReady ? (
						<button
							disabled={!camReady || !ready}
							onClick={handleReady}
							className="px-8 py-3 rounded-full text-white font-bold text-lg"
							style={{
								background: "black",
								opacity: camReady && ready ? 1 : 0.4,
								cursor: camReady && ready ? "pointer" : "not-allowed",
							}}
						>
							ready to act
						</button>
					) : (
						<p style={{ color: "#3db87a", fontWeight: 700 }}>
							you are set as ready!
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Actorpg;
