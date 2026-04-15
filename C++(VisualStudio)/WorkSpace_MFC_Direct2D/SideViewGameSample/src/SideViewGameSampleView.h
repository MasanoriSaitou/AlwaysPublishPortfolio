
// SideViewGameSampleView.h : CSideViewGameSampleView クラスのインターフェイス
//
#define WM_APP_RENDER (WM_APP + 1)

#include "include/GameMain.h"
#include <thread>
#pragma once



class CSideViewGameSampleView : public CView
{
	//レンダー用
	Renderer m_Renderer;
	//ゲームループ用
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
	//afx_msg void OnTimer(UINT_PTR nIDEvent);
	afx_msg void OnDestroy();
	afx_msg LRESULT OnRenderMessage(WPARAM, LPARAM);
	afx_msg void OnSize(UINT nType, int cx, int cy);
	//キーボード入力
	afx_msg void OnKeyDown(UINT nChar, UINT nRepCnt, UINT nFlags);
	afx_msg void OnKeyUp(UINT nChar, UINT nRepCnt, UINT nFlags);

	// 高精度タイマー用
	LARGE_INTEGER m_freq;
	LARGE_INTEGER m_prev;

	//ゲームメイン
	GameMain gameMain;

	// ゲームループスレッド
	std::thread m_gameThread;
	bool m_running = false;

	//ゲームループ用関数
	void GameLoop();


protected: // シリアル化からのみ作成します。
	CSideViewGameSampleView() noexcept;
	DECLARE_DYNCREATE(CSideViewGameSampleView)

// 属性
public:
	CSideViewGameSampleDoc* GetDocument() const;

// 操作
public:

// オーバーライド
public:
	virtual void OnDraw(CDC* pDC);  // このビューを描画するためにオーバーライドされます。
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
protected:
	virtual BOOL OnPreparePrinting(CPrintInfo* pInfo);
	virtual void OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo);
	virtual void OnEndPrinting(CDC* pDC, CPrintInfo* pInfo);

// 実装
public:
	virtual ~CSideViewGameSampleView();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:

// 生成された、メッセージ割り当て関数
protected:
	afx_msg void OnFilePrintPreview();
	afx_msg void OnRButtonUp(UINT nFlags, CPoint point);
	afx_msg void OnContextMenu(CWnd* pWnd, CPoint point);
	DECLARE_MESSAGE_MAP()
};

#ifndef _DEBUG  // SideViewGameSampleView.cpp のデバッグ バージョン
inline CSideViewGameSampleDoc* CSideViewGameSampleView::GetDocument() const
   { return reinterpret_cast<CSideViewGameSampleDoc*>(m_pDocument); }
#endif

