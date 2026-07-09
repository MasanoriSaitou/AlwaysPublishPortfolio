/**
 * CollisionResult.ts
 * 移植元: include/CollisionResult.h
 *
 * 衝突したタイルの座標(タイル単位のインデックス)を保持する構造体。
 * C++版はPOD構造体(struct { int tx; int ty; })のため、
 * TypeScript側もクラス化せず type で同等の値型として表現する。
 * これにより移植元と同じく `{ tx: 1, ty: 2 }` のようなオブジェクトリテラルで
 * 直接生成できる(C++の `{ tx, ty }` 集成体初期化に対応)。
 * 衝突なしの場合は移植元と同様に tx = -1, ty = -1 を使用する。
 */
export type CollisionResult = {
    tx: number;
    ty: number;
};
