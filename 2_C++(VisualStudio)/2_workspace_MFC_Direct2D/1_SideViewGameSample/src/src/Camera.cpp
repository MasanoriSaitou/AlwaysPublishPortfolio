#include "pch.h"
#include "include/Camera.h"

Camera::Camera()
	:cameraX_(0.0f){
}

Camera::Camera(float SCREEN_WIDTH)
	:SCREEN_WIDTH(SCREEN_WIDTH)
	,cameraX_(0.0f){
}

void Camera::Update(float playerX,int screen_width,int mapWWidth) {

	//画面サイズ最初の初期化
	if (SCREEN_WIDTH > 0.0f) {
		
		screen_width = SCREEN_WIDTH;
	}
	float center = screen_width / 2.0f - 300;

	// カメラの理想位置
	float targetX = playerX - center;

	// 左端制限
	if (targetX < 0)
		targetX = 0;

	// 右端制限
	float maxCameraX = mapWWidth - screen_width + 400;
	if (targetX > maxCameraX) {

		targetX = maxCameraX;
	}

	cameraX_ = targetX;
}