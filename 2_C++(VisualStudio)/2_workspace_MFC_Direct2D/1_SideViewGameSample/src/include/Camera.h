#pragma once

//カメラ
class Camera {

	float SCREEN_WIDTH = 0.0f;
	float cameraX_;

    //structを使って代入演算子をオーバーロードする方法で、プロパティを実現する
    struct Property {

        Camera& owner;
        //セッター
        void operator=(float value) { owner.cameraX_ = value; }
        //ゲッター
        operator float() const { return owner.cameraX_; }
    };
public:
    Camera();
    explicit Camera(float);
    Property cameraX{ *this };
	void Update(float,int,int);
};