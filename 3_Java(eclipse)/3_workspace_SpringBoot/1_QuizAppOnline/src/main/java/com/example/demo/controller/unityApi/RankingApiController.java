package com.example.demo.controller.unityApi;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RankingApiController {

    @GetMapping("/ranking")
    public List<Ranking> getRanking() {
        List<Ranking> list = new ArrayList<>();

        // 仮データ（まずは動作確認用）
        list.add(new Ranking("taro", 120));
        list.add(new Ranking("hanako", 95));

        return list;
    }
}

class Ranking {
	
    private String username;
    private int score;

    public Ranking(String username, int score) {
        this.username = username;
        this.score = score;
    }

    public String getUsername() { return username; }
    public int getScore() { return score; }
}