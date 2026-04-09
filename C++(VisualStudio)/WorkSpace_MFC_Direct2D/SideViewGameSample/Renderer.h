#pragma once
//Direct2D—LŒø‰»
#include <d2d1.h>

class Renderer
{
public:
    Renderer();
    ~Renderer();

    void Init(HWND hWnd);
    bool Begin();
    void End();
    void Clear(float r, float g, float b);
    void DrawRect(float x1, float y1, float x2, float y2, D2D1::ColorF color);
    void DrawCircle(float cx, float cy, float radius, D2D1::ColorF color);
    void DrawLine(float x1, float y1, float x2, float y2, float strokeWidth, D2D1::ColorF color);
    void DrawRectOutline(float x1, float y1, float x2, float y2, float strokeWidth, D2D1::ColorF color);

private:

    //Direct2D—p
    ID2D1Factory* m_pFactory = nullptr;
    ID2D1HwndRenderTarget* m_pRenderTarget = nullptr;
};