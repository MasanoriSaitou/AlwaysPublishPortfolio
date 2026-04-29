package com.example.RockPaperScissors;

import javafx.animation.FadeTransition;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.util.Duration;

public class GameUI {

    private final StackPane root;
    private final BorderPane layout;
    private final Pane damageOverlay;

    private HpView playerHpView;
    private HpView cpuHpView;
    private final Label messageLabel;
    private HBox jankenButtons;
    private Button retryButton;

    private final GameLogic logic;

    public GameUI() {
    	
    	root = new StackPane();
    	layout = new BorderPane();
    	damageOverlay = new Pane();
    	messageLabel = new Label();
    	logic = new GameLogic(this);
    	
    	// ---データ初期化 ---
    	initializeData();
    }
    
    public void initializeData() {
    	
        // --- 上部 HP ---
    	playerHpView = new HpView(3,"❤");
    	cpuHpView = new HpView(3,"●");

        // --- 中央 メッセージ + ボタン ---
        Button rockBtn = new Button("グー");
        Button scissorsBtn = new Button("チョキ");
        Button paperBtn = new Button("パー");
        
        rockBtn.setOnAction(e -> logic.play("グー")); //ゲーム開始
        scissorsBtn.setOnAction(e -> logic.play("チョキ")); //ゲーム開始
        paperBtn.setOnAction(e -> logic.play("パー")); //ゲーム開始

        jankenButtons = new HBox(20, rockBtn, scissorsBtn, paperBtn);
        jankenButtons.setAlignment(Pos.CENTER);

        // --- 再挑戦ボタン ---
        retryButton = new Button("もう一度挑戦");
        retryButton.setVisible(false); // 最初は非表示
        retryButton.setOnAction(e -> resetGame());
        
        //メッセージラベルの大きさを設定
        messageLabel.setStyle("-fx-font-size: 32px;");
        messageLabel.setPrefWidth(700);        // ← 折り返し位置を決める
        messageLabel.setMaxWidth(Double.MAX_VALUE);
        messageLabel.setWrapText(true);
        messageLabel.setAlignment(Pos.CENTER_LEFT);  // ← 左寄せしたいなら

        // --- ボタン置き場（重ねる） ---
        StackPane buttonArea = new StackPane(jankenButtons, retryButton);
        buttonArea.setAlignment(Pos.CENTER);
        
        VBox centerBox = new VBox(30, messageLabel,buttonArea);
        centerBox.setAlignment(Pos.CENTER);
        centerBox.setFillWidth(true);
        
        // --- 全体配置 ---
        layout.setLeft(playerHpView.getNode());
        layout.setRight(cpuHpView.getNode());
        layout.setCenter(centerBox);
        
        // 赤いダメージレイヤー
        damageOverlay.setStyle("-fx-background-color: rgba(255,0,0,1.0);");
        damageOverlay.setVisible(false);

        // root に重ねる
        root.getChildren().addAll(layout, damageOverlay);
        
        //Gameリセット
        resetGame();
    }
    
    // --- UI 更新メソッド（ロジックから呼ばれる） ---
    public void updateCpuHP(int cpuHP) {
    	
    	cpuHpView.updateHp(cpuHP);
    }
    
    public void updatePlayerHP(int playerHP) {
    		
    	playerHpView.updateHp(playerHP);
    }

    public StackPane getRoot() {
    	
        return root;
    }

    public void showMessage(String msg) {
    	
        messageLabel.setText(msg);
    }
    
    public void playerDamageEffect() {

        damageOverlay.setVisible(true);

        FadeTransition ft = new FadeTransition(Duration.millis(120), damageOverlay);
        ft.setFromValue(1.0);
        ft.setToValue(0.0);
        ft.setCycleCount(2);
        ft.setAutoReverse(true);

        ft.setOnFinished(e -> damageOverlay.setVisible(false));
        ft.play();
    }
    
    public void showRetryButton() {
    	
        jankenButtons.setVisible(false);
        retryButton.setVisible(true);
    }
    
    private void resetGame() {
    	
        logic.reset(); // ← GameLogic にリセット処理を作る
        playerHpView.updateHp(3);
        cpuHpView.updateHp(3);

        messageLabel.setText("じゃんけんしよう、じゃんけーん...");

        retryButton.setVisible(false);
        jankenButtons.setVisible(true);
    }
}