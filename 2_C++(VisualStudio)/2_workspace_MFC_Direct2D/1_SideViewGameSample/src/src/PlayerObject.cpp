#include "pch.h"
#include "include/PlayerObject.h"
#include "GameLibrary/GameLibrary.h"

PlayerObject::PlayerObject(float _x, float _y, D2D1::ColorF _color)
    : x(_x)
    , y(_y)
    , color(_color)
    , drawX(x)
    , drawY(y)
    , currentLevel(PowerUpLevel::Normal)
    , currentPlayerInfo(playerInfo){

    width = GameLibrary::GetStickManWidth(currentPlayerInfo);
    hight = GameLibrary::GetStickManHeight(currentPlayerInfo);
}

//void PlayerObject::Draw(Renderer& renderer,float cameraX){
//
//    drawX = x - cameraX;
//
//    if (currentLevel == PowerUpLevel::Normal) {
//        // 頭（半径20）
//        renderer.DrawCircle(drawX, y, 20, color);
//
//        // 胴体（頭の下から80px）
//        renderer.DrawLine(drawX, y + 20, drawX, y + 80, 5.0f, color);
//
//        // 左手（胴体の中間から左上へ）
//        renderer.DrawLine(drawX, y + 40, drawX - 40, y + 20, 5.0f, color);
//
//        // 右手（胴体の中間から右上へ）
//        renderer.DrawLine(drawX, y + 40, drawX + 40, y + 20, 5.0f, color);
//
//        // 左足（胴体の下から左下へ）
//        renderer.DrawLine(drawX, y + 80, drawX - 30, y + 120, 5.0f, color);
//
//        // 右足（胴体の下から右下へ）
//        renderer.DrawLine(drawX, y + 80, drawX + 30, y + 120, 5.0f, color);
//    }
//    else (currentLevel == PowerUpLevel::Normal) {
//
//
//    }
//}

void PlayerObject::Draw(Renderer& renderer, float cameraX) {

    //PlayerInfo設定
    currentPlayerInfo = playerInfo;
    if (currentLevel == PowerUpLevel::Small) {

        // Small のときだけつぶす
        currentPlayerInfo = smallPlayerInfo;
    }    
    //カラー設定
    currentPlayerInfo.colorHead = color;
    currentPlayerInfo.colorTorso = color;
    currentPlayerInfo.colorLeftHand = color;
    currentPlayerInfo.colorRightHand = color;
    currentPlayerInfo.colorLeftLeg = color;
    currentPlayerInfo.colorRightLeg = color;
    switch (currentLevel) {

        case PowerUpLevel::Power1:
            currentPlayerInfo.colorHead = ColorF::GreenYellow;
            break;

        case PowerUpLevel::Power2:
            currentPlayerInfo.colorHead = ColorF::Red;
            break;

        case PowerUpLevel::Power3:
            currentPlayerInfo.colorHead = ColorF::Gold;
            break;

        default:
            break;
    }
    width = GameLibrary::GetStickManWidth(currentPlayerInfo);
    hight = GameLibrary::GetStickManHeight(currentPlayerInfo);
    drawX = x - cameraX; //カメラのX座標をスクロールに使用
    GameLibrary::DrawStickMan(currentPlayerInfo, renderer, drawX, y);
}