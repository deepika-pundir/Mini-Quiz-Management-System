package com.example.Quiz_Management.Repository;
import com.example.Quiz_Management.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface QuestionRepo extends MongoRepository<Question, String> {
}
