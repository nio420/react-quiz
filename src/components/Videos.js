import { Link } from "react-router-dom";
import UseVideoList from "../Hooks/UseVideoList";
import classes from "../Styled-component/Videos.module.css";
import Video from "./Video";

export default function Videos() {
  const { loading, error, videos } = UseVideoList(0);

  return (
    <div className={classes.videos}>
      {videos.length > 0 &&
        videos.map((video) => (
          <Link to={{
            pathname: `/quiz/${video.youtubeID}`,
            state: {
              videoTitle: video.title
            }
          }} key={video.youtubeID}>
            <Video title={video.title} id={video.youtubeID} noq={video.noq} key={video.youtubeID} />
          </Link>
        ))}

      {!loading && videos.length === 0 && <div>No data found!</div>}
      {loading && <div>Loading...</div>}
      {error && <div>There was a mistake. Try again!</div>}
    </div>
  );
}
