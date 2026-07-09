import { PlayerObject } from "../GameObject/PlayerObject";
import { StageMap, IGroundRef } from "../StageMap";
import { InputKey } from "../InputKey";
import { PowerUpLevel } from "../PowerUpLevel";
import { TileType } from "../TileType";

/**
 * PlayerController.ts
 * 移植元: include/PlayerController.h / src/PlayerController.cpp
 *
 * プレイヤーの入力処理、重力・ジャンプ等の物理演算、パワーアップ段階に応じた
 * 挙動切替、ステージとの衝突結果に応じたイベント分岐(死亡・ゴール・
 * パワーアップ・ダメージ)を担当するコントローラークラス。
 *
 * 移植元の `bool& isGrounded`(参照渡し)は StageMap.ts で定義した
 * IGroundRef ラッパーで再現している(詳細は StageMap.ts のコメント参照)。
 */
export class PlayerController {
    private player: PlayerObject;
    private inputKey: InputKey;
    private delta: number;
    private velocityX: number;
    private velocityY: number;
    private isGrounded: boolean = false; // 地面にいるかの判定
    private isJump: number; // 移植元は char 型だが、TypeScriptには char が無いため number で表現
    private direX: number;
    private direY: number;
    private speed: number = 300.0; // 800 // 1秒あたり100px の速度
    private fallTime: number = 0.0; // 落下時間計測
    private isDead: boolean;
    private isGoal: boolean;
    private isInvincible: boolean = false; // 無敵状態フラグ
    private invincibleTimer: number = 0.0; // 無敵時間タイマー

    // パワーアップ
    private canJump: boolean;
    private canDoubleJump: boolean;
    private canAttack: boolean;
    private canAirWalk: boolean;
    private canAirWalkFree: boolean;

    private prevH: boolean = false; // 前フレームのHキー状態(移植元同様、現状未使用だが保持)

    private powerUpLevel: PowerUpLevel; // これがそのまま体力にもなっている

    public moveX: number;
    public moveY: number;

    constructor(p: PlayerObject, i: InputKey) {
        this.player = p;
        this.inputKey = i;
        this.moveX = 0;
        this.moveY = 0;
        this.direX = 0;
        this.direY = 0;
        this.delta = 0;
        this.isDead = false;
        this.isGoal = false;
        this.isJump = 0;
        this.canJump = false;
        this.canDoubleJump = false;
        this.canAttack = false;
        this.canAirWalk = false;
        this.canAirWalkFree = false;
        this.powerUpLevel = PowerUpLevel.Small;
        this.isInvincible = false;
        this.invincibleTimer = 0.0;
        this.velocityX = 0.0;
        this.velocityY = 0.0;

        // プレイヤーの初期状態を設定
        this.player.x = 60.0;
        this.player.y = 300.0;
        this.applyPowerUp(this.powerUpLevel);
    }

    public update(delta: number, map: StageMap): void {

        // 前フレームからの経過秒の取得
        this.delta = delta;

        // プレイヤー死亡判定
        if (!this.isDead && !this.isGoal) {

            // --- ダメージ直後の無敵状態 ---
            if (this.isInvincible) {
                this.invincibleTimer -= delta;

                // ノックバック中は操作無効
                this.direX = 0;

                // ノックバックの減衰
                this.velocityX *= 0.96;

                if (this.invincibleTimer <= 0.0) {
                    this.isInvincible = false;
                    this.velocityX = 0.0; // ノックバック終了
                }
            } else {

                // 通常時の入力処理
                // 移動方向を決める
                this.direX = 0;
                this.direY = 0;
                if (this.inputKey.isLeft) this.direX = -1;
                if (this.inputKey.isRight) this.direX = 1;
                if (this.inputKey.isUp) this.direY = -1;
                if (this.inputKey.isDown) this.direY = 1;
                this.velocityX = this.direX * this.speed; // 通常移動
            }

            // プレイヤーアクション
            if (this.canJump || this.canDoubleJump) this.jump(); // ジャンプ
            // if (this.canAttack) this.attack();
            if (this.canAirWalk) this.airWalk();
            if (this.canAirWalkFree) this.airWalkFree();
        } else {

            // 死亡またはゴール
            // 入力無効にする
            this.direX = 0;
            this.direY = 0;
            this.velocityX = 0.0; // 横移動は止める
        }

        // 3段階目のパワーアップの時以外は、世界の重力を常に受け続ける
        if (this.powerUpLevel !== PowerUpLevel.Power3) {
            this.velocityY += map.gravity;
            this.fallTime += this.delta;
        }

        // 着地したら落下速度をリセット
        if (this.isGrounded) {
            this.velocityY = 0.0;
            this.fallTime = 0.0;
            this.isJump = 0;
        }

        // 落下量(速度 × delta)
        // delta は「前フレームからの経過秒」
        this.moveX = this.velocityX * this.delta;
        this.moveY = this.velocityY * this.delta;
    }

    public damage(): void {

        // 無敵中は何もしない
        if (this.isInvincible) {
            return;
        }

        if (this.powerUpLevel > PowerUpLevel.Small) {

            // パワーダウン
            this.applyPowerUp((this.powerUpLevel - 1) as PowerUpLevel);
            // 無敵時間(2秒間点滅)
            this.isInvincible = true;
            this.invincibleTimer = 1.0;

            // 左にノックバック移動
            this.velocityX = -200.0;
        } else {

            // プレイヤー死亡
            this.killPlayer();
        }
    }

    private applyPowerUp(level: PowerUpLevel): void {

        let next = level as number;

        // 上下限チェック(Max の 1 つ前が実質の最大、Minが最小)
        const maxValue = (PowerUpLevel.Max as number) - 1;
        const minValue = PowerUpLevel.Small as number;
        next = Math.max(minValue, next);
        next = Math.min(maxValue, next);
        level = next as PowerUpLevel;

        // 更新
        this.powerUpLevel = level;
        this.player.currentLevel = level;

        switch (level) {

            // Normal段階:2段ジャンプができる
            case PowerUpLevel.Normal:
                this.canJump = true;
                this.canDoubleJump = true;
                this.canAttack = false;
                this.canAirWalk = false;
                this.canAirWalkFree = false;
                break;

            // パワーアップ1段階目:空中浮遊ができる(ジャンプはできない)
            case PowerUpLevel.Power1:
                this.canJump = false;
                this.canDoubleJump = false;
                this.canAttack = false;
                this.canAirWalk = true;
                this.canAirWalkFree = false;
                break;

            // パワーアップ2段階目:飛び道具で攻撃でき、かつ空中浮遊もできる(ジャンプはできない)
            case PowerUpLevel.Power2:
                this.canJump = false;
                this.canDoubleJump = false;
                this.canAttack = true;
                this.canAirWalk = true;
                this.canAirWalkFree = false;
                break;

            // パワーアップ3段階目:飛び道具で攻撃でき、かつ空中を自由に移動もできる(ジャンプ、踏みつけはできない)
            case PowerUpLevel.Power3:
                this.canJump = false;
                this.canDoubleJump = false;
                this.canAttack = true;
                this.canAirWalk = false;
                this.canAirWalkFree = true;
                break;

            // Small状態
            default:
                this.canJump = true;
                this.canDoubleJump = false;
                this.canAttack = false;
                this.canAirWalk = false;
                this.canAirWalkFree = false;
                break;
        }
    }

    public jump(): void {

        // --- ジャンプ処理 ---
        const pressedW = this.direY === -1 && this.inputKey.pressedUpOrDown;
        // 地上ジャンプ:パワーアップがSmall状態の時
        const groundJump = pressedW && this.isGrounded;
        // 空中ジャンプ:パワーアップがNormal状態以上の時
        const doubleJump = pressedW && this.canDoubleJump && this.isJump === 1;

        if (groundJump || doubleJump) {
            this.velocityY = -1200.0; // ジャンプ力(調整可能)
            this.isGrounded = false; // 空中へ
            this.isJump++; // ジャンプフラグ
        }
    }

    public airWalk(): void {

        // --- 空中移動 ---
        if (this.player.y < -80) {
            this.player.y = -80.0;
            this.velocityY = 0.0;
            this.fallTime = 0.0;
            this.moveY = 0.0;
        }
        if (this.direY !== 0) {
            this.velocityY = 0.0;
            this.fallTime = 0.0;
            this.moveY = 0.0;
            this.isGrounded = false; // 空中へ
        }
        this.velocityY += this.speed * this.direY * 3.0;
    }

    public airWalkFree(): void {

        // --- 空中移動 ---
        if (this.player.y <= -80) {
            this.player.y = -80.0;
            this.velocityY = 0.0;
            this.fallTime = 0.0;
            this.moveY = 0.0;
        }
        if (this.direY !== 0) {
            this.isGrounded = false; // 空中へ
        }
        this.velocityY = this.speed * this.direY * 3.0;
    }

    public applyMovement(map: StageMap): void {

        // 衝突判定X
        this.player.x = map.resolveCollisionX(this.player.x, this.player.y, this.player.width, this.player.hight, this.moveX);
        // 左端判定
        this.player.x = map.limitPosLeftX(this.player.x, this.player.width);

        // プレイヤー死亡時には無視される
        if (this.isDead) {
            this.player.y += this.moveY;
            return;
        }

        // 衝突判定Y
        const groundRef: IGroundRef = { value: this.isGrounded };
        this.player.y = map.resolveCollisionY(this.player.x, this.player.y, this.player.width, this.player.hight, this.moveY, groundRef);
        this.isGrounded = groundRef.value;

        const tiles: TileType[] = map.getTilesInRect(this.player.x, this.player.y, this.player.width, this.player.hight);

        for (const t of tiles) {
            switch (t) {

                // 死亡判定
                case TileType.Death: {
                    this.killPlayer(false);
                    return;
                }
                // ゴールに触れた
                case TileType.Goal: {
                    this.isGoal = true;
                    return;
                }
                // パワーアップブロックに触れた
                case TileType.PowerUp1: {
                    const next = (this.powerUpLevel as number) + 1;
                    this.applyPowerUp(next as PowerUpLevel);
                    break;
                }
                // トゲに触れた
                case TileType.Thorn: {
                    this.damage();
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    /**
     * killPlayer
     * プレイヤーが死亡する
     */
    public killPlayer(isBounce: boolean = true): void {

        if (this.isDead) return; // 二重死防止

        // 死亡
        this.isDead = true;

        // 死亡ジャンプ(上に跳ねる)
        if (isBounce) {
            this.velocityY = -1000.0; // 好きな値に調整
            this.isGrounded = false; // 空中へ
        }
    }

    /**
     * isPlayerDead
     * プレイヤーが死亡したかを判定する
     */
    public isPlayerDead(): boolean {
        return this.isDead;
    }

    /**
     * isPlayerGoal
     * プレイヤーがゴールしたかを判定する
     */
    public isPlayerGoal(): boolean {
        return this.isGoal;
    }

    public getPowerUpLevel(): number {
        if (this.isDead) {
            return 0;
        }
        return this.powerUpLevel as number;
    }
}
