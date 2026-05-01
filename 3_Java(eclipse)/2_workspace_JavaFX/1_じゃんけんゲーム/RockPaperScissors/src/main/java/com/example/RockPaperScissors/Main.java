package com.example.RockPaperScissors;

import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {
	
    @Override
    public void start(Stage stage) {
    	
        new GameMain().start(stage); 
    }

    public static void main(String[] args) {
    	
    	System.out.println("Game Start");
    	launch(); //ゲーム開始！
    	System.out.println("Game End");
    }
}