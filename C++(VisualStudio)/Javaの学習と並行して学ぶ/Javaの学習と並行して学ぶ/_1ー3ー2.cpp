#include <iostream>
#include <stdio.h>
using namespace std;

int main() {

    //�\���̂�p�����r�b�g�t�B�[���h�F�\���̂ɂ���Z�p�B
    //                              �@�ЂƂ̃������̈�i�o�C�g�P�ʁj�ɖ��O�����ĔC�ӂ̃r�b�g�P�ʂɐU�蕪���鎖���\
    //                              �@�v���O���}���ň�̕ϐ��̗̈���߂������Ɏg����(1�o�C�g�����������T�C�Y�̕ϐ����������ł���)
    typedef struct {
       unsigned char bl : 1; //  �y�^�z �y���O�z : �y����U�肽���r�b�g�z 
    }Boolean;
        
    unsigned char a;
    printf("%d\n", 0b11);  //3�̎�

    Boolean blI1;

    blI1 = { false };
    printf("false = %d\n", blI1.bl);

    blI1 = { true };
    printf("true = %d\n", blI1.bl);

    blI1 = { 0 }; //0(�Q�i����0b00)
    printf("0 = %d\n", blI1.bl);

    blI1 = { 1 }; //1(�Q�i����0b01)
    printf("1 = %d\n", blI1.bl);

    blI1 = { 2 }; //2(�Q�i����0b10)  //������1�r�b�g�ŊǗ����Ă��邽�߁A��������Q�ȍ~��͊Ǘ����ł��Ȃ�
    printf("2 = %d\n", blI1.bl);

    blI1 = { 3 }; //3(�Q�i����0b11)
    printf("3 = %d\n", blI1.bl);

    blI1 = { 4 }; //4(�Q�i����0b100)
    printf("4 = %d\n", blI1.bl);

    //printf("%d", sizeof blI1.bl); //�r�b�g�t�B�[���h��sizeof�̃T�C�Y�擾���ł��Ȃ�
    cout << sizeof blI1 << endl; //�r�b�g�t�B�[���h��sizeof�̃T�C�Y�擾���ł��Ȃ�

    return 0;
}