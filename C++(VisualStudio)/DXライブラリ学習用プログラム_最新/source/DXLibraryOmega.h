#pragma once
#include "DxLib.h"
#include <string>
#include <map>
using namespace std;

class DXLibraryOmega {

	private:
		int Key[256]; // �L�[��������Ă���t���[�������i�[����
		int gpUpdateKey();

	public:
		int �G�������n��(const string& �G�̖��O);
		int �G��\������(int �Ώۂ̊G,int ���̈ʒu,int �c�̈ʒu,float �傫��);
		int ���y�������n��(const string& ���y�̖��O);
		int ���y���Đ�����(int �Ώۂ̉��y);
		void ���\�����̊G��S����();
		int �G���������E�ɂ��炷(int& x);
		string �����E�{�^���������ꂽ�ꍇ��();
		string �������{�^���������ꂽ�ꍇ��();
		string ������{�^���������ꂽ�ꍇ��();
		string �������{�^���������ꂽ�ꍇ��();
		void �������\������(const string& �\����������������,
			int �\�������������̈ʒu, int �\�����������c�̈ʒu,
			string �Ԃ܂��͗΂܂��͐�);
		void ��ʂ̑傫����ύX����(int ���̑傫��, int �c�̑傫��);
};