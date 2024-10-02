#include "DXLibraryOmega.h"

int DXLibraryOmega::�G�������n��(const string& �G�̖��O) {

    string filePath = "./�摜/" + �G�̖��O;
    return LoadGraph(filePath.c_str()); //�摜�����[�h
}

int DXLibraryOmega::�G��\������(int �Ώۂ̊G, int ���̈ʒu, int �c�̈ʒu,float �傫��) {

    return DrawRotaGraph(���̈ʒu, �c�̈ʒu, �傫��,0,�Ώۂ̊G, TRUE); // �f�[�^�n���h�����g���ĉ摜��`��
}

int DXLibraryOmega::���y�������n��(const string& ���y�̖��O) {

	string filePath = "./�T�E���h/" + ���y�̖��O;
	return LoadSoundMem(filePath.c_str()); //�摜�����[�h
}

int DXLibraryOmega::���y���Đ�����(int �Ώۂ̉��y) {

	static bool isPlay = false;
	int play = 0;
	if (!isPlay) {
		play = PlaySoundMem(�Ώۂ̉��y, DX_PLAYTYPE_BACK);
		isPlay = true;
	}
	return play; // ���ʉ����Đ�����
}

void DXLibraryOmega::���\�����̊G��S����() {

	ClearDrawScreen();
}

int DXLibraryOmega::�G���������E�ɂ��炷(int& x) {

	Sleep(28); // 7[ms]�ҋ@
	return x = x + 2; // x��2���₷
}

string DXLibraryOmega::�����E�{�^���������ꂽ�ꍇ��() {

	gpUpdateKey();//�L�[���X�V
	string result = "";
	if (Key[KEY_INPUT_RIGHT] >= 1) {
		//�����ꂽ
		result = "�����ꂽ";
	}
	return result;
}

string DXLibraryOmega::�������{�^���������ꂽ�ꍇ��() {

	gpUpdateKey();//�L�[���X�V
	string result = "";
	if (Key[KEY_INPUT_LEFT] >= 1) {
		//�����ꂽ
		result = "�����ꂽ";
	}
	return result;
}

string DXLibraryOmega::������{�^���������ꂽ�ꍇ��() {

	gpUpdateKey();//�L�[���X�V
	string result = "";
	if (Key[KEY_INPUT_UP] >= 1) {
		//�����ꂽ
		result = "�����ꂽ";
	}
	return result;
}

string DXLibraryOmega::�������{�^���������ꂽ�ꍇ��() {

	gpUpdateKey();//�L�[���X�V
	string result = "";
	if (Key[KEY_INPUT_DOWN] >= 1) {
		//�����ꂽ
		result = "�����ꂽ";
	}
	return result;
}

// �L�[�̓��͏�Ԃ��X�V����
int DXLibraryOmega::gpUpdateKey() {

	char tmpKey[256]; // ���݂̃L�[�̓��͏�Ԃ��i�[����
	GetHitKeyStateAll(tmpKey); // �S�ẴL�[�̓��͏�Ԃ𓾂�
	for (int i = 0; i < 256; i++) {
		if (tmpKey[i] != 0) { // i�Ԃ̃L�[�R�[�h�ɑΉ�����L�[��������Ă�����
			Key[i]++;     // ���Z
		}
		else {              // ������Ă��Ȃ����
			Key[i] = 0;   // 0�ɂ���
		}
	}
	return 0;
}

void DXLibraryOmega::�������\������(const string& �\����������������, int �\�������������̈ʒu, int �\�����������c�̈ʒu, string �Ԃ܂��͗΂܂��͐�) {

	static bool isPlay = false;
	static map<string, int> color;
	if (!isPlay) {

		//�F�̒�`
		int Green = GetColor(0, 255, 0);      // �΂̐F�R�[�h���擾
		int Red = GetColor(255, 0, 0);// �Ԃ̐F�R�[�h���擾
		int Blue = GetColor(0, 0, 255);// �̐F�R�[�h���擾

		//�A�z�z��
		color["��"] = Red;
		color["��"] = Blue;
		color["��"] = Green;

		isPlay = true;
	}

	auto iter = color.find(�Ԃ܂��͗΂܂��͐�);
	if (iter == end(color)) {
		//������Ȃ��Ȃ�ΐԂɂ���
		�Ԃ܂��͗΂܂��͐� = "��";
	}

	DrawFormatString(�\�������������̈ʒu, �\�����������c�̈ʒu, color[�Ԃ܂��͗΂܂��͐�],
		�\����������������.c_str()); // ������`�悷��
}

void DXLibraryOmega::��ʂ̑傫����ύX����(int ���̑傫��, int �c�̑傫��) {

	static bool isPlay = false;
	if (!isPlay) {
		SetWindowSize(���̑傫��, �c�̑傫��);
		isPlay = true;
	}
}