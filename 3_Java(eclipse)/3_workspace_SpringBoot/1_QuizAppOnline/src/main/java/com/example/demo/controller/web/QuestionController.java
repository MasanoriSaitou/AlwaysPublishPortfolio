package com.example.demo.controller.web;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Question;

@RestController
public class QuestionController {

    @GetMapping("/api/questions")
    public List<Question> getQuestions() {

        Question q1 = new Question(
            1,
            "Spring Bootとは何ですか？",
            new String[]{"Javaのフレームワーク", "ゲームエンジン", "OS", "データベース"},
            0
        );

        Question q2 = new Question(
            2,
            "Unityとは何ですか？",
            new String[]{"ゲームエンジン", "ブラウザ", "SNS", "OS"},
            0
        );

        return Arrays.asList(q1, q2);
    }
}