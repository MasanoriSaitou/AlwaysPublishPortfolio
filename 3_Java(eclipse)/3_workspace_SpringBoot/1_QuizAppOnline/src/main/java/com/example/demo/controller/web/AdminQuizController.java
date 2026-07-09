package com.example.demo.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminQuizController {

    @GetMapping("/admin/quiz-editor")
    public String quizEditor() {
        return "quiz-editor";
    }

    @GetMapping("/admin/player-scores")
    public String playerScores() {
        return "player-scores";
    }
}