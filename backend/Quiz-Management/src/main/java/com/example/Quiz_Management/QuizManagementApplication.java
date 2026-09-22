
package com.example.Quiz_Management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class QuizManagementApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(QuizManagementApplication.class, args);
		System.out.println("=== DEBUG2: Spring resolved spring.data.mongodb.uri as: [" + context.getEnvironment().getProperty("spring.data.mongodb.uri") + "] ===");
	}

}
