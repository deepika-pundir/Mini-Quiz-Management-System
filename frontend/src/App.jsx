import { useEffect, useState } from "react";

const API = "http://localhost:8080/api";

function App() {
  const [page, setPage] = useState("admin");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  const loadQuestions = async () => {
    try {
      const res = await fetch(`${API}/questions`);
      const data = await res.json();
      setQuestions(data);
    } catch {
      alert("Backend is not running!");
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addQuestion = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((value) => !value.trim())) {
      alert("All fields are required");
      return;
    }

    const correct = form.correctAnswer.toUpperCase();

    if (!["A", "B", "C", "D"].includes(correct)) {
      alert("Correct answer must be A, B, C or D");
      return;
    }

    try {
      const res = await fetch(`${API}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          correctAnswer: correct,
        }),
      });

      if (res.ok) {
        alert("Question added successfully!");
        setForm({
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
        });
        loadQuestions();
      } else {
        alert("Failed to add question");
      }
    } catch {
      alert("Backend is not running!");
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      const res = await fetch(`${API}/questions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Question deleted");
        loadQuestions();
      } else {
        alert("Delete failed");
      }
    } catch {
      alert("Backend is not running!");
    }
  };

  const submitQuiz = async () => {
    if (questions.length === 0) {
      alert("No questions available");
      return;
    }

    if (Object.keys(answers).length === 0) {
      alert("Please attempt at least one question");
      return;
    }

    try {
      const response = await fetch(`${API}/quiz/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: answers,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setPage("result");
      } else {
        alert("Quiz submission failed");
      }
    } catch {
      alert("Backend is not running!");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Mini Quiz Management System</h1>

      <div style={styles.nav}>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button
          onClick={() => {
            setPage("quiz");
            setAnswers({});
            setResult(null);
            loadQuestions();
          }}
        >
          Start Quiz
        </button>
      </div>

      {page === "admin" && (
        <div>
          <h2>Admin Panel</h2>

          <form onSubmit={addQuestion} style={styles.form}>
            <input
              name="question"
              placeholder="Question"
              value={form.question}
              onChange={handleChange}
            />

            <input
              name="optionA"
              placeholder="Option A"
              value={form.optionA}
              onChange={handleChange}
            />

            <input
              name="optionB"
              placeholder="Option B"
              value={form.optionB}
              onChange={handleChange}
            />

            <input
              name="optionC"
              placeholder="Option C"
              value={form.optionC}
              onChange={handleChange}
            />

            <input
              name="optionD"
              placeholder="Option D"
              value={form.optionD}
              onChange={handleChange}
            />

            <input
              name="correctAnswer"
              placeholder="Correct Answer: A/B/C/D"
              value={form.correctAnswer}
              onChange={handleChange}
            />

            <button type="submit">Add Question</button>
          </form>

          <h2>All Questions</h2>

          {questions.map((q, index) => {
            const id = q.id || q._id;

            return (
              <div key={id || index} style={styles.card}>
                <h3>
                  {index + 1}. {q.question}
                </h3>

                <p>A. {q.optionA}</p>
                <p>B. {q.optionB}</p>
                <p>C. {q.optionC}</p>
                <p>D. {q.optionD}</p>

                <button onClick={() => deleteQuestion(id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}

      {page === "quiz" && (
        <div>
          <h2>Attempt Quiz</h2>

          {questions.length === 0 && <p>No questions available.</p>}

          {questions.map((q, index) => {
            const id = q.id || q._id;

            return (
              <div key={id || index} style={styles.card}>
                <h3>
                  {index + 1}. {q.question}
                </h3>

                {["A", "B", "C", "D"].map((option) => (
                  <label key={option} style={styles.option}>
                    <input
                      type="radio"
                      name={`question-${id}`}
                      value={option}
                      checked={answers[id] === option}
                      onChange={() =>
                        setAnswers({
                          ...answers,
                          [id]: option,
                        })
                      }
                    />
                    {option}. {q[`option${option}`]}
                  </label>
                ))}
              </div>
            );
          })}

          {questions.length > 0 && (
            <button onClick={submitQuiz}>Submit Quiz</button>
          )}
        </div>
      )}

      {page === "result" && result && (
        <div style={styles.result}>
          <h2>Quiz Result</h2>
          <h3>Total Questions: {result.totalQuestions}</h3>
          <h3>Correct Answers: {result.correctAnswers}</h3>
          <h3>Wrong Answers: {result.wrongAnswers}</h3>
          <h2>Score: {result.score}</h2>

          <button onClick={() => setPage("quiz")}>
            Attempt Again
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  nav: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "30px",
  },

  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
  },

  option: {
    display: "block",
    margin: "10px 0",
  },

  result: {
    border: "1px solid #ccc",
    padding: "25px",
    borderRadius: "10px",
  },
};

export default App;
