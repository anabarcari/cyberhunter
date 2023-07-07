import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../../video.mp4";
import "../../styles.css";
const QuizItem = ({ quiz }) => {
  const navigate = useNavigate();
  const { _id: id, name = "", questions = [] } = { ...quiz };

  const handleStartQuiz = () => {
    console.log("id", id);
    navigate("/take-quiz/" + id);
  };

  return (
    <div>
   
    <div className="video-container">
          <video autoPlay loop muted id="video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        
        </div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">Total question are {questions?.length}</p>
          <button className="btn btn-secondary" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      </div>

      <br></br>
    </div>
  );
};

QuizItem.propTypes = {
  quiz: PropTypes.object.isRequired,
};

export default QuizItem;
