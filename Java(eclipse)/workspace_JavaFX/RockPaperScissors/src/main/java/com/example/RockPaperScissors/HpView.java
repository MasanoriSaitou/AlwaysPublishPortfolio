package com.example.RockPaperScissors;

import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;

public class HpView {

    private final StackPane root;
    private final Label label;
    private final String OBJ_STR;
    private int hp;

    // デフォルト（●）
    public HpView(int initialHp) {
    	
        this(initialHp, "●");
    }

    public HpView(int initialHp,String objStr) {
    	
        this.hp = initialHp;
        root = new StackPane();
        label = new Label();

        label.setStyle("-fx-font-size: 24px;");

        root.setPrefWidth(200);          // ← 固定幅でズレない
        root.setAlignment(Pos.TOP_CENTER);
        root.getChildren().add(label);   // ← ★これが必要！
        
        this.OBJ_STR = objStr;
        updateHp(initialHp);
    }

    public void updateHp(int newHp) {
    	
        hp = newHp;
        label.setText(OBJ_STR.repeat(hp));
    }

    public StackPane getNode() {
    	
        return root;
    }
}