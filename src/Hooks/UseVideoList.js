import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function UseVideoList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videoRef = ref(db, "videos");
      const videoQuery = query(
        videoRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(12)
      );

      try {
        setError(false);
        setLoading(true);

        // Await only inside async function
        const snapshot = await get(videoQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setVideos(Object.values(snapshot.val()));
        } else {
          setVideos([]); // no videos found
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchVideos();
  }, [page]);

  // Always return something from hook
  return {
    loading,
    error,
    videos,
  };
}
