//-------------------------------------------------------------------------------------
// 확장된 배열 객체 능력(Array Additions) 
//-------------------------------------------------------------------------------------
// 배열 객체에 새롭게 추가된 클래스 또는 스태틱(static),  인스턴스 메서드 정리.

// (1) 배열 스태틱 메서드(Array Static Methohds)
// 배열 생성자 메서드를 사용해 배열 또는 배열과 유사한 객체를 손쉽게 활용.

// (1-1) Array.from : 유사 배열을 배열로 손쉽게 변경. 
// (1-2) Array.of : 내부에 item을 받을 수 있다.
//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 

// #1. 유사배열을 배열로 변경
(() => {
  return;
  // DOM  객체 수집(Collection) = NodeList
  // lis 변수에 참조된 값은 length 속성을 가진 유사 배열 객체
  var lis = document.querySelectorAll('ul.demo li');

  // 유틸리티 함수
  function makeArray(o) {
    return Array.prototype.slice.call(o);
  }
  //유틸리티 함수 makeArray()를 사용하여 lis 유사 배열을 배열로 변경
  makeArray(lis).forEach(function (li) {
    console.log(li); // <li> 순환
  });

})();

// #2. Array 객체의 map 메서드를 빌려써서 원소 데이터를 빼낸 다음 가공...
(() => {
  return;
  // DOM  객체 수집(Collection) = NodeList
  // lis 변수에 참조된 값은 length 속성을 가진 유사 배열 객체
  var links = document.querySelectorAll('ul.demo a');

  // Array 객체의 .map 메서드를 빌려 links에 사용
  var links_content = Array.prototype.map.call(links, function (link) {
    return link.texContent;
  });

})();

// #3. 0 부터 100 까지 채운 배열이 필요할 경우 
(() => {
  return;

  var array_101 = [];
  for (var i = 0, l = 100; i <= l; ++i) {
    array_101[i] = i;
  }
  console.log(array_101); // [0, 1, 2, ... 100]
})();

// #4. 배열을 생성 할 때 new Array 보다 리터럴 방식을 권장하는 이유
(() => {
  return;
  // new Array() 구문에 첫 번째 인자로 숫자를 사용할 경우
  // 기대와 다른 결과를 확인할 수 있다.
  var dataList = new Array(3); // [undefined, undefined, undefined]

  console.log(dataList.length); // 3

  // 첫 번째 인자로 소수점을 포함하는 숫자를 전달할 경우 오류가 발생한다.
  // new Array ()에 첫번쨰로 전달된 숫자를 포함하는 아이템 개수로 설정하기 때문.
  // var dataList = new Array(2.1); // Uncaught RangeError: Invalid array length

  // Array 리터럴을 사용할 경우
  // 기대와 같은 결과를 확인 할 수 있어.
  // 대부분의 경우 리터털 사용을 권장한다.
  var dataList = [3];
  console.log(dataList.length); // 1

  // Array.length 9 문제를 해결하기 위해 리터럴 사용
  var arr = new Array(9);
  console.log(arr.length); //9
})();

// #5. 객체 인스턴스 for, forEach, find
(() => {
  return;
  var numbers = [100, 105, 103, 109];
  //  for문
  for (var i = 0, l = numbers.length; i < l; i++) {
    console.log(i, numbers[i]);
  }
  // forEach 문
  numbers.forEach(function (n, i) {
    console.log(i, n)
  });

  // find 배열 아이템을 찾는 유틸리티 함수
  function findItemArray(array, cb) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (cb(array[i], i, array)) { return array[i]; }
    }
  }

  // 유틸리티 함수를 사용해 조건에 부합하는 첫 번째 아이템 반환
  var item = findItemArray(numbers, function (item, index, array) {
    return item > 100 && item < 105;
  });

  console.log(item); // 103

  // 배열 아이템 인덱스를 찾는 유틸리티 함수
  function findItemIndexArray(array, cd) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (cd(array[i], i, array)) { return i; }
    }
    return -1;
  }

  // 유틸리티 함수를 사용해 조건에 부합하는 첫 번쨰 아이템 인덱스를 반환
  var item = findItemIndexArray(numbers, function (item) {
    return item > 105;
  });

  console.log(item); // 3

  // 배열 아이템이 포함 되었는지 확인하는 유틸리티 함수
  function isInCludItemArray(array, item) {
    return array.indexOf(item) > -1;
  }
  // 유틸리티 함수를 사용해 아이템이 포함 되었는지 유무 확인
  if (!isInCludItemArray(numbers, 107)) {
    numbers.push(107);
  }
  console.log(numbers); // [100, 105, 103, 109, 107] 
})();

// #5-1. 배열 유틸리티 함수
(() => {
  return;
  var numbers = [100, 105, 103, 109];

  // 배열을 모두 동일하게 채우는 유틸리티 함수
  function fillItemArray(array, item, start, end) {
    start = start || 0;
    end = end || array.length;
    return array.map(function (t, i) {
      if (i >= start && i < end) {
        return item;
      } else {
        return t;
      }
    });
  }

  // 유틸리티 함수를 사용해 배열 아이템을 모두 교체
  fillItemArray(numbers, {}); // [{}, {}, {}, {}]

  // 유틸리티 함수에 start, end 인자를 전달하면 
  // 조건에 부합하는 아이템만 교체
  fillItemArray(numbers, {}, 1, 3); // [100, {}, {}, 109]

})();

//-------------------------------------------------------------------------------------
// ☆ ES6 - 확장된 배열 객체 능력 (Array Additions)☆

// #1. Array.from() 스태틱 메서드 활용.
(() => {
  return;
  // (1) DOM  객체 수집(Collection) = NodeList
  // lis 변수에 참조된 값은 length 속성을 가진 유사 배열 객체
  let lis = document.querySelectorAll('ul.demo li');

  // (1-1) Array.from() 네이티브 Array 메서드를 사용하여 lis 유사 배열을 배열로 변경
  Array.from(lis).forEach(li => console.log(li));

  // (3) HTMl 모든 요소 수집 - NodeList(hoad, body)
  let children = document.querySelectorAll('html > *');

  // (3-1) 전개연산자(...)를 사용할 수 있다.
  // let children_arr = [...children]
  // console.log(Array.isArray(children_arr)); 

  // (3-2) 또는 Array.from를 사용해서 클래스를 추가.
  Array.from(children).forEach(el => el.classList.add('html-children'));

  // (3-3) class 값을 가져와서 새롭게 배열을 만든다.
  let children_class_names = Array.from(children).map(el => el.className);
  console.log(children_class_names);

  // (4) 0 부터 100 까지 채운 배열이 필요할 경우
  // Array.from(arrayLike, mapFunc?, thisArg?)
  const array_101 = Array.from(new Array(101), (x, i) => i);
  console.log(array_101); // [0, 1, 2, ... 100]
})();

// #2. Array.of() 스태틱 메서드 활용
(() => {
  return;
  // (1) Array.of(...items) 메서드를 사용할 경우
  // new Array() 구문에서 살펴본 기대 밖의 결과를 비켜갈 수 있다.
  const data = Array.of(3); // [3]

  console.log(data.length); // 1

  // (1-2)Array.of(item1, item2, ..., itemN)
  // HTML 자식 요소(Childen) 수집 배열
  let html_children = Array.of(document.body, document.head);

  for (let child of html_children) {
    console.log(child); //<head></head><body></body>
  }

  // (1-3)Array.of 를 사용하면 length 값이 올바르게 출력
  const arr = Array.of(9);
  console.log(arr.length) // 1

})();

// #3. keys & values & entries & find & findindex 배열 객체 인스턴스 메서드
(() => {
  return;
  var numbers = [100, 105, 103, 109];

  // (1) for ~ of문 + Array.prototype.keys
  for (let index of numbers.keys()) {
    console.log(index);
  }
  // (2) for ~ of문 + Array.prototype.values
  for (let value of numbers.values()) {
    console.log(value);
  }
  // (3) for ~ of문 + Array.prototype.entries 
  for (let [index, value] of numbers.entries()) {
    console.log(index, value);
  }


  // (4) fibo 함수
  function* fibo(n) {
    let cur = 0, nex = 1;
    while (n--) {
      yield cur;
      [cur, nex] = [nex, cur + nex];
    }
  }
  let f7 = fibo(7);
  let a7 = Array.from(f7);
  // (4-1)
  for (let key of a7.keys()) {
    console.log(key);
  }
  // (4-2)
  for (let value of a7.values()) {
    console.log(value);
  }
  // (4-3)
  for (let [index, value] of a7.entries()) {
    console.log(index, value);
  }

  //(4-4) Array.prototype.entries 
  // Array.from  대신 전개 연산자(...)를 사용해도 된다.
  console.log(...a7.entries()); // [0, 0] [1, 1] 2 차원 배열

  // (5) Array.prototype.find 메서드 사용
  var item = numbers.find(item => item > 100 && item < 105);
  console.log(item);

  // (6) Array.prototype.findIndex 메서드 사용
  var item = numbers.findIndex(item => item > 105);
  console.log(item);

})();

// #4. indexOf VS findIndex
(() => {
  return;
  // (1) ES5 Array.prototype.indexOf 
  console.log([false, 10, NaN, {}].indexOf(10)); // 1

  // (1-2) indexOf 는 내부에 콜백함수가 존재하는게 아니라 값을 비교 한다.
  // === 비교, 
  // NaN === NaN // false
  console.log([false, 10, NaN, {}].indexOf(NaN)); // -1

  // (2) ES6 Array.prototype.findIndex
  console.log([false, 10, NaN, {}].findIndex(x => x === 10)); // 1

  // (2-1) Object.is () 비교
  // Object.is(NaN, NaN) // true
  console.log([false, 10, NaN, {}].findIndex(x => Object.is(x, NaN))); // 2

})();

// #5. includes & fill  배열 객체 인스턴스 메서드
(() => {
  return;
  var numbers = [100, 105, 103, 109];

  // (1) Array.prototype.includes 메서드 사용해 아이템이 포함되었는지 유무 확인
  if (!numbers.includes(107)) {
    numbers.push(107);
  }

  // (2) Array.prototype.fill 메서드 사용해 배열 아이템 모두 교체
  numbers.fill({}); // [{}, {}, {}, {}, {}]

  //(2-1) Array.prototype.fill 메서드 사용해 배열 아이템을 부분 교체
  numbers.fill({}, 1, 3); // [100, {…}, {…}, 109, 107]

  // (3) Array.from 메서드 활용

  // (3-1) 모두 교체
  numbers = Array.from(numbers, x => { });

  // (3-2) 부분 교체
  let start = 1, end = 3;
  numbers = Array.from(numbers, (x, i) => {
    if (i > start && i < end) {
      return {};
    } else {
      return x;
    }
  });

})();

// #6. copyWithin 배열 객체 인스턴스 메서드
(() => {
  return;
  var numbers = [100, 105, 103, 109];

  // (1) Array.prototype.copyWithin(target, start = 0, end = this.length)
  
  // 0 부터 (4-1)까지 아이템을 복사한 후, 1 위치부터 붙여넣음
  // numbers.copyWithin(1); // target : 1, start: 0, end : 4, 결과 : [100, 100, 105, 103]

  // 0 부터 (4-1)까지 아이템을 복사한 후, -2 (끝에서 2번째) 위치부터 붙여넣음
  // numbers.copyWithin(-2);  // target : -2, start : 0, end : 4, 결과 : [100, 105, 100, 105]

  // 2 부터 (4-1)까지 아이템을 복사한 후, 1 위치부터 붙여넣음
  // numbers.copyWithin(1, 2); // target : 1, start : 2, end :4, 결과 : [100, 103, 109, 109]

  // 1 부터 (2-1)까지 아이템을 복사한 후, 2 위치부터 붙여넣음
  // numbers.copyWithin(2, 1, 2); // target : 2,  start : 1, end :2, 결과 : [100, 105, 105, 109]

  // -2 부터 -3 까지 아이템을 복사한 후, -3 (끝에서 3번쨰) 위치부터 붙여넣음
  numbers.copyWithin(-3, -2); // target : -3, start : -2, end : 4, 결과 : [100, 103, 109, 109]

})();

