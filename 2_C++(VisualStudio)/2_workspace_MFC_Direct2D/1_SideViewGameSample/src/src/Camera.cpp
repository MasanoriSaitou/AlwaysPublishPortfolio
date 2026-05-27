#include "pch.h"
#include "include/Camera.h"

Camera::Camera(float baseWidth, float baseHeight)
	:cameraX_(0.0f)
	, cameraY_(0.0f)
    , scaleX_(1.0f)
	, scaleY_(1.0f)
	, baseWidth_(baseWidth)
	, baseHeight_(baseHeight) {
}

void Camera::Update(float playerX,int screen_width,int screen_Height,int mapWWidth) {

	// 画面サイズに応じてスケールを再計算
	SetScreenSize(screen_width, screen_Height);

	//スクリーンサイズの確定
	float center = screen_width / 2.0f - 300.0f;

	// カメラの理想位置
	float targetX = playerX - center;

	// 左端制限
	if (targetX < 0)
		targetX = 0;

	// 右端制限
	float maxCameraX = mapWWidth - screen_width + 400.0f;
	if (targetX > maxCameraX) {

		targetX = maxCameraX;
	}

	cameraX = targetX;
}

void Camera::SetScreenSize(float screenWidth, float screenHeight){

	scaleX_ = screenWidth / baseWidth_;
	scaleY_ = screenHeight / baseHeight_;
}

float Camera::WorldToScreenX(float worldX) const
{
	return (worldX - cameraX_) * scaleX_;
}

float Camera::WorldToScreenY(float worldY) const
{
	return (worldY - cameraY_) * scaleY_;
}

float Camera::ScaleSize(float size) const
{
	return size * scaleX_; // 2DならXだけでOK
}

float Camera::GetCameraX() const{

	return cameraX_;
}

float Camera::GetScaleX() const {

	return scaleX_;
}

float Camera::GetScaleY() const{

	return scaleY_;
}