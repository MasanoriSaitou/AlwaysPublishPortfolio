package com.example.demo.model;

public class Question {
	
    private int id;
    private String text;
    private String[] choices;
    private int answer;

    public Question(int id, String text, String[] choices, int answer) {
        this.id = id;
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    public int getId() { return id; }
    public String getText() { return text; }
    public String[] getChoices() { return choices; }
    public int getAnswer() { return answer; }
}