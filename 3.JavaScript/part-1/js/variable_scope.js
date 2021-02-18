/*
[변수 - Variable]
- 메모리를 데이터를 담는 저장공간, 때에 따라서는 값을 변경 가능.

[변수 선언 - Variable Declaration]
- var, let, const 키워드를 사용.
- 선언 되지 않은 변수를 읽으려고 하면 아래와 같은 error 발생.
ReferenceError: z is not defined

[변수 할당 - Variable Assignment]
- 대입, 할당 연산자

[스코프 - Scope]
1. 전역 스코프 (Global Scope)
- 함수 바깥이나 {} 에서 선언되었다면, 전역 스코프로 정의한다.
- let은 똑같은 변수명으로 재선언 할 수 없다. 
- var는 똑같은 변수명으로 선언하면, 마지막에 선언한 값으로 바뀐다.

2. 지역 스코프 (Lacal Scope)
- 특정 부분에서만 사용 가능한 변수.
- 지역 스코프에는 함수 스코프, 블록 스코프 두 가지가 크게 존재한다.

2-1. 블록 스코프 (block-scoped)
- 중괄호 {}로 감싸진 범위
- 일반적으로  제어 흐름 문 (if, for, while)문과 함께 사용한다.
- 내부에 const, let 으로 선언하면 중괄호 내부 에서만 사용이 가능하다.

2-2. 함수 스코프 (function-scoped)
function call () {
    console.log('Hi');
}
call();
*/
// 전역 스코프
var global ="Global";

// 지역 스코프 - 블록 스코프
if(true){
    let variable2 = 'I am in a block';
    const variable3 = 'I am in a block';
    console.log('lacal:' + variable2);
    console.log('lacal:' + variable3);
  }
  console.log('global:' + global);

  for(var i=0; i<2; i++){
    var variable1 = 'I am in a block';
    let variable2 = 'I am in a block';
    const variable3 = 'I am in a block';
    console.log(variable1); 
    console.log(variable2); 
    console.log(variable3);
  }
  // 지역 스코프 - 함수 스코프
  function call () {
    console.log('Hi');
  }
  call();


