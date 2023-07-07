import { useEffect, useState } from "react";
import { fetchQuizzes } from "../../service/api";
import QuizItem from "./QuizItem";



const Quiz = () => {
  const [quizArray, setQuizArray] = useState([]);

  useEffect(() => {
    getTableContent();

    async function getTableContent() {
      const response = await fetchQuizzes();
      setQuizArray(response?.data || []);
    }
  }, []);

  // return <>{JSON.stringify(quizArray)}</>;

  return (
    <div>
    <div className="container">
      <div className="row">
        {quizArray?.map((quiz, index) => (
          <div key={index} className="col col-sm-12 col-md-4 col-lg-3">
            <QuizItem quiz={quiz} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default Quiz;
