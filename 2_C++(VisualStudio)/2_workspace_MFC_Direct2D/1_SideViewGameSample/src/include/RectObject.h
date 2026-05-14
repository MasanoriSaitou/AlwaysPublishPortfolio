#pragma once
#include "Renderer.h"

class RectObject
{
public:
    float x1, y1, x2, y2;
    D2D1::ColorF color;

    RectObject(float _x1, float _y1, float _x2, float _y2, D2D1::ColorF _color);
    void Draw(Renderer& renderer) const;
};