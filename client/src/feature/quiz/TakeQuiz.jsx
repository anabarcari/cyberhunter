import { useEffect, useState } from "react";
import "../../styles.css";
import "./Quiz.css";
import backgroundVideo from "../../video.mp4";
import { fetchQuizById } from "../../service/api";
import { useParams } from "react-router-dom";
import { notification } from "../../util/notification";

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [quizArray, setQuizArray] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  console.log("questions", questions);

  useEffect(() => {
    getQuiz();

    async function getQuiz() {
      const response = await fetchQuizById(quizId);
      setQuizArray(response?.data || []);
      setQuestions(response?.data?.questions || []);
    }
  }, [quizId]);

  const handleOptionChange = (event) => {
    console.log("event.target.value", event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedOption) {
      notification.error("Please select an option");
      return;
    }
    const question = questions[currentQuestion];
    console.log("question", question);

    const option = question?.options?.find(
      (item) => item?._id === selectedOption
    );
    console.log("option", option);

    if (option?.iscorrect) {
      console.log("------------------------------");
      console.log("correct");
      console.log("------------------------------");
    }
    if (option.iscorrect) setScore((prev) => prev + 1);
    setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion === questions.length - 1) setShowResult(true);
    setSelectedOption(null);
  };

  return (
    <div>
      <div className="video-container">
        <video autoPlay loop muted id="video">
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
      <div className="takeQuiz-container">
        {/* HINT: this is our result */}
        {showResult && (
          <div className="result-container">
            <h2>Quiz Results</h2>
            <p>
              You scored {score} out of {quizArray?.questions.length}
            </p>
          </div>
        )}

        {/* HINT: these are our questions */}
        {!showResult && (
          <div className="question-container">
            <h2>Question {currentQuestion + 1}</h2>

            <p>{questions[currentQuestion]?.question}</p>

            <form onSubmit={handleSubmit}>
              {questions[currentQuestion]?.options?.map((option, index) => {
                return (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        value={option?._id}
                        checked={selectedOption === option?._id}
                        onChange={handleOptionChange}
                      />
                      {option?.option}
                    </label>
                  </div>
                );
              })}
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
