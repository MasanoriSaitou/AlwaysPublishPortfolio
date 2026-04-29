package com.example.RockPaperScissors;

import java.util.Random;

public class GameLogic {

    private int playerHP;
    private int cpuHP;

    private final GameUI ui;
    private final Random rand;

    public GameLogic(GameUI ui) {
    	
        this.ui = ui;
        rand = new Random();
        reset();
    }

    //////
    //ゲームスタート
    //////
    public void play(String playerHand) {

        String[] hands = {"グー", "チョキ", "パー"};
        String cpuHand = hands[rand.nextInt(3)];

        String handBoth = "[ あなた: " + playerHand + "　CPU: " + cpuHand + " ]  ";

        int result = judge(playerHand, cpuHand);

        if (result == 1) {
        	
            cpuHP--;
            ui.updateCpuHP(cpuHP);
            ui.showMessage(handBoth + "あなたの勝ち！ CPUのHPが減った");
        } else if (result == -1) {
        	
            playerHP--;
            ui.updatePlayerHP(playerHP);
            ui.showMessage(handBoth + "あなたの負け… HPが減った");
            ui.playerDamageEffect();
        } else {
        	
            ui.showMessage(handBoth + "あいこ！");
        }
        //ゲーム継続かの判定
        checkGameEnd(handBoth);
    }

    private int judge(String p, String c) {
    	
        if (p.equals(c)) {
        	
        	return 0;
        }
        if ((p.equals("グー") && c.equals("チョキ")) ||
            (p.equals("チョキ") && c.equals("パー")) ||
            (p.equals("パー") && c.equals("グー"))) {
        	
            return 1;
        }
        return -1;
    }

    private void checkGameEnd(String handBoth) {
    	
        if (playerHP <= 0) {
        	
            ui.showMessage(handBoth + "あなたの負け…");
            ui.showRetryButton();
        }
        if (cpuHP <= 0) {
        	
            ui.showMessage(handBoth + "あなたの勝ち！");
            ui.showRetryButton();
        }
    }
    
    public void reset() {
    	
        playerHP = 3;
        cpuHP = 3;
    }
}