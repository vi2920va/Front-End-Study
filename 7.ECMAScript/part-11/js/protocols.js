//-------------------------------------------------------------------------------------
//  protocols 표현법
//-------------------------------------------------------------------------------------
// ES6+ 에서는 새로운 문법이나 built-in 뿐만 아니라, prototcols(표현법들)도 추가 되었다.
// protocol은 일정 규칙만 충족한다면 어떠한 객체에 의해서도 구현될 수 있다. 
// 2 개의 protocol이 이 있다 iterable protocol 과 iterator protocol.
//-------------------------------------------------------------------------------------
// ☆ iterable protocol ☆
// : iterable protocol은 javascript 객체들이, 예를 들어 for ~ of 구조에서 어떠한 value 들이
//   loop 되는 것과 같은 iterable 동작을 정의하거나 사용자 정의하는 것을 허용한다.

//  1. iterable protocol 조건
// (1) [Symbol.iterator].key 속성을 가져야 한다.
// (2) Object를 반환하는, arguments 없는 function
// (3) iterator protocol을 따른다.

// 2. 내장된 iterables
// : String, Array, TypedArray, Map, Set 모두 내장된 iterable 이다. 이 객체들의 프로토 타입 
//   객체들은 모두 @@itertor 메서드를 가지고 있기 때문이다.

// #1. iterator 메서드 구현 & 사용자 정의 iterable
(() => {
  return;
  // (1) iterator 메소드를 구현
  var o = {};

  o[Symbol.iterator] = function () {
    let i = 0;
    return {
      next() {
        return { done: false, value: i++ }
      }
    }
  };

  // 사용자가 @@iterator 메서드를 정의 하지 않으면 오류가 발생한다.
  console.log('o iterator method :', o); // 출력: {Symbol(Symbol.iterator): ƒ}
  console.log(o[Symbol.iterator]()); // 출력: {next: ƒ}

  var o_iterator = o[Symbol.iterator]();
  console.log(o_iterator); // 출력: {next: ƒ}
  console.log(o_iterator.next()); // 출력: {done: false, value: 0}
  console.log(o_iterator.next()); // 출력: {done: false, value: 1}

  // (2) 사용자 정의 iterable
  const star4 = {
    [Symbol.iterator]() {
      let _star = Symbol('_star');
      return {
        [_star]: '',
        next() {
          if (this[_star].length < 4) {
            this[_star] += '*';
            return {
              value: this[_star],
              done: false
            };
          } else {
            return { done: true };
          }
        }
      }
    }
  };
  // 검토
  console.log(star4[Symbol.iterator]()); // 출력: {next: ƒ, Symbol(_star): ""}

  console.log([...star4]); // 출력: ["*", "**", "***", "****"]

  for (let star of star4) {
    console.log(star);
    // 출력:
    // *
    // **
    // ***
    // ****
  }

})();

// #2. Iterable과 함께 사용되는 문법
(() => {
  return;
  // (1) for ~ of
  for (let value of ['a', 'b', 'c']) {
    console.log('value :', value);
    // 출력:
    // 'a'
    // 'b'
    // 'c'
  }

  console.log([..."abc"]); // 출력: ["a", "b", "c"]

  function* gen() {
    yield* ["a", "b", "c"];
  }
  console.log(gen().next()); // 출력 : { value:"a", done:false } 

  [a, b, c] = new Set(["a", "b", "c"]);
  console.log(a); // 출력 : a

})();

// #3. 잘 정의되지 못한 iterables
(() => {
  return;
  // iterator 메서드가 iterator 객체를 반환하지 못하면 그것은 잘못된 iterable 이다. 
  // 이러한 코드는 런타임 오류 또는 예상치 못한 결과를 불러온다. 
  var nonWellFormedIterable = {};
  nonWellFormedIterable[Symbol.iterator] = () => 1
  // TypeError : [] is not a function
  // console.log([...nonWellFormedIterable]);

})();
//-------------------------------------------------------------------------------------
// ☆ iterator  protocol ☆
// : iterator protocol은 value( finite 또는 infinite) 들의 sequence 를 만드는 표준 
//   방법을 정의한다.

//  1. iterator protocol 조건
// (1) 인자를 받지 않는 next() 메서드를 소유해야 한다.
// (2) next() 메서드를 반환 값은 객체로 value, done 속성을 소유해야 한다.
// (3) done 반복이 종료될 경우 true, 종료되지 않을 경우 false 여야 한다.
// (4) value는 javaScript의 모든 데이터 타입 설정이 가능하다.

// 2. 몇몇 iterator들은 iterable(반복 가능)이다.
var someArray = [1, 5, 7];
var someArrayEntries = someArray.entries();

// console.log(someArrayEntries.toString()); // [object Array Iterator]
// console.log(someArrayEntries === someArrayEntries[Symbol.iterator]()); //true

// #1.String은 built-in iterable 객체 & 사용자 정의 iterator
(() => {
  return;
  var someString = 'hi';
  console.log(typeof someString[Symbol.iterator]); // function

  //(1) String의 기본 iterator 는 String 의 문자를 하나씩 반환.
  var itertor = someString[Symbol.iterator]();
  console.log(itertor + ""); // 출력: [object String Iterator]

  console.log(itertor.next()); // 출력: { value: "h", done: false }
  console.log(itertor.next()); // 출력: { value: "i", done: false }
  console.log(itertor.next()); // 출력 : { value: undefined, done: true }

  // (2)전개연산자와 같은 특정 내장 구조(built-in constructs)들은 실제로는 동일한 iteration protocol을 사용
  console.log([...someString]); // 출력: ["h", "i"]

  // (3)사용자 정의 iterator
  var helloString = new String('hello');

  helloString[Symbol.iterator] = function () {
    return {
      next: function () {
        if (this._first) {
          this._first = false;
          return { value: 'bye', done: false };
        } else {
          return { done: true };
        }
      },
      _first: true
    };
  };

  console.log([...helloString]); // 출력: ["bye"]
  console.log(helloString + ""); // 출력: hello

})();

// #2. 사용자 정의 Iterator 객체
(() => {

  function iteratorMaker(array) {
    let index = 0;
    return {
      next() {
        if (index < array.length) {
          return { done: false, value: array[index++] };
        } else {
          return { done: true };
        }
      }
    }
  }

  // 검토
  const protocols = iteratorMaker(['iteration', 'iterable', 'iterator']);
  console.log(protocols); // 출력: {next: ƒ}
  console.log(protocols.next()); // 출력: {done: false, value: "iteration"}
  console.log(protocols.next()); // 출력: {done: false, value: "iterable"}
  console.log(protocols.next()); // 출력: {done: false, value: "iterator"}
  console.log(protocols.next()); // 출력: {done: true}

})();

