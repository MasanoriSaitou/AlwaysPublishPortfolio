#include "pch.h"
#include "CircleObject.h"

CircleObject::CircleObject(float _cx, float _cy, float _radius, D2D1::ColorF _color)
    : cx(_cx), cy(_cy), radius(_radius), color(_color)
{
}

void CircleObject::Draw(Renderer& renderer) {

    renderer.DrawCircle(cx, cy, radius, color);
}