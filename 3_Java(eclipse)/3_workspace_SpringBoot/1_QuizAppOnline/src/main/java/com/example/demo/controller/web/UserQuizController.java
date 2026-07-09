package com.example.demo.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserQuizController {

    @GetMapping("/user/quiz-editor")
    public String quizEditor() {
        return "quiz-editor";
    }

    @GetMapping("/user/player-scores")
    public String playerScores() {
        return "player-scores";
    }

    @GetMapping("/ranking")
    public String ranking() {
        return "ranking";
    }
}