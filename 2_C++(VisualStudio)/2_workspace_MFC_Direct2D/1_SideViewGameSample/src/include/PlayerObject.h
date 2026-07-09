#pragma once
#include "RectObject.h"
#include "CircleObject.h"
#include "LineObject.h"
#include "PowerUpLevel.h"
#include "Camera.h"
#include "GameLibrary/GameLibrary.h"
using namespace Library;

class PlayerObject
{
    const GameLibrary::StickManInfo playerInfo{

        .headRadius = 20,
        .bodyLength = 80,
        .limbLength = 40,
        .lineWidth = 5.0f,
    };
    const GameLibrary::StickManInfo smallPlayerInfo{

        .headRadius = 12,
        .bodyLength = 30,
        .limbLength = 25,
        .lineWidth = 3.0f,
    };
    GameLibrary::StickManInfo currentPlayerInfo;
    float drawX, drawY;
public:
    float x, y, width, hight;
    PowerUpLevel currentLevel;
    D2D1::ColorF color;

    PlayerObject(float _x, float _y, D2D1::ColorF _color);
    void Draw(Renderer& renderer,const Camera&,int hp);
};