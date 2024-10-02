#include "DxLib.h"
#include "Fps.h"

extern void GameMain();

int WINAPI WinMain(HINSTANCE,HINSTANCE,LPSTR,int){

    ChangeWindowMode(TRUE); // �E�B���h�E���[�h�ɐݒ�
    // ��ʃT�C�Y�͍ő�� 1920x1080 �ɂ��Ă���
    SetGraphMode(1920, 1080, 32);
    // �ŏ��� 1280x720 �ɂ��Ă���
    SetWindowSize(1280, 720);
    //�t�H���g�T�C�Y�ݒ�
    SetFontSize(80);
    DxLib_Init();   // DX���C�u��������������
    SetDrawScreen(DX_SCREEN_BACK); //�`���𗠉�ʂɐݒ�
    Fps fps;
    //WaitKey();      // �L�[���͑҂�
    while (ProcessMessage() == 0) { //����ʂ�\��ʂɔ��f

        //�G�X�P�[�v�L�[�������ꂽ��Q�[���I��
        if (CheckHitKey(KEY_INPUT_ESCAPE) == 1) {
            break;
        }
        fps.Update();	//�X�V
        GameMain();//�����l�������ҏW����
        fps.Draw();		//�`��
        ScreenFlip();
        fps.Wait();		//�ҋ@
    }
    DxLib_End();    // DX���C�u�����I������
    return 0;
}