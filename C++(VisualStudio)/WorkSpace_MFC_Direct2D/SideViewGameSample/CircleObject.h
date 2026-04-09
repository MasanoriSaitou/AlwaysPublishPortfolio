#pragma once
#include "Renderer.h"

class CircleObject {
public:
    float cx;
    float cy;
    float radius;
    D2D1::ColorF color;

    CircleObject(float _cx, float _cy, float _radius, D2D1::ColorF _color);

    void Draw(Renderer& renderer);
};