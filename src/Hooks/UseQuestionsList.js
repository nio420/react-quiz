import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function UseQuestionsList(videoId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const quizRef = ref(db, `quiz/${videoId}/questions/`); // ✅ fixed path
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        setLoading(true);

        const snapshot = await get(quizQuery);

        setLoading(false);

        if (snapshot.exists()) {
          setQuestions(Object.values(snapshot.val())); // ✅ set questions
        } else {
          setQuestions([]); // no questions found
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true); // ✅ boolean
      }
    }

    fetchQuestions();
  }, [videoId]);

  return {
    loading,
    error,
    questions,
  };
}
