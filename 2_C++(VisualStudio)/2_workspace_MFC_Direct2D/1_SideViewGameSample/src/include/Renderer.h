#pragma once
//Direct2D有効化
#include <d2d1.h>
#include <vector>
#include <string>
using namespace std;

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
    void DrawPolygon(const vector<D2D1_POINT_2F>& points, D2D1::ColorF color);
    void DrawPolygonOutline(const vector<D2D1_POINT_2F>& points, float strokeWidth, D2D1::ColorF color);
    void DrawTextString(const wstring& text, float x, float y, float size, D2D1::ColorF color);
    int GetScreenWidth() const;
    int GetScreenHeight() const;


private:

    //画面サイズ
    int m_screenWidth;
    int m_screenHeight;
    //Direct2D用
    ID2D1Factory* m_pFactory = nullptr;
    ID2D1HwndRenderTarget* m_pRenderTarget = nullptr;
    //文字列表示用
    IDWriteFactory* m_writeFactory = nullptr;
    //IDWriteTextFormat* m_textFormat = nullptr;
    ID2D1SolidColorBrush* m_textBrush = nullptr;
};