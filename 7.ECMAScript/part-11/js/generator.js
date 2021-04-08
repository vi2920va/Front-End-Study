//-------------------------------------------------------------------------------------
//  Generator 
//-------------------------------------------------------------------------------------
// Generator 객체는 제너레이터 함수(function* () {})로부터 반환된 값이며 이터레이션 
// 프로토콜은 준수한다.

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

//-------------------------------------------------------------------------------------
// ☆ Generator ☆

// #1. Generator & yield
(() => {
    return;
    // 제너레이터 함수
    function* idMaker() {
        let index = 0;
        while (true) {
            yield index++;
        }
    }

    // 제너레이터 객체 참조
    var gen = idMaker(); // "Generator { }"

    // 제너레이터 객체의 next() 메서드 사용
    console.log(gen.next().value); // 0
    console.log(gen.next().value); // 1
    console.log(gen.next().value); // 2

})();

// #2. 사용자 정의 Iterator + Generator
(() => {
    return;
    // 반복 가능한(iterable) 객체
    const o = {
        propA: 'A',
        propB: 'B',
        // 반복 가능한 객체의 조건
        // 제너레이터 함수
        [Symbol.iterator]: function* () {
            // 객체의 속성(key) 집합 정렬 후 변수에 참조
            let keys = Object.keys(this).sort();
            // keys 반복 가능한 객체를 순환
            for (let key of keys) {
                // 제너레이터 객체의 next() 메서드를 사용할 때마다 
                // 제너레이터를 멈추고 값을 반환
                yield key;
            }
        }
    };

    // Iterator 객체 참조
    const o_iterator = o[Symbol.iterator]();

    // Iterator 객체의 next 메서드 사용
    console.log(o_iterator.next()); // { value: 'propA', done: false }
    console.log(o_iterator.next()); // { value: 'propB', done: false }
    console.log(o_iterator.next()); // { value: undefined, done: true }

})();

// #2-1. 사용자 정의 Iterator + Generator
(() => {
    return;
    // 반복 가능한(iterable) 객체
    const o = {
        name: 'Generator',
        use: '[Symbol.iterator] 메서드로 활용',
        // 반복 가능한 객체의 조건
        // 제너레이터 함수
        [Symbol.iterator]: function* () {
            let keys = Object.keys(this).sort();
            for (let v of keys) {
                yield v;
            }
        }
    };

    // Iterator 객체 참조
    const o_gen = o[Symbol.iterator]();

    // Iterator 객체의 next 메서드 사용
    console.log(o_gen.next()); // {value: "name", done: false}
    console.log(o_gen.next()); // {value: "use", done: false}
    console.log(o_gen.next()); // {value: undefined, done: true}

    console.log(o_gen) // o {<closed>}

    // 새로운 변수가 다시 Iterator 객체 참조
    let k = o[Symbol.iterator]();

    console.log(k); // o {<suspended>}

    for (let v of k) {
        console.log(v);
        // name
        // use
    }

})();

// #3. 피보나치 수열 제너레이터
(() => {
    return;
    // 피보나치 수열을 반환하는 제너레이터 함수
    function* fibonacci(n = 1) {

        // current, next 변수 초기화
        let current = 0;
        let next = 1;

        // 조건이 거짓일 때까지 반복
        while (n--) {
            // 제너레이터를 멈춘 후 반환하는 값
            yield current;
            // current, next 업데이트
            [current, next] = [next, current + next];
        }

    }
    // 피보나치 수열 제네레이터 참조
    let fibo5 = fibonacci(5);

    // next() 메서드의 반환 값 출력
    console.log(fibo5.next().value); // 0
    console.log(fibo5.next().value); // 1
    console.log(fibo5.next().value); // 1
    console.log(fibo5.next().value); // 2
    console.log(fibo5.next().value); // 3
    console.log(fibo5.next().value); // undefined

    // 피보나치 수열 값으로 배열 참조 (제네레이터 함수, 비 구조화 할당 사용)
    // [] 내부에서 전개 연산자 (...)를 사용하면 lterator 객체를 순환 처리
    let [...fibo14] = fibonacci(14);

    console.log(fibo14); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]

})();

// #4. 간단한 ID 생성 함수
(() => {
    return;
    function* idMaker(id = 10000, prefix = "id") {
        while (true) {
            yield `${prefix}-${Math.floor(Math.random() * id)}`;
        }
    }

    const ids = idMaker();

    console.log(ids.next().value); // "id-743"
    console.log(ids.next().value); // "id-985"
    console.log(ids.next().value); // "id-5198"
})();

// #5. 고유키 생성 함수
(() => {
    function* uniqueIdMaker(count = 5, limit = 10) {
        const keys = 'abcdefghijklmnopqrstuvwxyz!@#1234567890'.split('');
        function _uid(count) {
            let randomKey = '';
            while (count--) {
                randomKey += keys[Math.floor(Math.random() * keys.length)];
            }
            return randomKey;
        }
        while (limit--) {
            yield _uid(count);
        }
    }

    const uid = uniqueIdMaker(10, 3);

    console.log([...uid]); // ["1rk#8p57ji", "#qwhk6wuwx", "wg5fc06i0e"]

})();