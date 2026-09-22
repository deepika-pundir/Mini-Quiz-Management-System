package com.example.Quiz_Management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuizManagementApplication {

	public static void main(String[] args) {
		//SpringApplication.run(QuizManagementApplication.class, args);
		System.out.println("=== DEBUG: SPRING_DATA_MONGODB_URI env value is: [" + System.getenv("SPRING_DATA_MONGODB_URI") + "] ===");
		SpringApplication.run(QuizManagementApplication.class, args);
	}

}
