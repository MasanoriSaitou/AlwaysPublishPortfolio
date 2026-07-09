import { Renderer } from "../Renderer";
import { Camera } from "../Camera";
import { PowerUpLevel } from "../PowerUpLevel";
import { IColorF, ColorF } from "../ColorF";
import { GameLibrary, IStickManInfo } from "../../GameLibrary/GameLibrary";

/**
 * PlayerObject.ts
 * 移植元: include/PlayerObject.h / src/PlayerObject.cpp
 *
 * プレイヤー(棒人間)の状態(座標・当たり判定サイズ・パワーアップ段階・色)を
 * 保持し、GameLibrary経由で描画するクラス。
 */
export class PlayerObject {

    // 標準時の棒人間パラメータ(移植元の const playerInfo、デザインイニシャライザ)
    // colorHead等はTypeScriptのinterfaceにデフォルト値を持たせられないため、
    // 仮の色を設定しているが、draw() 内で必ず上書きされるため実害はない
    // (移植元も色フィールドは未初期化のまま、Draw() 内で必ず設定される)。
    private readonly playerInfo: IStickManInfo = {
        headRadius: 20,
        bodyLength: 80,
        limbLength: 40,
        lineWidth: 5.0,
        colorHead: ColorF.Black,
        colorTorso: ColorF.Black,
        colorLeftHand: ColorF.Black,
        colorRightHand: ColorF.Black,
        colorLeftLeg: ColorF.Black,
        colorRightLeg: ColorF.Black,
    };

    // Small状態時の棒人間パラメータ(移植元の const smallPlayerInfo)
    private readonly smallPlayerInfo: IStickManInfo = {
        headRadius: 12,
        bodyLength: 30,
        limbLength: 25,
        lineWidth: 3.0,
        colorHead: ColorF.Black,
        colorTorso: ColorF.Black,
        colorLeftHand: ColorF.Black,
        colorRightHand: ColorF.Black,
        colorLeftLeg: ColorF.Black,
        colorRightLeg: ColorF.Black,
    };

    private currentPlayerInfo: IStickManInfo;

    // 移植元に存在するが現行のDraw()では実質未使用のフィールド
    // (コンストラクタでx,yのコピーを保持するのみ。旧実装の名残だが、
    // no-deletion方針によりそのままフィールドとして保持する)
    //private drawX: number;
    //private drawY: number;

    public x: number;
    public y: number;
    public width: number;
    public hight: number; // 綴りも移植元のまま(height の誤字)を維持
    public currentLevel: PowerUpLevel;
    public color: IColorF;

    constructor(_x: number, _y: number, _color: IColorF) {
        this.x = _x;
        this.y = _y;
        this.color = _color;
        //this.drawX = this.x;
        //this.drawY = this.y;
        this.currentLevel = PowerUpLevel.Normal;
        this.currentPlayerInfo = { ...this.playerInfo };

        this.width = GameLibrary.getStickManWidth(this.currentPlayerInfo);
        this.hight = GameLibrary.getStickManHeight(this.currentPlayerInfo);
    }

    public draw(renderer: Renderer, camera: Camera, hp: number): void {

        // PlayerInfo設定
        this.currentPlayerInfo = { ...this.playerInfo };
        if (this.currentLevel === PowerUpLevel.Small) {

            // Small のときだけつぶす
            this.currentPlayerInfo = { ...this.smallPlayerInfo };
        }

        // カラー設定
        this.currentPlayerInfo.colorHead = this.color;
        this.currentPlayerInfo.colorTorso = this.color;
        this.currentPlayerInfo.colorLeftHand = this.color;
        this.currentPlayerInfo.colorRightHand = this.color;
        this.currentPlayerInfo.colorLeftLeg = this.color;
        this.currentPlayerInfo.colorRightLeg = this.color;

        switch (this.currentLevel) {

            case PowerUpLevel.Power1:
                this.currentPlayerInfo.colorHead = ColorF.GreenYellow;
                break;

            case PowerUpLevel.Power2:
                this.currentPlayerInfo.colorHead = ColorF.Red;
                break;

            case PowerUpLevel.Power3:
                this.currentPlayerInfo.colorHead = ColorF.Gold;
                break;

            default:
                break;
        }

        // 幅と高さの更新(論理サイズ)
        this.width = GameLibrary.getStickManWidth(this.currentPlayerInfo);
        this.hight = GameLibrary.getStickManHeight(this.currentPlayerInfo);

        // 描画(Camera 対応版 drawStickMan を呼ぶ)
        GameLibrary.drawStickMan(this.currentPlayerInfo, renderer, this.x, this.y, camera);

        // 文字の表示
        //
        // 【移植元の記述についての補足】
        // 移植元は `wstring hearts(hp, L'¥u2764')` という記述だが、これは
        // バックスラッシュ(\)ではなく全角の円記号(¥)になっており、
        // \u2764 のUnicodeエスケープとしては機能しない(複数文字のwchar_tリテラル
        // という未定義動作寄りの記述になっている)。意図は明らかにハート記号(❤)を
        // hp個並べた文字列であるため、実際に機能する形として ❤ を採用している。
        const hearts:string = "❤".repeat(Math.max(0, hp));
        renderer.drawTextString(hearts, 0, 0, 32.0, ColorF.DeepPink);
    }
}
