#include "pch.h"
#include "LineObject.h"

LineObject::LineObject(float _x1, float _y1, float _x2, float _y2, float _stroke, D2D1::ColorF _color)
    : x1(_x1), y1(_y1), x2(_x2), y2(_y2), strokeWidth(_stroke), color(_color)
{
}

void LineObject::Draw(Renderer& renderer) {

    renderer.DrawLine(x1, y1, x2, y2, strokeWidth, color);
}