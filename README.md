# Mini Quiz Management System

A full-stack Quiz Management System built using **React, Java, Spring Boot, and MongoDB**.
<img width="1920" height="926" alt="Screenshot 2026-09-21 155032" src="https://github.com/user-attachments/assets/3ee514a7-d03e-438b-87ac-fbc1e904c0ac" />


### Admin

* Add quiz questions
* View all questions
* Update quiz questions
* Delete quiz questions
* Set the correct answer

### User

* View available quiz questions
* Select answers
* Submit the quiz
* Get the final result
* View total questions, correct answers, wrong answers, and score

## Tech Stack

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Vite

### Backend

* Java
* Spring Boot
* REST APIs
* Maven

### Database

* MongoDB

### API Testing

* Postman

## REST API Endpoints

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/questions`      | Add a question    |
| GET    | `/api/questions`      | Get all questions |
| PUT    | `/api/questions/{id}` | Update a question |
| DELETE | `/api/questions/{id}` | Delete a question |
| POST   | `/api/quiz/submit`    | Submit quiz       |
| GET    | `/api/results`        | Get quiz results  |

## Project Structure

```text
Mini-Quiz-Management-System/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
└── frontend/
    ├── src/
    ├── package.json
    ├── index.html
    └── ...
```

## How to Run

### Backend

1. Open the `backend` folder in IntelliJ IDEA.
2. Configure MongoDB connection in `application.properties`.
3. Run the Spring Boot application.

Backend will run on:

```text
http://localhost:8080
```

### Frontend

Open the `frontend` folder in VS Code and run:

```bash
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

## MongoDB Configuration

Add your MongoDB connection details in:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.data.mongodb.uri=YOUR_MONGODB_CONNECTION_STRING
spring.data.mongodb.database=quizdb
```

**Do not upload your real MongoDB username, password, API keys, or other secrets to GitHub.**

## API Testing
<img width="1920" height="1080" alt="Screenshot 2026-09-21 151109" src="https://github.com/user-attachments/assets/c2256019-035d-4ebd-8e34-b39d52dc8342" />

The REST APIs can be tested using **Postman**.

You can test:

* Add Question
* Get Questions
* Update Question
* Delete Question
* Submit Quiz
* Get Quiz Results

## Future Improvements

* Admin and User authentication
* JWT-based security
* Timer-based quiz
* Quiz categories
* Pagination
* Better UI/UX
* Online deployment

## Author

**Deepika Pundir**

B.Tech Computer Science Engineering

---

⭐ This project was developed as a Mini Quiz Management System using React, Spring Boot, Java, and MongoDB.
