#include "Renderer.h"
#pragma once

class LineObject {
public:
    float x1, y1, x2, y2;
    float strokeWidth;
    D2D1::ColorF color;

    LineObject(float _x1, float _y1, float _x2, float _y2, float _stroke, D2D1::ColorF _color);

    void Draw(Renderer& renderer);
};