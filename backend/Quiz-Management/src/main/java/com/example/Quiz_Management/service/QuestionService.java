package com.example.Quiz_Management.service;
import com.example.Quiz_Management.model.Question;
import com.example.Quiz_Management.Repository.QuestionRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class QuestionService {
    private final QuestionRepo questionRepo;
    public QuestionService(QuestionRepo questionRepo){
        this.questionRepo = questionRepo;
    }
    //add ques
    public Question addQuestion(Question question){
        return questionRepo.save(question);
    }
    //getQues
    public List<Question>getAllQuestions(){
        return questionRepo.findAll();
    }
    //get quesby id
    public Optional<Question>getQuestionById(String id) {
        return questionRepo.findById(id);
    }
    //update
    public Question updateQuestion(String id, Question question){
        Question existingQuestion = questionRepo.findById(id).orElseThrow(()-> new RuntimeException("Question not found"));
        existingQuestion.setQuestion(question.getQuestion());
        existingQuestion.setOptionA(question.getOptionA());
        existingQuestion.setOptionB(question.getOptionB());
        existingQuestion.setOptionC(question.getOptionC());
        existingQuestion.setOptionD(question.getOptionD());
        existingQuestion.setCorrectAnswer(question.getCorrectAnswer());

        return questionRepo.save(existingQuestion);
    }
     //Delete question
    public void deleteQuestion(String id) {
        questionRepo.deleteById(id);
    }
}
