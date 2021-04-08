//-------------------------------------------------------------------------------------
// for .. of 문(statement)
//-------------------------------------------------------------------------------------
// for .. of 문(statement)은 반복가능한 객체 (Array, Map, Set, String, TypedArray, 
// arguments 객체 등을 포함)에 대해서 반복하고 각 개별 속성값에 대해 실행되는 문이 
// 있는 사용자 정의 반복 후크를 호출하는 루프를 생성한다.
//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆
// #1. ES5 에서는 자주 사용되는 반복문 for, for~in, forEach문
(() => {
  return;
  // 배열
  var sports_shoes = ['조깅화', '축구화', '농구화'];

  // for문
  for (var i = 0, l = sports_shoes.length; i < l; i++) {
    if (sports_shoes[i] === '축구화') { continue; }
    console.log(sports_shoes[i]);
  }

  // for~in문 (주의! 느림, 배열이 아닌 객체 순환 용도)
  for (var i in sports_shoes) {
    if (sports_shoes[i] === '축구화') { break; }
    console.log(sports_shoes[i]);
  }

  // forEach문 (주의! 기본적으로 배열만 활용 가능)
  sports_shoes.forEach(function (shoes, index) {
    // 문법 오류: forEach문은 break, continue 사용 X
    // if ( shoes === '축구화' ) { continue; }
    console.log(sports_shoes[i]);
  });

})();
//-------------------------------------------------------------------------------------
// ☆ for ~ of문 ☆
// : 반복 가능한 객체(배열, 유사 배열, 문자열, 맵, 세트 등)
let sports_shoes = ['조깅화', '축구화', '농구화'];

let string = 'this is string literal';
// #1. 반복 가능한 객체 순환
// for (let char of string) { if (char === 'g') { break; }  console.log(char); }

// #2. 번들링을 사용할 때 주의할 점 (forEach 구문은 break 사용할 수 없다!!)
// : 오류가 발생하면 번들링 되지 않는다. 또한 브라우저에서는 오류를 알려주지 않기 때문에 
// 오류 확인 할 수 있도록 터미널을 열고 작업하도록 권장...
// sports_shoes.forEach(shoes => { if (shoes === '축구화') break; console.log(shoes); });

// #3. break, continue 사용 가능하다. 
// for (let shoes of sports_shoes) { if (shoes === '축구화') { continue; } console.log(shoes); }

// #4. [].entries -> Array Iterator {}
// : 배열 데이터에서 of 문을 사용해 index, item을 활용하고 싶다면 비구조 할당과 entries() 
//   메서드를 같이 사용해야된다. (entries를 사용하지 배열만 직접 쓰게 되면 내부적으로 비구조 할당 할 수 없다.)
for (let [index, item] of sports_shoes.entries()) {
  console.log(`index: ${index}, item: ${item}`);
  // index: 0, item: 조깅화
  // index: 1, item: 축구화
  // index: 2, item: 농구화
}

// #5.  [...arguments].entries() → Array Iterator {}
function loopArguments() {
  let args = [...arguments].entries();
  for (let [i, arg] of args) {
    console.log(`${i} => ${arg}`);
    // 0 => first
    // 1 => []
  }
}
loopArguments('first', []);

// #6. 전개 연산자(...)를 사용할 경우.
// function loopArguments(...args) { for (let [i, arg] of args.entries()) { } }

// #7. for ~ of 사용 시, 주의할 점!
// : 유사 배열 객체는 반복 가능한 객체(Iterator)가 아니다.

// 유사 배열 객체
let like_array_obj = { length: 3, 0: '조깅화', 1: '축구화', 2: '농구화' };
// iterable 과 Iterantion는 다르다 (chapter 11 확인)
// for ~ of 문을 사용할 수 없다. - Uncaught TypeError: like_array_obj is not iterable
// for (let v of like_array_obj) { }

// 유사 배열 객체를 반복 가능한 객체(Iterator)로 변경해야 for ~ of문 사용 가능하다.
// [...] 구문은 사용하면 오류. Array.from() 메서드 사용해야 한다.
for (let v of Array.from(like_array_obj).entries()) {
  console.log(v);
  // [0, "조깅화"]
  // [1, "축구화"]
  // [2, "농구화"]
}

// #8. for ~ of문을 var, let, const와 사용할 때 주의할 점
// 배열 객체
let print_sports_shoesFn = [];

// const, let 동일한 결과
for (const shoes of ['조깅화', '축구화', '농구화']) {
  print_sports_shoesFn.push(() => shoes);
}

console.log(print_sports_shoesFn.map(f => f())); // ["조깅화", "축구화", "농구화"]

console.log(shoes); // ReferenceError: shoes is not defined

// var 를 사용할 경우, 문제 발생.
for (var shoes of ['조깅화', '축구화', '농구화']) {
  print_sports_shoesFn.push(() => shoes);
}

console.log(print_sports_shoesFn.map(f => f())); // ["농구화", "농구화", "농구화"]

console.log(shoes); // 농구화