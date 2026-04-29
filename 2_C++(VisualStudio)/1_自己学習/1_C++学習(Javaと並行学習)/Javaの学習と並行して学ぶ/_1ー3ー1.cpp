#define FLAG1 (0x01)
#include <iostream>
using namespace std;

class BaseClass final
{
	virtual void func() final { //finalで仮想関数のオーバーライドを禁止する
		int a = 0;
	};
};

//finalクラスはクラスが継承できない(親クラスとして利用できない)
//class DerivedClass : public BaseClass // compiler error: BaseClass is
//									 // marked as non-inheritable
//{
//};

int main() {
	int m = 5, n = 6;
	float a = 10.5;  //リテラルのデータ型「〇〇f(float)」で指定しなくても動く(double型となる)
	double b = 10.5;  
	long worldPeople = 69000000L; //リテラルのデータ型「〇〇L(long double)」
	cout << a << endl;
	cout << b << endl;
	cout << m << n << endl;
	cout << worldPeople << endl;
	cout << sizeof(bool) << endl;
	cout << sizeof FLAG1 << endl;
	return 0;
}