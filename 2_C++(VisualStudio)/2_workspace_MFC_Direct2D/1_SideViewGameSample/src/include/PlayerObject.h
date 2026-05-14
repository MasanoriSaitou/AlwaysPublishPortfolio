#include "RectObject.h"
#include "CircleObject.h"
#include "LineObject.h"

#pragma once
class PlayerObject
{
    float drawX, drawY;
public:
    float x, y, width, hight;
    D2D1::ColorF color;

    PlayerObject(float _x, float _y, float _width, float _hight, D2D1::ColorF _color);
    void Draw(Renderer& renderer,float);
};