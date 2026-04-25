import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export const usePeer = () => {
  const peer = useRef(null);
  const [peerId, setPeerId] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = new Peer(undefined, {
      host: "0.peerjs.com",
      port: 443,
      secure: true,
      config: {
        iceServers: [
          {urls: "stun:stun1.l.google.com:19302"},
          {urls: "stun:stun1.1.l.google.com:19302"},
        ]
      }
    });

    peer.current = p;

    p.on("open", (id) => {
      console.log("peer open with id:", id);
      setPeerId(id);
      setReady(true);
    });

    p.on("error", (err) => {
      console.error("peer error:", err);
    });

    return () => {
      p.destroy();
    };
  }, []);

  return { peer, peerId, ready };
};