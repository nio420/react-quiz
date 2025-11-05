import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classes from "../Styled-component/MiniPlayer.module.css";

export default function MiniPlayer({ title, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  // Open player
  function openPlayer(e) {
    e.stopPropagation();
    setIsOpen(true);
  }

  // Close player
  function closePlayer(e) {
    e.stopPropagation();
    setIsOpen(false);
  }

  return (
    <div
      ref={buttonRef}
      className={`${classes.miniPlayer} ${isOpen ? "" : classes.floatingBtn}`}
    >
      {/* Open Button */}
      {!isOpen && (
        <span
          className={`material-icons-outlined ${classes.open}`}
          onClick={openPlayer}
        >
          play_circle_filled
        </span>
      )}

      {/* Close Button */}
      {isOpen && (
        <span
          className={`material-icons-outlined ${classes.close}`}
          onClick={closePlayer}
        >
          close
        </span>
      )}

      {/* React Player */}
      {isOpen && (
        <ReactPlayer
          className={classes.player}
          url={videoUrl}
          width="300px"
          height="168px"
          playing={true}
          controls
        />
      )}

      <p>{title}</p>
    </div>
  );
}
