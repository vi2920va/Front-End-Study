// -----------------------------------------------------------------------------------------
// JavaScript - 클로저(Closures)
// -----------------------------------------------------------------------------------------
//
// 클로저 (closure) 란?
// - JavaScript의 매우 강력한 특성으로 독립적인 변수를 참조하는 함수를 말합니다.
//   즉, 클로저에 정의된 함수는 그것이 작성된 환경을 '기억'합니다.

//# 1. 함수가 실행될 때마다 실행 context를 가지고 있으므로 변수를 다시 정의한다.
// 그러므로 아래와 같이 count 변수 함수 안에 선언하지말고 함수 밖에 선언해야 
// 예상하는대로 작동한다. 하지만 전역을 오염시키면 안된다!
// var count = 1;
// function countUp () { 
//   var count = 1;
//   return count++;
// }
// countUp();

// #2. myFunc 변수에 displayName을 return한다. return된 displayName 함수를 실행(name 변수에 접근)
// 즉, 유효범위의 어휘적 환경을 유지한다. 
// function makeFunc() {
//   var name = 'Mozilla';
//   function displayName() {
//     console.log(name);
//   }
//   return displayName;
// }
// var myFunc = makeFunc();
// myFunc();

function numberGenerator() {

  // 함수 영역 내 선언된 지역 변수
  var num = 1;

  // 함수 영역 내 선언된 지역 함수
  function updateNumber() {
    console.log(num++);
  }

  // 지역 함수를 반환(return)
  return updateNumber;
}

// numberGenerator() 함수에서 반환된 
// updateNumber 함수를 변수 number에 참조한다.

// 즉, updateNumber()함수를 외부에 있는 number 변수에게 전달했다.
var number = numberGenerator();

// number는 함수 참조로 실행할 때마다 결과가 출력된다.
for (var i = 0; i < 10; ++i) {
  number();
}


// 모든 함수에는 실행 컨텍스트가 있습니다. 실행 컨텍스트는 해당 함수 내의 변수와 
// 해당 부모 환경에 대한 참조를 의미하는 환경으로 구성됩니다. 상위 환경에 대한 참조는 
// 내부 함수가 작성된 범위 외부 또는 내부에서 호출되는지 여부에 관계없이 상위 범위의 
// 모든 변수를 모든 내부 함수에 사용할 수 있게 합니다.
//
// 따라서 함수가 사실상 환경(해당 환경에 정의된 변수)에 대한 참조를 가지고 있기 때문에 
// 함수가 이 환경(또는 영역(scope))을 "기억"하는 것처럼 보입니다!
//
// 모든 실행 컨텍스트에는 어휘 환경(Lexical Environment)이 있습니다. 
// 이 어휘 환경은 식별자 바인딩(즉, 변수 및 관련 값)을 보유하고 있으며 
// 외부 환경에 대한 참조도 가지고 있습니다.
// 
// 각 환경이 접근 할 수 있는 일련의 식별자를 "범위(Scope)"라고 합니다. 
// 이러한 범위를 "스코프 체인(Scope Chain)"을 통해 계층적 환경 체인에 
// 중첩 할 수 있습니다.



// -----------------------------------------------------------------------------------------
// 실행 컨텍스트(Execution Contenxt)
// -----------------------------------------------------------------------------------------
//
// ECMAScript 사양에서 코드의 런타임 평가를 추적하는 데 사용되는 추상개념 입니다. 
// 이것은 코드가 처음 실행되거나 실행 흐름이 함수 본문에 들어갈 때 전역 컨텍스트 일 수 있습니다.

// 글로벌 실행 컨텍스트 (Global Execution Context)
var x = 9;

// 함수 실행 컨텍스트 (outerFn: Execution Context)
function outerFn() {
  var y = 12;

  // 함수 실행 컨텍스트 (innerFn: Execution Context)
  function innerFn() {
    var z = 6;
    return x + y + z;
  }

  return innerFn;
}

// 어느 시점이든 하나의 실행 컨텍스트만 실행 될 수 있습니다.
// 이것이 JavaScript가 "단일 스레드"인 이유입니다.

// 멀티데스크 환경에서 OS가 프로그램을 평행 처리 할 때 효율적인 처리를
// 실현하기 위해 처리를 분할하는데, 그 단위를 스레드 라고 한다. 

// 즉, 한 번에 하나의 명령만 처리 할 수 있습니다. 일반적으로 
// 브라우저는 "스택(Stack)"을 사용하여 이 실행 컨텍스트를 유지 관리합니다. 
// 스택은 LIFO(Last In First Out) 데이터 구조입니다. 
//
// 스택에 푸시(push) 한 마지막 것이 가장 먼저 꺼내집니다. 스택의 
// 맨 위에 요소만 삽입하거나 삭제할 수 있기 때문입니다. 현재 또는 
// "실행 중인" 실행 컨텍스트는 항상 스택의 맨 위에 있는 항목입니다. 
//
// 실행 중인 실행 컨텍스트의 코드가 완전히 평가되면 최상위 항목이 
// 팝(pop) 된 다음 실행 항목이 실행 컨텍스트를 실행하는 것으로 
// 간주됩니다.
//
// 또한 실행 컨텍스트가 실행되고 있다고 해서 다른 실행 컨텍스트를 
// 실행하기 전에 실행이 완료되어야한다는 것을 의미하지는 않습니다. 
// 실행 중인 실행 컨텍스트가 일시 중단되고 다른 실행 컨텍스트가 
// 실행 중인 실행 컨텍스트가되는 경우가 있습니다. 
// 
// 일시중단 된 실행 컨텍스트는 나중에 중단 된 부분을 선택합니다. 
// 한 실행 컨텍스트가 이와 같이 다른 컨텍스트로 대체 될 때마다 
// 새 실행 컨텍스트가 만들어져 스택에 푸시되고 현재 실행 컨텍스트가 됩니다.

// [ 실행 컨텍스트 N + 3  ] ⬅︎ 현재 실행 컨텍스트 
// [ 실행 컨텍스트 N + 2  ] 
// [ 실행 컨텍스트 N + 1  ] 
// [ 실행 컨텍스트 N      ] 
// [ 실행 컨텍스트        ] // 글로벌

var x = 10;

function foo(a) { // a : 5
  var b = 20;

  function bar(c) { // c : 15
    var d = 30;
    return boop(x + a + b + c + d);
  }

  function boop(e) {
    return e * -1;
  }

  return bar;

}

var moar = foo(5); // 클로저(Closure)

moar(15); // c 값으로 전달


// -------------------------------------------------------

/*

  // 글로벌 실행 컨텍스트 환경
  GlobalEnvironment = {
    // 환경 레코드
    EnvironmentRecord: {
      // 내장(built-in) 식별자(identifiers)
      Array: '<func>',
      Object: '<func>',
      // 기타(etc)..

      // 사용자 정의 식별자
      x: 10
    },
    // 외부 참조
    outer: null
  };

  // foo: 실행 컨텍스트 환경
  fooEnvironment = {
    // 환경 레코드
    EnvironmentRecord: {
      // 사용자 정의 식별자
      y: 20,
      bar: '<func>'
    }
    // 외부 참조
    outer: GlobalEnvironment
  };

  // bar: 실행 컨텍스트 환경
  barEnvironment = {
    // 환경 레코드
    EnvironmentRecord: {
      // 사용자 정의 식별자
      z: 15
    }
    // 외부 참조
    outer: fooEnvironment
  };

*/


// -------------------------------------------------------
// 실용적인 클로저 활용
// -------------------------------------------------------

// 프론트엔드 개발 시, 반복문을 사용해 이벤트 핸들러를 바인딩하는 과정에서
// 결과는 예측과 다를 수 있습니다. 이 문제를 클로저를 통해 해결해봅시다.
//
// 이어서 ES6+ 환경에서 블록 스코프(Block Scope)를 사용해 문제를 
// 해결하는 방법을 공부해봅니다.

// 현재 i는 전역변수 6 이다. 전역 실행 컨텍스테 i는 6 이라고 저장되었다.
// 결론은 반복문 내에 함수를 집어넣어서 하는 코드는 올바르지 않다.

// # 1. 반복문 내에 함수코드를 집어넣는 것은 생각했던 대로 올바르게 작동하지 않는다.
/*
var nav_links = els('.app-navigation a');
var i = 0; // 0 ~ 5
var l = nav_links.length; // 6
 for (; i < l; ++i) { 
  nav_links[i].addEventListener('click', function (e) {
    e.preventDefault();
     console.log(i); // 스코프 체이닝 의해서 상위영역으로 가서 i는 6으로 나온다.
   });
 }
*/

// #2. 함수를 두 번 사용해서 실행한다.
/*
var nav_links = els('.app-navigation a');
var i = 0; // 0 ~ 5
var l = nav_links.length; // 6

function generateNavLinks(index) { // (3) generateNavLinks() 함수는 실행이 되면서 던진 i 값을 받는다.

  function onNavLink(e) { // (4) 그리고 onNavLink() 함수를 반환한다.
    e.preventDefault();
    console.log(index);
  }

  return onNavLink; // (5) 반환된 함수는 clickEvent 함수에 연결이 된다.
}

for (; i < l; ++i) {
  // (1) generateNavLinks() 함수는 사용자가 click 할 때 실행되는 게 아니라 바로 실행한다.
  // (2) 실행이 되면서 i가 0 ~ 5 까지 순환하고 그때마다 i 값을 전달한다
  //  즉, 내부 links에 실행될 함수에 i 값을 던진다. 
  // (6) generateNavLinks 외부함수 영역에서 onNavLink 내부함수를 바로 내보냈다.
  // (7) 바로 내보내진 함수는 자신이 거주하고 있던 공간에 대한 기억을 하고 있다 - 클로저
  // (8) nav_links[0]을 click 했을 때 실행된 함수는 generateNavLinks가 아니고 
  // 반환된 onNavLink()라는 함수가 되는 것이다.
  nav_links[i].addEventListener('click', generateNavLinks(i));
}
*/

// #3. IIFE 패턴 사용해서 클로저를 사용할 수 있다.
/*
var nav_links = els('.app-navigation a');
var i = 0; // 0 ~ 5
var l = nav_links.length; // 6

for (; i < l; ++i) {
  nav_links[i].addEventListener('click', (function (index) {
    return function (e) {
      e.preventDefault();
      console.log(index);
    }
  })(i));
}
*/

// #4. Function.prototype.bind - ES5 방법 (실무에서는 배열과 join 할 때 사용할 수 있다.)
// 아래의 코드는 내부에 반복문이 수행되면서 즉시 실행함수가 실행되기는 했지만
// 그것은 어차피 메모리에 남지않고 한 번 실행되고 끝난다.
// 하지만 내부에  onNavLink() 함수는 총 6번이 순환하는데 그때마다
// 함수를 재정의 하는게 아니라  정의된 함수를 가져다가 사용해서 효율성을 높인다.

/*
var nav_links = els('.app-navigation a');
var i = 0; // 0 ~ 5
var l = nav_links.length; // 6

function onNavLink(i, e) {
  e.preventDefault();
  console.log(i ,this);

}

for (; i < l; ++i) {

  var link = nav_links[i];

  link.addEventListener('click', (function (index) {
    return onNavLink.bind(link, index);

  })(i));
}
*/

// #5. ES5 까지는 for문에 scope를 주지 못했다. 하지만 ES6 부터는 사용 가능하다.
// var 대신 let를 사용하면 된다.

var nav_links = els('.app-navigation a');
var i = 0; 
var l = nav_links.length; 

function onNavLink(i, e) {
  e.preventDefault();
  console.log(i, this);

}

// ES6
for (let i = 0, l = nav_links.length; i < l; ++i) {
  nav_links[i].addEventListener('click', function (e) {

    e.preventDefault();

    console.log(i); // i는 let i를 찾는다.

  });

}