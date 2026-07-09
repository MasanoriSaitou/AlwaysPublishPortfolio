/**
 * Camera.ts
 * 移植元: include/Camera.h / src/Camera.cpp
 *
 * プレイヤーを追従するカメラ。ワールド座標→スクリーン座標変換、
 * 画面サイズに応じたスケール計算を担う。
 *
 * 移植元では `Property cameraX{ *this };` という構造体+演算子オーバーロードで
 * 「フィールドのように代入・参照できるプロパティ」を実現していたが、
 * TypeScriptでは get/set アクセサで同等の挙動を実現する
 * (`camera.cameraX = targetX;` のような代入も、`const x = camera.cameraX;` のような
 * 参照も、移植元と同じ書き方が可能)。
 *
 * 計算式(Update内のプレイヤー追従・左右端制限ロジック)は一切変更せず直訳している。
 */
export class Camera {
    private cameraX_: number; // カメラの左端(世界座標)
    private cameraY_: number; // 必要なら使う(今は0固定でもOK)

    private scaleX_: number; // 横方向のスケール
    private scaleY_: number; // 縦方向のスケール

    private baseWidth_: number;  // 基準解像度(ゲーム内論理幅)
    private baseHeight_: number; // 基準解像度(ゲーム内論理高さ)

    public constructor(baseWidth: number = 1920.0, baseHeight: number = 1080.0) {
        this.cameraX_ = 0.0;
        this.cameraY_ = 0.0;
        this.scaleX_ = 1.0;
        this.scaleY_ = 1.0;
        this.baseWidth_ = baseWidth;
        this.baseHeight_ = baseHeight;
    }

    /**
     * cameraX プロパティ(移植元の Property cameraX{ *this } に相当)
     */
    public get cameraX(): number {
        return this.cameraX_;
    }
    public set cameraX(value: number) {
        this.cameraX_ = value;
    }

    public update(playerX: number, screen_width: number, screen_Height: number, mapWWidth: number): void {

        // 画面サイズに応じてスケールを再計算
        this.setScreenSize(screen_width, screen_Height);

        // スクリーンサイズの確定
        const center = screen_width / 2.0 - 300.0;

        // カメラの理想位置
        let targetX = playerX - center;

        // 左端制限
        if (targetX < 0) {
            targetX = 0;
        }

        // 右端制限
        const maxCameraX = mapWWidth - screen_width + 400.0;
        if (targetX > maxCameraX) {
            targetX = maxCameraX;
        }

        this.cameraX = targetX;
    }

    public setScreenSize(screenWidth: number, screenHeight: number): void {
        this.scaleX_ = screenWidth / this.baseWidth_;
        this.scaleY_ = screenHeight / this.baseHeight_;
    }

    // 座標変換
    public worldToScreenX(worldX: number): number {
        return (worldX - this.cameraX_) * this.scaleX_;
    }

    public worldToScreenY(worldY: number): number {
        return (worldY - this.cameraY_) * this.scaleY_;
    }

    // サイズ変換
    public scaleSize(size: number): number {
        return size * this.scaleX_; // 2DならXだけでOK
    }

    // 情報取得用
    public getCameraX(): number {
        return this.cameraX_;
    }

    public getScaleX(): number {
        return this.scaleX_;
    }

    public getScaleY(): number {
        return this.scaleY_;
    }
}
