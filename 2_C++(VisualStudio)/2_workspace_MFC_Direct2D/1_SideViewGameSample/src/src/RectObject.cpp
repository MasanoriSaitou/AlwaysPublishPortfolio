#include "pch.h"
#include "include/RectObject.h"

RectObject::RectObject(float _x1, float _y1, float _x2, float _y2, D2D1::ColorF _color)
    : x1(_x1), y1(_y1), x2(_x2), y2(_y2), color(_color)
{
}

void RectObject::Draw(Renderer& renderer) const
{
    renderer.DrawRect(x1, y1, x1+x2, y1+y2, color);
}