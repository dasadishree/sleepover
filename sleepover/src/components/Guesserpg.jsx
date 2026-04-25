import React, { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { usePeer } from "./usePeer";

const Guesserpg = () => {
  const videoRef = useRef(null);
  const [actorPeerId, setActorPeerId] = useState(null);
  const [callStatus, setCallStatus] = useState("waiting");

  const { peer, ready } = usePeer();

  // listen for actor readiness
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "players", "actor"), (docSnap) => {
      const data = docSnap.data();
      if (data?.peerId && data?.ready) {
        console.log("actor ready:", data.peerId);
        setActorPeerId(data.peerId);
      }
    });

    return () => unsub();
  }, []);
  
 useEffect(() => {
    const resetActor = async () => {
      await setDoc(doc(db, "players", "actor"), { ready: false, peerId: null });
    };
    resetActor();
  }, []);

  // call actor
useEffect(() => {
  if (!ready || !actorPeerId) return;

  const p = peer.current;
  if (!p || p.destroyed) return;

  // increase delay to 1500ms to make sure actor peer is listening
  const timer = setTimeout(() => {
    console.log("attempting call to:", actorPeerId);
    const call = p.call(actorPeerId, null);

    if (!call) {
      console.error("call returned undefined");
      return;
    }

    call.on("stream", (remoteStream) => {
      console.log("got stream!");
      if (videoRef.current) {
        videoRef.current.srcObject = remoteStream;
      }
      setCallStatus("connected");
    });

    call.on("error", (err) => {
      console.error("call error:", err);
    });
  }, 1500);

  return () => clearTimeout(timer);
}, [ready, actorPeerId]);

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

          <div className="mt-6 text-lg">
            emoji choices coming here...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guesserpg;