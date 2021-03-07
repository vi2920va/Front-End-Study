// ------------------------------------------------------
// 함수 용어
// ------------------------------------------------------

// #1. 함수 표현식 - 익명 함수
var nextEl = function(e) { };

// #2. 함수 선언 - 이름이 있는 함수
function prevEl(el) { }

// #3. 중첩하는(바깥) 함수, 중첩된(안쪽) 함수 (클로저)
function countDownMarker(count) {
  return function countDown() { };
}

// #4. 재귀(Recursion)호출 함수 
// : 함수 내에서 자기 자신을 다시 호출 하는 것을 말한다.
// 팩토리얼 (Recursion) = 5 * 4 * 3 * 2 * 1
// 예시: factorial(https://goo.gl/RWXyxz)
function factorial(n) {
  if(n === 0 || n ===1 ) { return 1; }
  else { return n * factorial(n - 1); } 
}
// factorial(5);

// #5. 함수 표현식 - 즉시 실행 함수(IIFE)
(function () {
  // 코드 보호
})();

(function (global, document) {
  //IIFE에 인자 전달 → 내부 매개변수 참조
  // 스코프 체이닝 따른 성능 문제 해결
}) (window, window.document);


// ------------------------------------------------------
// 함수 가이드
// ------------------------------------------------------

// #1. 함수 정의(선언/표현식, `function`, `var`)

// #2. 함수 실행(호출, `()`)

// #3. 함수 결과 반환 or 종료(return)
function square(x){
  if(!x || typeof x !== 'number') { return; } // 종료
  console.log('run square function');
  return Math.pow(x, 2); // 반환
}

// #4. 함수 재귀 (Recursion)
function loop(n) {
  if(n > 15) { return; }
  loop(++n); // loop(11), loop(12), ...
}
// loop(10); // 11, 12, 13, 14, 15, 16

// #5. 함수 스택(Stack)
// LIFO(Last In First Out)
// DevTools > Sources > Call Stack(with Breakpoint) 확인
function foo(i){
  if(i < 0) return;
  console.log('begin: '+ i); // 3, 2, 1, 0
  foo(i - 1) 
  console.log('end :' + i);
}
// foo(3);

// #6. 중첩 함수 (Closure)

// #7. 다중 중첩 함수 (Scope Chaining)

// #8. 함수 실행 주체 참조 (this)
// 함수는 객체의 소유, 객체는 소유한 함수의 주인 (this)

// #9. 전달인자 객체 (arguments, 유사배열(Array-like Object))
// arguments는 오직 함수 내에서만 사용 가능
// 배열과 유사할 뿐 배열과 같은 기능을 수행할 수는 없다.
function sum (){
  for(var total = 0, i = arguments.length, arg; (arg = arguments[--i]);){
    total += arg;
    console.log(arg);
  }
  return total;
}
// 이때 숫자 값이 0만 아니면 모두 true가 된다.
// sum(21, -10, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8);

function myConcat(separator) {
  var result = ""; // 리스트 초기화
  var i ;
  for(i = 1; i < arguments.length; i++){
    result += arguments[i] + separator;
  }
  return result;
}

// myConcat('→ ', 'html', 'css', 'javascript', 'dom')

function lastMove(s) {
  var results = "";
  var i = 1, l = arguments.length;
  for(; i <  l;  i++){
    results += arguments[i] + (i < l - 1 ? s : '');
  }
  return results;
}
// lastMove('->', 'a', 'b', 'c', 'd');

// ------------------------------------------------------
// 함수 객체의 속성과 메서드
// ------------------------------------------------------
function thisISFunction(you) {
  console.log('name →', thisISFunction.name);
  console.log('length →', thisISFunction.length);
  console.log('caller →', thisISFunction.caller);
  console.log('%c----------------------', 'color: #3527d5');
  console.log('arguments.length :', arguments.length);
  console.log('this →', this);
}
function thisfn(x, y, z){
  console.log('this →', this);
  console.log('x →', x);
  console.log('y →', y);
  console.log('z →', z);
}
// 속성 
// function.name, function.length, function.caller(사용을 권장하지 않는다, 함수 이름 재귀 해야)
// thisISFunction( {function_is : 'JavaScript'}, [], {}, true );

//메서드 활용

// #1. 일반적인 함수 호출
// thisfn(10, 20, 30);

// #2. call() 
// 함수 실행 시킬 때 this 첫 번째 인자를 무엇으로 할지 결정.
// thisfn.call(document.body, 10, 20, 30);

// #3. apply ()
// apply() 메소드는 배열을 사용해서 인자값을 전달한다.
thisfn.apply(document.documentElement, [10, 20, 30]);

// #4. ES 5+ - bind ()
// bind () 메소드는 바로 실행되지 않는다. this와 인자만 설정하면 된다.
// var onClickFn = thisfn.bind(document, 10, 20, 30);
// document.addEventListener('click', onClickFn);

/// document.addEventListener('click', thisfn.bind(document, 10, 20, 30));
