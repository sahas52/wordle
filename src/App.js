import { useEffect, useState } from "react";
import "./App.css";
import { Formik } from "formik";

const DisplayGuess = ({ word, guess }) => {
  const [splitedWord, setSplitedWord] = useState([]);
  const [splitedGuess, setSplitedGuess] = useState([]);

  useEffect(() => {
    setSplitedGuess(guess.split(""));
    setSplitedWord(word.split(""));
  }, [guess, word]);

  const checkStatus = (guessLetter, index) => {
    if (guessLetter === splitedWord[index]) {
      return "right";
    } else if (word.includes(guessLetter)) {
      return "misplaced";
    } else {
      return "wrong";
    }
  };

  return (
    <div className="display">
      <div
        style={{
          display: "flex",
          backgroundColor: "lavender",
        }}
      >
        {splitedGuess.map((guessLetter, index) => (
          <div
            className={`letter ${checkStatus(guessLetter, index)}`}
            key={index}
          >
            {guessLetter}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const words = [
    "apple",
    "about",
    "enter",
    "enjoy",
    "judge",
    "known",
    "cable",
    "faces",
    "races",
  ];

  const [guesses, setGuesses] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [chance, setChance] = useState(6);
  const [targetWord, setTargetWord] = useState("");

  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  useEffect(() => {
    setTargetWord(generateRandomWord());
  }, []);

  useEffect(() => {
    if (guesses.includes(targetWord.toUpperCase())) {
      alert(JSON.stringify("You win!", null, 2));
    }
  }, [guesses, chance, targetWord]);

  const onSubmit = (values) => {
    setChance(chance - 1);
    let temp = guesses;
    temp[6 - chance] = values.word.toUpperCase();
    setGuesses(temp);
  };

  return (
    <div className="container">
      <h1>Wordle</h1>

      <h4>Chances: {chance}</h4>
      {!chance && (
        <h5 className="lostText">
          Right answer is "{targetWord.toUpperCase()}".{<br />}You lost the
          game. Try next time.
        </h5>
      )}

      {guesses?.map((guess, index) => (
        <DisplayGuess
          word={targetWord.toUpperCase()}
          guess={guess.toUpperCase()}
          key={index}
        />
      ))}

      <div className="form">
        <Formik
          initialValues={{ word: "" }}
          onSubmit={async (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          {(props) => {
            const {
              values,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                  <input
                    id="word"
                    placeholder="Enter your guess word"
                    type="text"
                    value={values.word}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    maxLength={5}
                    className="input"
                  />
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    className="outline resetButton"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={chance === 0 || isSubmitting}
                    className="submitButton"
                    style={{
                      backgroundColor: chance === 0 ? "gray" : "purple",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default App;

const target = "apple";
const words = ["words", "enter", "cable", "enjoy", "judge", "known"];
const chance = 6;

const takeInput = (guess) => {
  if (guess.toUpperCase() === target.toUpperCase()) {
    console.log("You won the game");
  } else {
    chance = chance - 6;
  }

  if (chance === 0) {
    console.log("You lost the game.");
  }
};
