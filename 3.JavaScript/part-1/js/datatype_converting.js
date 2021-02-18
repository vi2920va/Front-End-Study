/*
---------------------------------------------
JavaScript 데이터 유형 변환
---------------------------------------------
JavaScript는 동적 형지정 언어입니다. 이는 변수를
선언할 때 데이터 형을 지정할 필요가 없음을 의미합니다.
또한 데이터 형이 스크립트 실행 도중 필요에 의해 자동으로
변환됨을 뜻합니다.

선언된 변수의 값 유형이 변경되더라도 문제가 발생하지 않음.

자동으로 값이 변경되는 경우.

- 숫자 값이 문자로 변경되는 경우
= String(숫자)
= 숫자 + ''

- 숫자형 문자 값이 숫자로 변경되는 경우
= Number(숫자형 문자)
= +숫자형 문자
= 숫자형 문자 - 0
= 숫자형 문자 * 1
= 숫자형 문자 / 1

- 문자 값을 숫자로 변경해야 하는 경우
= window.parseInt(문자,10)
= window.parseFloat(문자,10)

- 불리언 값으로 변경되는 경우
= Boolean(데이터유형)
= !!데이터유형

---------------------------------------------
 동적 형 지정 언어 사용 시, 고민할 점.
---------------------------------------------

인터프리터 유형의 언어는 실행 도중에 변수에 예상치 못한
타입(type)이 들어와 Type Error 를 뿜는 경우가
생길 수 있습니다.

이러한 고민에 대한 해결책으로 TypeScript를 사용하기도 합니다.
우리 수업의 주제는 아니지만, 정적 형 지정 언어에 대해 살펴볼 때
JavaScript로 변환되는 TypeScript는 좋은 예입니다.

https://www.typescriptlang.org/play/

[정적 형 지정 언어-사용예시]
var total:number = 1234;
var current:number = 10;
var message:string= '정적 형 지정언처럼 작동하여 JavaScript로 변환된다.';
var show:boolean = false;

-> show 는 블리언 값인데 숫자로 값을 변환하려면 에러가 발생.
*/

// 동적 형 지정 언어
// var total = 1568;
// var message = '정적 형 지정 언어처럼 작동하며 JavaScript로 변환된다.';
// var show = false;

// 숫자가 자동으로 문자로 형 변환.
// -> n 숫자를 자동으로 문자로 형변환 해서 값을 더한다.
// -> 올바른 방법은 n은 String(n)을 사용해서 올바르게 형변환 하는 것이다.
// var n = 9;
// var m ='hi good job ' + String(n);


// 숫자형 문자 값이 자동으로 숫자로 변경되는 경우 사칙연상이 가능.
// -> k의 문자값을 바꾸기 위해서는 일반적으로 
// -> Nmber(k); 를 사용한다. 
// -> 사용자에 따라서 +k; (앞에 "+" 기호를 붙여서 사용하기도 한다.)
// -> k는 문자값인데 자동으로 덧셈,뺄셈,나누기,곱하기 사칙연산을 사용할 수 있다...
var k = '12345678';
var k2 = k - 2; // 123456786
var k3 = k / 2;
var k5 = k * 2;

// -> 'px' 문자를 덧셈한다고 해서 k의 값이 변경되는건 아님.
var st  = k + 'px';
// -> k의 값을 변경 하기 위해서 다시 대입.
// -> 더 이상 k의 숫자형 문자가 아니기 때문에 Number(k);
// -> NaN = Not a Number 더 이상 숫자가 아니다 라는 의미.
k = k + 'px'; // 12345678px 변경

// 문자값을 숫자로 바꾸기
//-> 숫자만 출력(담긴 값이 실수여도 숫자만!) - window.parseInt(string,radix);
var img_width= '100px';
//img_width='199.9999ex';
//img_width = window.parseInt(img_width,10);


// -> 실수 - window.parseFloat()
var img_height ='201.89px';
img_height=window.parseFloat(img_height,10);

// 논리연산자로 값을 바꾸기
// -> !n(앞에 느낌표를 한번만 사용하면 값은 false),!!n (느낌표 두번 사용하면 값은 true)
// -> 1, -1 - true | 0, '', null, undefined -false
var n = 9, s = '70px', f = function(){}, a=[3, 4, 6], o = {};
// n = Boolean(n);
// s = Boolean(s);
// f = Boolean(f);
// a = Boolean(a);
// o = Boolean(o);
n = !n;
s = !s;
f = !f;
a = !a;
o = !o;

// 숫자 + null = 숫자
// -> 그 이유는 null 값이 0 이기 때문이다.
var test = 89 + null;

// 숫자 + undefined =NaN
var test = 89 + undefined;
console.log(test);