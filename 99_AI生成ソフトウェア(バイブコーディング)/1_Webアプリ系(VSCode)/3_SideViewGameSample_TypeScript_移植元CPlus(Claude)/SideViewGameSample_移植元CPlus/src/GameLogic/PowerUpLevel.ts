/**
 * PowerUpLevel.ts
 * 移植元: include/PowerUpLevel.h
 *
 * 棒人間(StickMan)のパワーアップ段階(=体力)を表す列挙体。
 * 移植元の数値(タグ値)を完全に維持している。
 *   Small   = 1 (チビ状態  体力1)
 *   Normal  = 2 (標準状態  体力2 / 2段ジャンプ可)
 *   Power1  = 3 (多段ジャンプ状態 体力3)
 *   Power2  = 4 (赤状態    体力4)
 *   Power3  = 5 (最終状態  体力5 / 自由空中移動可)
 *   Max     = 6 (上限番兵値。実際の状態としては使用しない)
 */
export enum PowerUpLevel {
    Small = 1,
    Normal = 2,
    Power1 = 3,
    Power2 = 4,
    Power3 = 5,
    Max = 6,
}
