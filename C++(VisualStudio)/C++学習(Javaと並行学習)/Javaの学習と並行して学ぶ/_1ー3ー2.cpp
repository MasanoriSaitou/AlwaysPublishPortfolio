#include <iostream>
#include <stdio.h>
using namespace std;

int main() {

    //構造体を用いたビットフィールド：構造体にある技術。
    //                              　ひとつのメモリ領域（バイト単位）に名前をつけて任意のビット単位に振り分ける事が可能
    //                              　プログラマ側で一つの変数の領域を定めたい時に使える(1バイトよりも小さいサイズの変数を作ったりできる)
    typedef struct {
       unsigned char bl : 1; //  【型】 【名前】 : 【割り振りたいビット】 
    }Boolean;
        
    unsigned char a;
    printf("%d\n", 0b11);  //3の事

    Boolean blI1;

    blI1 = { false };
    printf("false = %d\n", blI1.bl);

    blI1 = { true };
    printf("true = %d\n", blI1.bl);

    blI1 = { 0 }; //0(２進数で0b00)
    printf("0 = %d\n", blI1.bl);

    blI1 = { 1 }; //1(２進数で0b01)
    printf("1 = %d\n", blI1.bl);

    blI1 = { 2 }; //2(２進数で0b10)  //たった1ビットで管理しているため、ここから２以降先は管理ができない
    printf("2 = %d\n", blI1.bl);

    blI1 = { 3 }; //3(２進数で0b11)
    printf("3 = %d\n", blI1.bl);

    blI1 = { 4 }; //4(２進数で0b100)
    printf("4 = %d\n", blI1.bl);

    //printf("%d", sizeof blI1.bl); //ビットフィールドはsizeofのサイズ取得ができない
    cout << sizeof blI1 << endl; //ビットフィールドはsizeofのサイズ取得ができない

    return 0;
}