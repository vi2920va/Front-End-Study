/* 

  JavaScript Number
   
   JavaScript의 모든 숫자는 부동 소수점 형식 입니다.

   국제 IEEE 754 표준에 따라 두배 정확도(double precision)의 
   부동 소수점 숫자(floating point numbers)로 사용됩니다. 

   부동 소수점 형식은 일반적으로 컴퓨터 메모리에서 64비트를 
   차지하는 컴퓨터 숫자 형식입니다. 부동 소수점을 사용하여 
   다양한 동적 범위의 숫자 값을 나타냅니다.
   
   하지만 많은 다른 프로그래밍 언어와는 달리, 
   integers, short, long, floating-point 등
   숫자의 다른 형식을 제공하지 않습니다.


   [ 3개의 상징적인 값 ]
   
     +Infinity
   	 -Infinity
     NaN


   [ 숫자 값(리터럴)의 4가지 유형 ]

     10진수 (주로 사용)

      2진수
      8진수
     16진수


     10진수 : 
       0으로 시작 가능. 
       하지만 0 다음에 나오는 모든 수가 8보다 작으면 8진수로 해석.
       ※ 0으로 시작하는 수를 사용하지 않아야 한다.

      2진수 : 
       0 다음 b 또는 B 사용.
       0b 이후 숫자가 0 또는 1이 아니면 오류.

      8진수 : 
       앞에 0 사용.
       0 이후 숫자가 범위(0,1,2,3,4,5,6,7)를 벗어나면 10진수로 해석됨.

     16진수 : 
       0 다음 x 또는 X 사용.
       0x 이후 숫자가 범위(0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f)를 벗어나면 오류.



   [ JavaScript 부동 소수점의 계산 오류 ]

     부동 소수점 연산(floating point arithmetic)은 
     항상 결과가 100% 정확하지는 않습니다.

     0.1 + 0.2 = 0.30000000000000004 // ???

     // 해결책 1
     (0.1 * 10 + 0.2 * 10) / 10

     // 해결책 2 
     Number((0.1 + 0.2).toPrecision(12))

     // 헬퍼함수
     function toPrecisionNumber(expression, precision) {
       if ( !expression || typeof expression !== 'number' ) { 
         throw new Error('숫자 식을 전달해야 합니다.'); 
       }
       precision = precision || 12;
       return Number( expression.toPrecision(precision) );
    }



   [ JavaScript 계산 정확도(Precision) ]
     정수(Integers)(소수점과 지수 표기가 없는 번호)는 
     15자리 까지 정확한 것으로 간주됩니다.

     999999999999999
     9999999999999999 // 10000000000000000

*/



/*
Number 생성자 함수(Constructor Function) -> Number 객체를 생성
Number 함수, 객체& 속성(내장된)

  Number 객체
  
  [속성]
    Number.MAX_VALUE          // 1.7976931348623157e+308
    Number.MIN_VALUE          // 5e-324
    Number.NaN                // NaN
    Number.POSITIVE_INFINITY  // +Infinity
    Number.NEGATIVE_INFINITY  // -Infinity
    Number.EPSILON            // 2.220446049250313e-16
    Number.MIN_SAFE_INTEGER   // -9007199254740991
    Number.MAX_SAFE_INTEGER   // 9007199254740991

  [메서드]

    [스태틱 메서드: IE 미지원]
    
      Number.parseFloat()
      Number.parseInt()
      Number.isFinite()
      Number.isInteger() - 정수인지 아닌지 구분
      Number.isNaN()
      Number.isSafeInteger() - 안전한 정수인지 확인(정수-true, 실수 -false, 정수가 15 자리를 초과할 경우 안전 X)

    [인스턴스 메서드]
      .toExponential() - 지수표기법 안에서 번호를 나타내는 문자열을 반환합니다.
      .toFixed()       - 문자열 고정 소수 점 표기법의 수를 나타내는 문자열을 반환합니다.
      .toPrecision()   - 지정된 정밀에 고정 소수 점 표기법의 수를 나타내는 문자열을 반환합니다.
   
   스태틱 메서드 : Number()생성자 함수에 연결된 메서드
   인스턴스 메서드 : new를 통해서 객체를 생성해야지만 사용할 수 있는 메세드   
    
*/



/*

  Math 객체
  
  [속성]
    Math.PI // 3.141592....

  [메서드]
    Math.min()     - 최솟값
    Math.max()     - 최댓값
    Math.random()  - 난수
    Math.floor()   - 내림
    Math.round()   - 반올림
    Math.ceil()    - 올림
    Math.abs()     - 절대값
    Math.pow()     - 제곱
    Math.sqrt()    - 제곱근(√)
    Math.trunc()   - 정수 반환(소수점 제거)    
*/
var a = 0.1, b=0.2;
var sum = a+b;
var c = Number((a+b).toPrecision(12));

console.log(c);
// #1. 헬퍼 함수 실습
function toPrecisionNumber (expression, precision) {
  if (!expression || typeof expression !== 'number') {
    throw new Error('숫자 식을 전달해야 합니다.');
  }
  precision = precision || 12;
  return Number( expression.toPrecision(precision) );
}
// console.log( toPrecisionNumber(0.0111 + 0.2333, 2) );

// #2. 숫자 앞 뒤 괄호를 묶는 행위는 숫자 값을 숫자 객체인거 처럼 메서드를 사용하고자 할 때 사용한다.
// console.log( (1203).toExponential() );

// #3. 소수점 자리 짜르기
// console.log( (11.1234566990).toFixed(3) );

// #4. 배열 랜덤 길이 및 원소값 출력.
var foods_of_china = ['짜장면', '탕수육', '짬뽕', '깐풍기', '탕수육'];
var foods = Math.floor(Math.random() * foods_of_china.length);
var random_food = foods_of_china[Math.floor(Math.random() * foods_of_china.length)];



function degToRad(degree) {
  if (typeof degree !== 'number') { throw new Error('숫자(각도) 값을 전달해주어야 합니다.'); }
  return Math.PI / 180 * degree;
}

function randomNumber(max, min) {
  min = min || 0;
  if (Math.min(max, min) !== min) { throw new Error('2번째 전달인자 값이 1번째 전달인자 값보다 작아야 합니다.'); }
  return Math.floor(Math.random() * (max - min)) + min;
}