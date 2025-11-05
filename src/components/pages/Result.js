import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import UseAnswersList from "../../Hooks/UseAnswersList";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const qna = state.qna || []; // user answers from quiz page

  const { loading, error, answers } = UseAnswersList(id);

  // Calculate score
  function calculateScore() {
    if (!answers || !qna) return 0;
    let score = 0;

    answers.forEach((question, qIndex) => {
      const correctIndexes = [];
      const checkedIndexes = [];

      question.options.forEach((option, oIndex) => {
        if (option.correct) correctIndexes.push(oIndex);
        if (qna[qIndex]?.options[oIndex]?.checked) {
          checkedIndexes.push(oIndex);
          option.checked = true; // mark for Analysis highlighting
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) score += 5;
    });

    return score;
  }

  const userScore = calculateScore();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was a mistake. Try again!</div>}
      {!loading &&
        !error &&
        answers &&
        answers.length > 0 &&
        qna.length > 0 && (
          <>
            <Summary score={userScore} noq={answers.length} />
            <Analysis answers={answers} />
          </>
        )}
    </>
  );
}
