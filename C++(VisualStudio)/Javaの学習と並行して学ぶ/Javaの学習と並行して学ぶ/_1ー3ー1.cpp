#define FLAG1 (0x01)
#include <iostream>
using namespace std;

class BaseClass final
{
	virtual void func() final { //final�ŉ��z�֐��̃I�[�o�[���C�h���֎~����
		int a = 0;
	};
};

//final�N���X�̓N���X���p���ł��Ȃ�(�e�N���X�Ƃ��ė��p�ł��Ȃ�)
//class DerivedClass : public BaseClass // compiler error: BaseClass is
//									 // marked as non-inheritable
//{
//};

int main() {
	int m = 5, n = 6;
	float a = 10.5;  //���e�����̃f�[�^�^�u�Z�Zf(float)�v�Ŏw�肵�Ȃ��Ă�����(double�^�ƂȂ�)
	double b = 10.5;  
	long worldPeople = 69000000L; //���e�����̃f�[�^�^�u�Z�ZL(long double)�v
	cout << a << endl;
	cout << b << endl;
	cout << m << n << endl;
	cout << worldPeople << endl;
	cout << sizeof(bool) << endl;
	cout << sizeof FLAG1 << endl;
	return 0;
}