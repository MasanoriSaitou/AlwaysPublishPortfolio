/**
 * InputKey.ts
 * 移植元: include/InputKey.h
 *
 * キー入力操作のフラグを保持するクラス。
 * isLeft / isRight / isUp / isDown は各方向キーの押下状態(レベル入力)。
 * pressedUpOrDown は「上下いずれかのキーが今フレームで新たに押された」ことを示す
 * ワンパルス(エッジ)入力で、edgeInputUp() を毎フレーム呼び出すことで更新される。
 *
 * 移植元のメンバ・メソッド名をそのまま維持している
 * (EdgeInputUp -> edgeInputUp: TypeScriptの命名慣習に合わせ大文字小文字のみ変更)。
 */
export class InputKey {
    // 前フレームの上下キー入力状態(ワンパルス判定用)
    private prevUp: boolean = false;

    public isLeft: boolean = false;
    public isRight: boolean = false;
    public isUp: boolean = false;
    public isDown: boolean = false;
    public pressedUpOrDown: boolean = false;

    /**
     * ワンパルス入力チェック。
     * 上下どちらかのキーが押されていて、かつ前フレームの入力状態がOFFだった場合のみ true。
     * 毎フレームの Update 冒頭で呼び出すこと。
     */
    public edgeInputUp(): void {
        // ワンパルス:上下どちらかのキーが押されて、前フレームの入力状態がOFFならば
        this.pressedUpOrDown = (this.isUp || this.isDown) && !this.prevUp;
        // 今フレームの入力状態を取得
        this.prevUp = this.isUp || this.isDown;
    }
}
