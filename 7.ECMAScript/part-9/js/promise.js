//-------------------------------------------------------------------------------------
// 프로미스 (Promise) 
//-------------------------------------------------------------------------------------
// Promise는 비동기 조작의 최종 완료(Resolve) 또는 실패(Reject)를 나타내는 객체이다. 
// 그리고 Fetch API를 이용하면 요청(Request), 응답(Resposne)와 같은 HTTP의 파이프라인을 
// 구성하는 요소를 조작하는것이 가능하다

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆

// #1. 동기 VS 비동기
/*
  // 동기(Sync) 프로그래밍 : 거듭 제곱 함수
  // 어떤 작업을 요청한 후, 그 작업이 완료되기 전까지 기다렸다가
  // 응답을 받아 처리하는 것을 말한다.
  function exponentiation(x, n) {
    n = n || 2;
    var o = [];
    while (n--) { o.push(x); }
    return o.reduce(function (a, b) { return a * b; });
  }
  // 동기 처리 중
  var expo_six = exponentiation(6, 4);

  // 동기 처리가 끝나면 실행
  console.log(expo_six); // 1296

  // 비동기(Async) 프로그래밍 : 거듭 제곱 함수
  // 어떤 작업을 요청한 후 다른 작업을 수행하다가 이벤트가 발생하면
  // 그에 대한 응답을 받아 처리하는 것을 말한다.
  function exponentiationAsync(x, n, cb) {
    n = n || 2;
    var o = [];
    while (--n) { o.push(x); }
    x = o.reduce(function (a, b) { return a * b; });
    window.setTimeout(cb, 1000, x);
  }
  var expo_six = 0;
  exponentiationAsync(6, 4, function (x) {
    expo_six = x; // 1 초 뒤에 계산된 값이 할당된다.
  });

  //기다리지 않고 바로 수행
  console.log(expo_six); // 0

*/

// #2. 콜백 지옥
/*
  function exponentiationAsync(x, n, cb) {
    n = n || 2;
    var o = [];
    while (n--) { o.push(x); }
    window.setTimeout((cb || function () { }), 1000, x);
  }
  // 2의 3승(거듭제곱) 값을 시작으로 1초 마다
  // 전달 받은 값은 3승(거듭제곱)하여 비동기 처리
  exponentiationAsync(2, 3, function (x) { // 콜
    exponentiationAsync(x, 3, function (x2) { // 백
      exponentiationAsync(x2, 3, function (x3) { // 지
        exponentiationAsync(x3, 3, function (x4) { // 옥
          console.log(x4);
        });
      });
    });
  });
  // 4초 뒤 출력되는 결과
}
*/

//-------------------------------------------------------------------------------------
// ☆ ES6 (Promise) ☆ 

// #1. Promise 인스턴스 생성
/*
(() => {
  return;

  function exponentiationPromise(x, n = 2, time = 1000) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        try {
          let o = Array.from(new Array(n), () => x);
          resolve(o.reduce((a, b) => a * b));
        } catch (e) {
          reject(e);
        }
      }, time);
    });
  }
  // Promise를 사용한 비동기(Async) 프로그래밍
  // 4 초뒤 결과 출력
  exponentiationPromise(2, 3)
    .then(x => exponentiationPromise(x, 3))
    .then(x2 => exponentiationPromise(x2, 3))
    .then(x3 => exponentiationPromise(3, 3))
    .then(x4 => console.log(x4));
})();
*/

// #2. Ajax 유틸리티 함수와 promise 사용
(() => {
  return;
  let api_address = 'https://yamoo9.herokuapp.com/rest/ediya-menu';
  let cors = url => `https://cors-anywhere.herokuapp.com/${url}`;

  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', cors(api_address));
    // 실행 시, 처리되는 함수
    xhr.addEventListener('readystatechange', function () {
      this.readyState === 4 && resolve(this.response);
    });
    // 거절 시, 처리 되는 함수
    xhr.addEventListener('error', function (e) {
      reject(e);
    });
    xhr.send(null);
  });
  promise
    .then(response => JSON.parse(response))
    .then(json => json.filter((data, index) => index < 5))
    .then(data => console.log(data.length));
})();


// #3. es6+ 에서 featch.api가 내장되어 있다.
(() => {
  return;
  // featch는 네트워크를 통해 비동기적으로 리소스를 가져오는 쉽고 논리적인 방법을 제공하는 전역 함수 이다.(promise)반환
  // window.featch()
  fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(data => console.log(data.filter((item, index) => index < 10)))
    .then(error => console.log(error));
})();


// #4. promsie.all() 스태틱 메서드
(() => {
  return;
  // Promise 객체 참조
  let a = new Promise((rs, rj) => {
    // 실행
    window.setTimeout(rs, 1000, 'A');
  });
  let b = new Promise((rs, rj) => {
    window.setTimeout(rs, 2000, 'B');
  });
  // Promise.all() 메서드 활용
  // 모든 promise의 상태가 실행(fulfilled) 되거나 첫 거절(rejection)이 발생할 경우 동작.
  // 병렬 비동기 프로그래밍
  Promise.all([a, b])
    .then(values => console.log(values))
    .catch(e => console.error(`${e} 오류 발생!`)); // B 오류 발생!
})();


// #5. promsie.all() 스태틱 메서드
(() => {
  return;
  let a = new Promise((resolve, reject) => {
    // 실행
    window.setTimeout(() => {
      resolve(fetch('https://randomuser.me/api/?result=2').then(res => res.json()));
    }, 500);
  });

  let b = new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(fetch('https://randomuser.me/api/?result=4').then(res => res.json()));
    }, 4000);
  });
  // Promise.all() 메서드 활용
  // 모든 promise의 상태가 실행(fulfilled) 되거나 첫 거절(rejection)이 발생할 경우 동작.
  // 병렬 비동기 프로그래밍
  Promise.all([a, b]).then(v => console.log(v));
  let count = 0;
  window.setInterval(() => console.log(count++), 1000);

})();

// #6. promsie.race() 스태틱 메서드
(() => {
  return;
  // Promise 객체 참조
  let a = new Promise((rs, rj) => {
    // 실행 (먼저 종료)
    window.setTimeout(rs, 1000, 'A');
  });

  let b = new Promise((rs, rj) => {
    // 거절
    window.setTimeout(rj, 2000, 'B');
  });

  // Promise.race() 메서드 활용
  // 결과가 실행이든, 거절이든 먼저 종료된 쪽의 결과 반환
  Promise.race([a, b])
    .then(values => console.log(values))          // 'A' 출력
    .catch(e => console.error(`${e} 오류 발생!`));
})();


// #7. Promise.resolve() / Promise.reject() 메서드
(() => {
  // 실행(fulfilled)된 Promise 객체를 반환하는 메서드.
  let a = Promise.resolve('fulfilled');

  // 거절(rejected)된 Promise를 객체를 반환하는 메서드.
  let b = Promise.reject('rejected');

  // 전달된 Promise 객체 중, 먼저 처리된 결과를 실행.
  Promise.race([a, b])
    .then(values => console.log(values))         // fulfilled 출력       
    .catch(e => console.error(`${e} 오류 발생!`));
})();