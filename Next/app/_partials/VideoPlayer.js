import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ videoSrc = null, className, onTimeUpdate, onLoadedMetadata }) => {
  const videoNode = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoNode.current && !playerRef.current) {
      playerRef.current = videojs(videoNode.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        fluid: true,
      });

  
      playerRef.current.on("timeupdate", () => {
        if (onTimeUpdate) {
          onTimeUpdate(playerRef.current.currentTime());
        }
      });


      playerRef.current.on("loadedmetadata", () => {
        if (onLoadedMetadata) {
          onLoadedMetadata(playerRef.current.duration());
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [onLoadedMetadata,onTimeUpdate]);

  useEffect(() => {
    if (playerRef.current && videoSrc) {
      playerRef.current.src({ src: videoSrc, type: "video/mp4" });
      playerRef.current.load();
    }
  }, [videoSrc]);

  return (
    <div className={className} data-vjs-player>
      <video ref={videoNode} className="video-js vjs-default-skin" />
    </div>
  );
};

export default VideoPlayer;
