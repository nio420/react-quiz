import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import UseQuestionsList from "../../Hooks/UseQuestionsList";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

// initialstate function
const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams(); // ✅ get video ID
  const { loading, error, questions } = UseQuestionsList(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const {state} = location || {}
  const {videoTitle} = state || {}

  // Debug logs
  console.log("Quiz ID:", id);
  console.log("Questions from hook:", questions);
  console.log("QnA state:", qna);

  // Populate qna when questions load
  useEffect(() => {
    if (questions && questions.length > 0) {
      dispatch({
        type: "questions",
        value: questions,
      });
      setCurrentQuestion(0); // Reset to first question
    }
  }, [questions]);

  // Handle answer selection
  function handleAnswer(e, index) {
    dispatch({
      type: "answer",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // Go to next question
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }
  // Go to previous question
  function prevQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }
  // submit function
  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    // store quiz answers in Firebase
    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, { state: { qna } });
  }
  // Calculate progress
  const percentage =
    questions.length > 0
      ? Math.round(((currentQuestion + 1) / questions.length) * 100)
      : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was a mistake. Try again!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1> {qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnswer}
            input={true}
            questionId={currentQuestion}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
            submit={submit}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
