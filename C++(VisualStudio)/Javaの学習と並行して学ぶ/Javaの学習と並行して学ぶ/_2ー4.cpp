#include <iostream>
using namespace std;

int main() {
	cout << 9 / 2 << endl; //9/2�͂��̏��̌��ʂ̂S�ƂȂ��Ă��܂�
	cout << 9.0 / 2 << endl; //9.0 / 2�̂悤�ɂǂ��炩�̃I�y�����h�������ɂ����4.5�ɂȂ�

	int a = 10;
	int b = 10;
	cout << (++a) + 50 << endl; //�C���N�������g��f�N�������g�͉��Z�q�̈ʒu�Ōv�Z�^�C�~���O���ς���Ă��܂��I
	cout << (b++) + 50 << endl; //�o�O�����炷���߁A�Ȃ�ׂ��C���N�������g�f�N�������g�͂���P�̂Ŏ��s����悤�ɂ���
								//�C���N�������g�Ƃ���()�����悤�Ƃ��܂��Ɠ���
	float c = 3.0; //double�^���e������float�^�ϐ��ɑ��OK!(�L���X�g�s�v)

	int j = 9;
	for (j; j < 10; j++) {
		a = 100;
		if (j > 3)continue;
	}


	return 0;
}//main end