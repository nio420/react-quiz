import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function UseAnswersList(videoId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, `answers/${videoId}/questions/`); // ✅ fixed path
      const answerQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoading(true);

        const snapshot = await get(answerQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setAnswers(Object.values(snapshot.val())); // ✅ set questions
        } else {
          setAnswers([]); // no questions found
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true); // ✅ boolean
      }
    }

    fetchAnswers();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
