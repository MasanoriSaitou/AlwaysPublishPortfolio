
#pragma once

/////////////////////////////////////////////////////////////////////////////
// CViewTree ウィンドウ

class CViewTree : public CTreeCtrl
{
// コンストラクション
public:
	CViewTree() noexcept;

// オーバーライド
protected:
	virtual BOOL OnNotify(WPARAM wParam, LPARAM lParam, LRESULT* pResult);

// 実装
public:
	virtual ~CViewTree();

protected:
	DECLARE_MESSAGE_MAP()
};
