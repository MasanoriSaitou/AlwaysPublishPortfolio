package com.example.RockPaperScissors;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.input.KeyCode;
import javafx.stage.Stage;

public class GameMain extends Application  {
	
	@Override
    public void start(Stage stage) {
    	
        //Label label = new Label("JavaFX 起動成功！");
        //StackPane root = new StackPane(label);

        Scene scene = new Scene(new GameUI().getRoot(), 1008, 567);
        
        // --- エスケープキーで閉じる処理 ---
        scene.setOnKeyPressed(event -> {
        	
            if (event.getCode() == KeyCode.ESCAPE) {
                // アプリケーションを終了する
            	stage.close();
                // もしくはアプリケーション全体を安全に終了する
                // Platform.exit();
            }
        });
        // ----------------------------------
        
        stage.setScene(scene);
        stage.setTitle("RockPaperScissorsGame");
        stage.show();
    }
}