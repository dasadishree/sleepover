import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { usePeer } from "./usePeer";
import { getSrc, rerollEmoji, startRound } from "../gameLogic";

const Actorpg = () => {
	const webcamRef = useRef(null);
	const [localStream, setLocalStream] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const [camReady, setCamReady] = useState(false);
	const [callStatus, setCallStatus] = useState("waiting");
	const [selectedCharacterId, setSelectedCharacterId] = useState("reem");
	const [actorImageSrc, setActorImageSrc] = useState("/characters/reem.png");
	const [emojiId, setEmojiId] = useState(null);
	const [isRerolling, setIsRerolling] = useState(false);

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

	// listen for actor-selected character
	useEffect(() => {
		const unsub = onSnapshot(doc(db, "players", "actor"), (docSnap) => {
			const data = docSnap.data();
			if (data?.characterId) {
				setSelectedCharacterId(data.characterId);
			}
		});

		return () => unsub();
	}, []);

	// start with a random emoji immediately when actor page opens
	useEffect(() => {
		let mounted = true;
		(async () => {
			try {
				const firstEmojiId = await startRound();
				if (mounted) setEmojiId(firstEmojiId);
			} catch (error) {
				console.error("failed to start round:", error);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	// saves peer id to firebase
	const handleReady = async () => {
		if (!localStream || !peerId) return;
		setIsReady(true);
		await setDoc(
			doc(db, "players", "actor"),
			{
				ready: true,
				peerId: peerId,
			},
			{ merge: true }
		);
	};

	const handleUserMedia = (stream) => {
		setLocalStream(stream);
		setCamReady(true);
	};

	useEffect(() => {
		setActorImageSrc(`/imgs/${selectedCharacterId}.png`);
	}, [selectedCharacterId]);

	const handleActorImageError = () => {
		if (actorImageSrc !== `/characters/${selectedCharacterId}.png`) {
			setActorImageSrc(`/characters/${selectedCharacterId}.png`);
			return;
		}
		if (actorImageSrc !== "/imgs/reem.png") {
			setActorImageSrc("/imgs/reem.png");
		}
	};

	const handleReroll = async () => {
		if (!emojiId) return;
		setIsRerolling(true);
		try {
			const newEmojiId = await rerollEmoji(emojiId);
			setEmojiId(newEmojiId);
		} catch (error) {
			console.error("failed to reroll emoji:", error);
		} finally {
			setIsRerolling(false);
		}
	};

	return (
		<div className="w-[95vw] h-screen py-[2vh] mx-auto">
			<img
				src="/imgs/gradient.png"
				className="fixed top-0 left-0 w-full h-screen object-cover z-0"
				alt=""
			/>
			<div className="z-10 relative">
				<div className="flex items-center justify-between w-full">
					<img src="public/dreemoji.png" className="h-[10vh]" alt="dreemoji"/>
					<h1 className="text-[6vh] vintageone tracking-[-0.15vw] text-black">
						(Actor)
					</h1>
				</div>

				<div className="flex flex-col items-center justify-center w-fit fixed bottom-[0vh] bg-blue-500/0 right-[-2.5vw] gap-[0vw] h-fit">
					<img
						src={getSrc(emojiId) || "/emojis/yay.gif"}
						className="top-[25vh] left-[6.5vw] absolute w-[6vw]"
						alt="emoji"
					/>
					<img
						src="/imgs/dream.png"
						className="w-[20vw] mr-auto translate-y-[18vh]"
						alt=""
					/>
					<img
						src={actorImageSrc}
						onError={handleActorImageError}
						className="w-[25vw] ml-[13vw] rounded-[1vh] -scale-x-100"
						alt=""
					/>
				</div>

				<div className="mt-[12vh] flex flex-col items-center gap-4 w-[70vw] mr-auto bg-green-500/0">
					<div className="relative rounded-2xl overflow-hidden border-4 border-black w-[40vw] aspect-video">
						<Webcam
							ref={webcamRef}
							audio={false}
							mirrored={true}
							onUserMedia={handleUserMedia}
							onUserMediaError={() => setCamReady(false)}
							videoConstraints={{ width: 800, height: 600, facingMode: "user" }}
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

					<div className="h-[56px] flex items-center justify-center">
						{!isReady ? (
							<button
								disabled={!camReady || !ready}
								onClick={handleReady}
								className="px-8 py-3 rounded-full text-white font-bold text-lg text-white"
								style={{
									background: "pink",
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

					<div className="h-[56px] flex items-center justify-center">
						<button
							onClick={handleReroll}
							disabled={!emojiId || isRerolling || isReady}
							className="px-8 py-3 rounded-full text-white font-bold text-lg text-white"
							style={{
								background: "pink",
								opacity:
									emojiId && !isRerolling && !isReady ? 1 : 0.4,
								cursor:
									emojiId && !isRerolling && !isReady
										? "pointer"
										: "not-allowed",
								visibility: isReady ? "hidden" : "visible",
							}}
						>
							{isRerolling ? "rerolling..." : "reroll emoji"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Actorpg;
