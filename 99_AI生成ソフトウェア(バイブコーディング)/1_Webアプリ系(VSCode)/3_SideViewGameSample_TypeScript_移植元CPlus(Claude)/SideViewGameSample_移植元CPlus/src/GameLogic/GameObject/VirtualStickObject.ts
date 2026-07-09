import { Renderer } from "../Renderer";
import { IColorF } from "../ColorF";

/**
 * VirtualStickObject.ts
 * 【新規追加】モバイル操作用の仮想スティックUIを描画する専用クラス。
 *
 * 移植元には対応コードが存在しない、指示書の追加仕様(モバイル操作対応)に
 * 基づく新規実装。既存のGameObject群と同様に「描画のみを担当する」設計とし、
 * 入力判定ロジックは VirtualStickController.ts に分離している。
 *
 * baseX/baseY/baseRadius: スティックの台座(固定位置・固定半径)
 * knobOffsetX/knobOffsetY: 台座中心から見た操作ノブの現在位置のオフセット
 *   (VirtualStickController が毎フレーム更新する)
 */
export class VirtualStickObject {
    public baseX: number;
    public baseY: number;
    public baseRadius: number;
    public knobRadius: number;

    public knobOffsetX: number = 0;
    public knobOffsetY: number = 0;

    // タッチ操作中のみ表示する場合などに利用できる表示フラグ
    public visible: boolean = true;

    private readonly baseColor: IColorF = { r: 1, g: 1, b: 1, a: 0.25 };
    private readonly knobColor: IColorF = { r: 1, g: 1, b: 1, a: 0.45 };

    constructor(baseX: number, baseY: number, baseRadius: number = 80, knobRadius: number = 36) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.baseRadius = baseRadius;
        this.knobRadius = knobRadius;
    }

    public draw(renderer: Renderer): void {
        if (!this.visible) return;

        // 台座(半透明の大きな円)
        renderer.drawCircle(this.baseX, this.baseY, this.baseRadius, this.baseColor);

        // 操作ノブ(現在の入力方向に応じてオフセットした位置に描画)
        renderer.drawCircle(this.baseX + this.knobOffsetX, this.baseY + this.knobOffsetY, this.knobRadius, this.knobColor);
    }
}
