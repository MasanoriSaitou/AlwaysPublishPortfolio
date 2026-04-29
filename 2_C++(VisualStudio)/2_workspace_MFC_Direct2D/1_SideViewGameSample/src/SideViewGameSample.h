
// SideViewGameSample.h : SideViewGameSample アプリケーションのメイン ヘッダー ファイル
//
#pragma once

#ifndef __AFXWIN_H__
	#error "PCH に対してこのファイルをインクルードする前に 'pch.h' をインクルードしてください"
#endif

#include "resource.h"       // メイン シンボル


// CSideViewGameSampleApp:
// このクラスの実装については、SideViewGameSample.cpp を参照してください
//

class CSideViewGameSampleApp : public CWinAppEx
{
public:
	CSideViewGameSampleApp() noexcept;


// オーバーライド
public:
	virtual BOOL InitInstance();
	virtual int ExitInstance();

// 実装
	UINT  m_nAppLook;
	BOOL  m_bHiColorIcons;

	virtual void PreLoadState();
	virtual void LoadCustomState();
	virtual void SaveCustomState();

	afx_msg void OnAppAbout();
	DECLARE_MESSAGE_MAP()
};

extern CSideViewGameSampleApp theApp;
