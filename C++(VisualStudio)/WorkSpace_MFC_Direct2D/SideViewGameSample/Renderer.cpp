#include "pch.h"
#include "Renderer.h"

#pragma comment(lib, "d2d1.lib")

Renderer::Renderer()
    : m_pFactory(nullptr)
    , m_pRenderTarget(nullptr)
{
}

Renderer::~Renderer()
{
    if (m_pRenderTarget) m_pRenderTarget->Release();
    if (m_pFactory) m_pFactory->Release();
}

void Renderer::Init(HWND hWnd)
{
    if (!m_pFactory)
    {
        HRESULT hr = D2D1CreateFactory(D2D1_FACTORY_TYPE_SINGLE_THREADED, &m_pFactory);
        if (FAILED(hr)) {
            OutputDebugString(L"D2D1CreateFactory failed\n");
            return;
        }
    }

    if (!m_pRenderTarget)
    {
        RECT rc;
        GetClientRect(hWnd, &rc);

        D2D1_SIZE_U size = D2D1::SizeU(rc.right - rc.left, rc.bottom - rc.top);

        HRESULT hr = m_pFactory->CreateHwndRenderTarget(
            D2D1::RenderTargetProperties(),
            D2D1::HwndRenderTargetProperties(hWnd, size),
            &m_pRenderTarget
        );
        OutputDebugString(L"Start!\n");
        if (FAILED(hr)) {
            OutputDebugString(L"CreateHwndRenderTarget failed\n");
        }
    }
}


bool Renderer::Begin()
{
    if (!m_pRenderTarget)
        return false;

    m_pRenderTarget->BeginDraw();
    return true;
}


void Renderer::End()
{
    if (!m_pRenderTarget) return;          // š ‚±‚ê‚ğ’Ç‰Á
    HRESULT hr = m_pRenderTarget->EndDraw();
    if (hr == D2DERR_RECREATE_TARGET)
    {
        m_pRenderTarget->Release();
        m_pRenderTarget = nullptr;
    }
}

void Renderer::Clear(float r, float g, float b)
{
    if (!m_pRenderTarget) return;              // š ’Ç‰Á
    m_pRenderTarget->Clear(D2D1::ColorF(r, g, b));
}

void Renderer::DrawRect(float x1, float y1, float x2, float y2, D2D1::ColorF color)
{
    if (!m_pRenderTarget) return;
    ID2D1SolidColorBrush* brush = nullptr;
    m_pRenderTarget->CreateSolidColorBrush(color, &brush);

    m_pRenderTarget->FillRectangle(
        D2D1::RectF(x1, y1, x2, y2),
        brush
    );

    brush->Release();
}

void Renderer::DrawCircle(float cx, float cy, float radius, D2D1::ColorF color)
{
    if (!m_pRenderTarget) return;

    ID2D1SolidColorBrush* brush = nullptr;
    m_pRenderTarget->CreateSolidColorBrush(color, &brush);

    m_pRenderTarget->FillEllipse(
        D2D1::Ellipse(D2D1::Point2F(cx, cy), radius, radius),
        brush
    );

    brush->Release();
}

void Renderer::DrawLine(float x1, float y1, float x2, float y2, float strokeWidth, D2D1::ColorF color)
{
    if (!m_pRenderTarget) return;

    ID2D1SolidColorBrush* brush = nullptr;
    m_pRenderTarget->CreateSolidColorBrush(color, &brush);

    m_pRenderTarget->DrawLine(
        D2D1::Point2F(x1, y1),
        D2D1::Point2F(x2, y2),
        brush,
        strokeWidth
    );

    brush->Release();
}

/// <summary>
/// ˜gü‚Ì‚İ‚ğ•`‰æ‚·‚élŠpŒ`
/// </summary>
/// <param name="x1"></param>
/// <param name="y1"></param>
/// <param name="x2"></param>
/// <param name="y2"></param>
/// <param name="strokeWidth"></param>
/// <param name="color"></param>
void Renderer::DrawRectOutline(float x1, float y1, float x2, float y2, float strokeWidth, D2D1::ColorF color)
{
    if (!m_pRenderTarget) return;

    ID2D1SolidColorBrush* brush = nullptr;
    m_pRenderTarget->CreateSolidColorBrush(color, &brush);

    m_pRenderTarget->DrawRectangle(
        D2D1::RectF(x1, y1, x2, y2),
        brush,
        strokeWidth
    );

    brush->Release();
}
