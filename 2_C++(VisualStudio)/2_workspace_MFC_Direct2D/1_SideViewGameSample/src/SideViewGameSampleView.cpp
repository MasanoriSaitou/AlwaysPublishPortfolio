
// SideViewGameSampleView.cpp : CSideViewGameSampleView クラスの実装
//

#include "pch.h"
#include "framework.h"
// SHARED_HANDLERS は、プレビュー、縮小版、および検索フィルター ハンドラーを実装している ATL プロジェクトで定義でき、
// そのプロジェクトとのドキュメント コードの共有を可能にします。
#ifndef SHARED_HANDLERS
#include "SideViewGameSample.h"
#endif

#include "SideViewGameSampleDoc.h"
#include "SideViewGameSampleView.h"


#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CSideViewGameSampleView

IMPLEMENT_DYNCREATE(CSideViewGameSampleView, CView)

BEGIN_MESSAGE_MAP(CSideViewGameSampleView, CView)
	// 標準印刷コマンド
	ON_COMMAND(ID_FILE_PRINT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &CSideViewGameSampleView::OnFilePrintPreview)
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()

	ON_WM_CREATE()
	ON_WM_SIZE()
	ON_MESSAGE(WM_APP_RENDER, OnRenderMessage)
	//キーボード入力イベント
	ON_WM_KEYDOWN()
	ON_WM_KEYUP()
	//ON_WM_TIMER()
END_MESSAGE_MAP()


// CSideViewGameSampleView コンストラクション/デストラクション

CSideViewGameSampleView::CSideViewGameSampleView() noexcept
	: m_running(false)
	, m_freq()
	, m_prev()
	, m_Renderer()
	, gameMain(m_Renderer)
{
	// TODO: 構築コードをここに追加します。

}

CSideViewGameSampleView::~CSideViewGameSampleView()
{
	m_running = false;
	if (m_gameThread.joinable()) {
		m_gameThread.join();
	}
}

BOOL CSideViewGameSampleView::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: この位置で CREATESTRUCT cs を修正して Window クラスまたはスタイルを
	//  修正してください。

	return CView::PreCreateWindow(cs);
}

// CSideViewGameSampleView 描画

void CSideViewGameSampleView::OnDraw(CDC* /*pDC*/)
{
	/*CSideViewGameSampleDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;*/

	// TODO: この場所にネイティブ データ用の描画コードを追加します。
	if (!m_running || m_hWnd == NULL) {

		return;   // ★ 破棄中は描画しない
	}

	if (!m_Renderer.Begin()) {

		return;
	}

	//背景色(毎フレーム塗りつぶし)
	m_Renderer.Clear(0.8f, 0.9f, 1.0f);

	//ゲームメイン
	gameMain.Draw();
	m_Renderer.End();
}


// CSideViewGameSampleView の印刷


void CSideViewGameSampleView::OnFilePrintPreview()
{
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
}

BOOL CSideViewGameSampleView::OnPreparePrinting(CPrintInfo* pInfo)
{
	// 既定の印刷準備
	return DoPreparePrinting(pInfo);
}

void CSideViewGameSampleView::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷前の特別な初期化処理を追加してください。
}

void CSideViewGameSampleView::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: 印刷後の後処理を追加してください。
}

void CSideViewGameSampleView::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void CSideViewGameSampleView::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}


// CSideViewGameSampleView の診断

#ifdef _DEBUG
void CSideViewGameSampleView::AssertValid() const
{
	CView::AssertValid();
}

void CSideViewGameSampleView::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

CSideViewGameSampleDoc* CSideViewGameSampleView::GetDocument() const // デバッグ以外のバージョンはインラインです。
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CSideViewGameSampleDoc)));
	return (CSideViewGameSampleDoc*)m_pDocument;
}
#endif //_DEBUG


/// <summary>
/// ゲームループを実装
/// </summary>
/// <param name="lpCreateStruct"></param>
/// <returns></returns>
int CSideViewGameSampleView::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
	if (CView::OnCreate(lpCreateStruct) == -1) {

		return -1;
	}

	//m_Renderer.Init(m_hWnd);

	// 60FPS → 16ms
	//SetTimer(1, 16, NULL);
	m_running = true;
	m_gameThread = std::thread(&CSideViewGameSampleView::GameLoop, this);

	return 0;
}

//void CSideViewGameSampleView::OnTimer(UINT_PTR nIDEvent)
//{
//	if (nIDEvent == 1)
//	{
//		//m_playerX += 2.0f;  // ← ここで右に移動！
//
//		Invalidate(FALSE);  // 再描画
//	}
//
//	CView::OnTimer(nIDEvent);
//}

void CSideViewGameSampleView::GameLoop()
{
	QueryPerformanceFrequency(&m_freq);
	QueryPerformanceCounter(&m_prev);

	while (m_running)
	{
		if (m_hWnd == NULL)   // ★ ウィンドウが死んでたら即終了
			break;

		LARGE_INTEGER now;
		QueryPerformanceCounter(&now);

		double delta = (double)(now.QuadPart - m_prev.QuadPart) / m_freq.QuadPart;

		if (delta >= (1.0 / 60.0))  // 60FPS
		{
			m_prev = now;

			// --- Update ---
			gameMain.Update(delta);

			// --- Render ---
			if (!m_running)
				break;

			if (m_hWnd != NULL)
				PostMessage(WM_APP_RENDER, 0, 0);
		}
		//std::this_thread::sleep_for(std::chrono::microseconds(100));
	}
}

void CSideViewGameSampleView::OnDestroy()
{
	// ① まずループを止める
	m_running = false;

	// ② スレッドが終わるまで待つ
	if (m_gameThread.joinable()) {
		m_gameThread.join();
	}
	//③待った後破壊
	CView::OnDestroy();
}

LRESULT CSideViewGameSampleView::OnRenderMessage(WPARAM, LPARAM)
{
	// ★ ウィンドウ破棄中・ゲームループ停止後は何もしない
	if (!m_running || m_hWnd == NULL)
		return 0;

	Invalidate(FALSE);
	return 0;
}

void CSideViewGameSampleView::OnSize(UINT nType, int cx, int cy)
{
	CView::OnSize(nType, cx, cy);

	if (cx > 0 && cy > 0)
	{
		m_Renderer.Init(m_hWnd);
	}
}

void CSideViewGameSampleView::OnKeyDown(UINT nChar, UINT nRepCnt, UINT nFlags)
{
	if (nChar == 'A') gameMain.OnKeyDownA();
	if (nChar == 'D') gameMain.OnKeyDownD();
	if (nChar == 'W') gameMain.OnKeyDownW();
	if (nChar == 'S') gameMain.OnKeyDownS();

	CView::OnKeyDown(nChar, nRepCnt, nFlags);
}

void CSideViewGameSampleView::OnKeyUp(UINT nChar, UINT nRepCnt, UINT nFlags)
{
	if (nChar == 'A') gameMain.OnKeyUpA();
	if (nChar == 'D') gameMain.OnKeyUpD();
	if (nChar == 'W') gameMain.OnKeyUpW();
	if (nChar == 'S') gameMain.OnKeyUpS();

	CView::OnKeyUp(nChar, nRepCnt, nFlags);
}



// CSideViewGameSampleView メッセージ ハンドラー