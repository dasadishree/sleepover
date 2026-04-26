import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { usePeer } from "./usePeer";
import { guessEmoji, checkGuess, emojiChoices } from "../gameLogic.js";
import { useNavigate } from "react-router-dom";

const Guesserpg = () => {
	const videoRef = useRef(null);
	const activeCallRef = useRef(null);
	const [actorPeerId, setActorPeerId] = useState(null);
	const [callStatus, setCallStatus] = useState("waiting");
	const { peer, ready } = usePeer();
	const navigate = useNavigate();

	async function handleGuess(emojiId) {
		await guessEmoji(emojiId);
		const isCorrect = await checkGuess();
		navigate(isCorrect ? "/yay" : "/nay");
	}

	// listen for actor readiness
	useEffect(() => {
		const unsub = onSnapshot(doc(db, "players", "actor"), (docSnap) => {
			const data = docSnap.data();
			if (data?.peerId && data?.ready) {
				setActorPeerId(data.peerId);
			} else {
				setActorPeerId(null);
				setCallStatus("waiting");
			}
		});
		return () => unsub();
	}, []);

	// call actor and receive video stream
	useEffect(() => {
		if (!ready || !actorPeerId) return;
		const p = peer.current;
		if (!p || p.destroyed) return;

		if (activeCallRef.current) {
			try {
				activeCallRef.current.close();
			} catch {
				/* ignore */
			}
			activeCallRef.current = null;
		}

    navigator.mediaDevices.getUserMedia({ video: true, audio:false})
      .then((stream)=>{
        const call = p.call(actorPeerId, stream);
        if(!call) return;
        activeCallRef.current = call;
      
          call.on("stream", (remoteStream) => {
            if (videoRef.current) videoRef.current.srcObject = remoteStream;
            setCallStatus("connected");
          });

          call.on("error", (err) => {
            console.error("call error:", err);
            setCallStatus("waiting");
          });

		call.on("close", () => setCallStatus("waiting"));
      })
		return () => {
			try {
				activeCallRef.current?.close();
			} catch {
				/* ignore */
			}
			activeCallRef.current = null;
		};
	}, [ready, actorPeerId, peer]);

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
						(Guesser)
					</h1>
				</div>

				<div className="mt-[12vh] flex flex-col items-center gap-4">
					<div className="relative rounded-2xl overflow-hidden border-4 border-black w-[40vw] aspect-video bg-black">
						<video
							ref={videoRef}
							autoPlay
							playsInline
							className="w-full h-full object-cover"
						/>

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
							}}
						>
							{callStatus === "connected"
								? "watching actor"
								: "waiting for actor..."}
						</div>
					</div>
				</div>

				<div className="flex flex-wrap w-[80vw] items-center justify-center mx-auto gap-[1vw] mt-4">
					{emojiChoices.map((emoji) => (
						<button
							type="button"
							key={emoji.id}
							onClick={() => handleGuess(emoji.id)}
							className="w-[6vw] h-[7vw] p-[1.5vh] bg-neutral-50 border-2 border-neutral-400 rounded-[1vh] flex items-center justify-center cursor-pointer hover:bg-neutral-100"
						>
							<img
								src={emoji.src}
								alt={emoji.id}
								className="w-full pointer-events-none"
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Guesserpg;