//--------------------------------------------------------------------------------------
// WeakMap
//--------------------------------------------------------------------------------------
// WeakMap 객체는 Map 객체와 유사하지만, Map 객체와 달리 객체만 수집할 수 있고 약한 참조가 
// 이루어져 메모리 누수를 예방할 수 있다.
//--------------------------------------------------------------------------------------
// ☆ WeakMap ☆

// #1. Map VS WeakMap
(() => {
    return;
    // 데이터(객체)
    let arr = [1, 3, 5, 7],
        obj = { key: 'value' };

    // Map 객체 생성
    let map = new Map();

    // WeakMap 객체 생성
    let wmap = new WeakMap();

    // 아이템 추가
    map.set(arr, 'Array').set(obj, 'Object');
    wmap.set(arr, 'Array').set(obj, 'Object');

    // 아이템 사이즈
    console.log(map.size);  // 2
    console.log(wmap.size); // undefined

    // 객체가 아닌 데이터 추가
    map.set(true, 'yes');
    // wmap.set(true, 'yes'); // 오류 발생: Invalid value used as weak map key

    // 아이템 소유 여부 확인
    console.log(map.has(obj));  // true
    console.log(wmap.has(obj)); // true

    // 아이템 제거
    console.log(map.delete(arr));  // true
    console.log(wmap.delete(arr)); // true

    // 세트 순환
    map.forEach(item => console.log(item));  // 참조된 데이터에 접근 및 사용 가능
    // wmap.forEach(item => console.log(item)); // 오류 발생: wmap.forEach is not a function

    // 메모리 참조
    let map2 = new Map();
    let wmap2 = new WeakMap();

    (() => {

        let o1 = { a: 1 }; // 메모리
        let o2 = { a: 2 }; // 가비지 컬렉터에 의해 메모리 삭제

        map2.set(o1, '가비지 컬렉터에 의해 제거되지 않음');
        wmap2.set(o2, '가비지 컬렉터에 의해 제거됨');
        console.log(o1, map2);
        console.log(o2, wmap2);


    })();

})();


// #2. Map VS WeakMap
(() => {
    return;
    // WeakMap 어떻게 사용하면 좋을까?

    // 비공개 속성을 관리하기 위한 WeakMap 객체 생성
    let _ = new WeakMap();

    // 클래스 OffCanvasMenu 정의
    class OffCanvasMenu {

        constructor(el, options) {
            // WeakMap 객체를 사용해 비공개 속성 설정
            _.set(this, { el, options });
            // ...
        }

        toggle() {
            // 비공개 속성에 접근 가능한 $ 변수 참조
            let $ = _.get(this);
            // 비공개 속성 el에 접근하여 조작
            $.el.classList.toggle('is-active');
        }
    }
    let o = new OffCanvasMenu();
    console.log(o);

    // class 2
    let _age = new WeakMap();

    class Person {
        constructor(age) {
            _age.set(this, age);
        }
        incrementAge() {
            let age = _age.get(this) + 1;
            _age.set(this, age);
            if (age > 50) {
                console.log('반 백년을 살았구나!~');
            }
        }
    }
    // 비공개 데이터를 저장하기 위해 WeakMap을 사용해서 
    // 좋은 점은 Reflect.ownKeys()를 사용해도 멤버 이름이 들어나지 않는다는 점이다.
    const person = new Person(50);
    console.log(person.incrementAge()); // '반 백년을 살았구나~!'
    console.log(Reflect.ownKeys(person)); // []

})();


// #2. Symbol을 사용해 비공개 멤버를 만든 경우 단점
(() => {
    return;
    // 반면 Symbol을 사용해 비공개 멤버를 만든 경우, Reflect.ownKeys() 사용 시 멤버 이름이 들어난다.
    const _age = Symbol();

    class Person2 {
        constructor(age) {
            this[_age] = age;
        }
        getAge() {
            return this[_age];
        }
    }

    const person2 = new Person2(52);

    console.log(Reflect.ownKeys(person2)); // [Symbol()]

})();


