/**
 * TileType.ts
 * 移植元: include/TileType.h
 *
 * 各タイルの種別を表す列挙体。
 * 移植元の数値(タグ値)を完全に維持している。
 *   Empty    = 0 (空気)
 *   Ground   = 1 (地面ブロック)
 *   PowerUp1 = 2 (パワーアップブロック)
 *   Thorn    = 3 (トゲ)
 *   Goal     = 8 (ゴール)
 *   Death    = 9 (死亡ライン)
 */
export enum TileType {
    Empty = 0,
    Ground = 1,
    PowerUp1 = 2,
    Thorn = 3,
    Goal = 8,
    Death = 9,
}
