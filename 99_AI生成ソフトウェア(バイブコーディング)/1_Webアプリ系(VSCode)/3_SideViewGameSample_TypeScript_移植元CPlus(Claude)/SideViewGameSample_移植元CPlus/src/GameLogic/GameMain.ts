import { Renderer } from "./Renderer";
import { Camera } from "./Camera";
import { InputKey } from "./InputKey";
import { StageMap } from "./StageMap";
import { PlayerObject } from "./GameObject/PlayerObject";
import { StageMapObject } from "./GameObject/StageMapObject";
import { RectObject } from "./GameObject/RectObject";
import { CircleObject } from "./GameObject/CircleObject";
import { LineObject } from "./GameObject/LineObject";
import { TextObject } from "./GameObject/TextObject";
import { PlayerController } from "./Controller/PlayerController";
import { ColorF } from "./ColorF";

/**
 * GameMain.ts
 * 移植元: include/GameMain.h / src/GameMain.cpp
 *
 * ゲーム全体の初期化(Initialize)・更新(Update)・描画(Draw)を統括するクラス。
 *
 * 【指示書11節に基づく方針】
 * UI仕様書に記載の無い m_player / m_player2 / m_ball / m_line
 * (デバッグ用の矩形・円・線)も、移植元のまま一切削除せず描画する。
 *
 * m_player等は移植元では unique_ptr<T> で保持されていたが、TypeScriptには
 * 相当するスマートポインタの概念が無いため、単純な参照(T | undefined)として
 * 保持し、Initialize() で必ず値を設定する(定義済み代入アサーション ! を使用)。
 */
export class GameMain {
    private deathTimer: number = 0;
    private isWaitingRespawn: boolean = false;

    private renderer: Renderer;
    private inputKey: InputKey;
    private player: PlayerObject;
    private stageMapObject: StageMapObject;
    private textObject: TextObject;
    private goalTextObject: TextObject;

    // Initialize() 内で必ず生成されるフィールド
    private m_player!: RectObject;
    private m_player2!: RectObject;
    private pController!: PlayerController;
    private m_ball!: CircleObject;
    private m_line!: LineObject;
    private stageMap!: StageMap;
    private camera!: Camera;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.inputKey = new InputKey();
        this.player = new PlayerObject(60, 300, ColorF.Blue);
        this.stageMapObject = new StageMapObject();
        this.textObject = new TextObject();
        this.goalTextObject = new TextObject();

        this.initialize();
    }

    public initialize(): void {
        this.deathTimer = 0.0;
        this.isWaitingRespawn = false;

        this.m_player = new RectObject(0, 50, 100, 100, ColorF.Red);
        this.m_player2 = new RectObject(100, 150, 150, 150, ColorF.Aqua);
        this.m_ball = new CircleObject(200, 200, 30, ColorF.Yellow);
        this.m_line = new LineObject(10, 10, 100, 10, 5.0, ColorF.Green);
        this.pController = new PlayerController(this.player, this.inputKey);
        this.stageMap = new StageMap(this.stageMapObject);
        this.camera = new Camera(1920.0, 1080.0);
    }

    public update(delta: number): void {

        // ワンパルス入力チェック
        this.inputKey.edgeInputUp();

        // プレイヤーコントローラー
        this.pController.update(delta, this.stageMap);

        // 衝突判定
        this.pController.applyMovement(this.stageMap);

        // カメラ更新
        this.camera.update(
            this.player.x,
            this.renderer.getScreenWidth(),
            this.renderer.getScreenHeight(),
            StageMapObject.MAP_W * StageMapObject.TILE_SIZE
        );

        // プレイヤーの死亡確認
        if (this.pController.isPlayerDead()) {

            this.isWaitingRespawn = true;
            this.deathTimer += delta;

            if (this.deathTimer >= 5.0) {

                // 5秒経過 → ゲーム初期化
                this.initialize();
            }
        }

        if (this.pController.isPlayerGoal()) {

            this.isWaitingRespawn = true;
            this.deathTimer += delta;

            if (this.deathTimer >= 5.0) {

                // 5秒経過 → ゲーム初期化
                this.initialize();
            }
        }
    }

    public draw(): void {

        // 地形描画
        this.stageMapObject.draw(this.renderer, this.camera, this.renderer.getScreenWidth());
        this.m_player.draw(this.renderer);
        this.m_player2.draw(this.renderer);
        this.m_ball.draw(this.renderer);
        this.m_line.draw(this.renderer);

        // プレイヤーを描画
        this.player.draw(this.renderer, this.camera, this.pController.getPowerUpLevel());

        // 文字列表示
        this.textObject.draw(
            "操作方法　A：左移動　D：右移動　W：ジャンプ",
            50, 400, 40.0, ColorF.Red, this.renderer, this.camera
        );

        // ゴール表示
        if (this.pController.isPlayerGoal()) {

            this.goalTextObject.draw("ゴール！！", 600, 200, 100.0, ColorF.Aqua, this.renderer);
        } else if (this.pController.isPlayerDead()) {

            this.goalTextObject.draw("ミス・・・", 600, 200, 100.0, ColorF.Green, this.renderer);
        }
    }

    // ==================
    // キー入力
    // ==================
    public onKeyDownA(): void { this.inputKey.isLeft = true; }
    public onKeyUpA(): void { this.inputKey.isLeft = false; }

    public onKeyDownD(): void { this.inputKey.isRight = true; }
    public onKeyUpD(): void { this.inputKey.isRight = false; }

    public onKeyDownW(): void { this.inputKey.isUp = true; }
    public onKeyUpW(): void { this.inputKey.isUp = false; }

    public onKeyDownS(): void { this.inputKey.isDown = true; }
    public onKeyUpS(): void { this.inputKey.isDown = false; }
}
