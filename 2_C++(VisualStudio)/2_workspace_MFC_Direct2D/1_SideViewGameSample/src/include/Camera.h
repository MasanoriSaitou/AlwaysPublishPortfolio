#pragma once

//カメラ
class Camera {

    float cameraX_;      // カメラの左端（世界座標）
    float cameraY_;      // 必要なら使う（今は0固定でもOK）

    float scaleX_;       // 横方向のスケール
    float scaleY_;       // 縦方向のスケール

    float baseWidth_;    // 基準解像度（ゲーム内論理幅）
    float baseHeight_;   // 基準解像度（ゲーム内論理高さ）

    //structを使って代入演算子をオーバーロードする方法で、プロパティを実現する
    struct Property {

        Camera& owner;
        //セッター
        void operator=(float value) { owner.cameraX_ = value; }
        //ゲッター
        operator float() const { return owner.cameraX_; }
    };
public:
    Camera(float baseWidth = 1920.0f, float baseHeight = 1080.0f);
    Property cameraX{ *this };
	void Update(float,int,int,int);
    void SetScreenSize(float screenWidth, float screenHeight);

    // 座標変換
    float WorldToScreenX(float worldX) const;
    float WorldToScreenY(float worldY) const;

    // サイズ変換
    float ScaleSize(float size) const;

    //情報取得用 
    float GetCameraX() const;
    float GetScaleX() const;
    float GetScaleY() const;
};