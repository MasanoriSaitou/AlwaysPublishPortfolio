#pragma once
#include "Camera.h"
#include "Renderer.h"
using namespace std;

class TextObject{

public:
	void Draw(const wstring& text, float x, float y, float size,D2D1::ColorF color,Renderer& renderer, const Camera* camera = nullptr);
};