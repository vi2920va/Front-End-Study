//--------------------------------------------------------------------------------------
// Weakset 
//--------------------------------------------------------------------------------------
// WeakSet은 Set과 유사합니다만, Set과 달리 객체만 수집할 수 있고 약한 참조가 
// 이루어져 메모리 누수를 예방할 수 있다.
//--------------------------------------------------------------------------------------
// ☆ Weakset ☆
// 1. Set과 달리 WeakSet은 다음의 차이점을 가진다.

// (1) size 속성을 가지지 않는다.
// (2) 객체 타입만 .add()하거나, .delete() 할 수 있다
// (3) forEach, for..in문을 사용해 순환할 수 없다.
// (4) 약한 참조로 메모리 누수 관리에 효과적이다.

// #1. Set VS WeakSet
(() => {
    return;
    // 데이터(객체)
    let arr = [1, 3, 5, 7],
        obj = { key: 'value' };

    // Set 객체 생성
    let set = new Set();

    // WeakSet 객체 생성
    let wset = new WeakSet();

    // 아이템 추가
    set.add(arr).add(obj);
    wset.add(arr).add(obj);

    // 아이템 사이즈
    console.log(set.size);  // 2
    console.log(wset.size); // undefined

    // 객체가 아닌 데이터 추가
    set.add(true);
    // wset.add(true); // 오류 발생: Invalid value used in weak set
    // 아이템 소유 여부 확인
    set.has(obj);  // true
    wset.has(obj); // true

    // 아이템 제거
    set.delete(arr);  // true
    wset.delete(arr); // true

    // 세트 순환
    set.forEach(item => console.log(item));  // 참조된 데이터에 접근 및 사용 가능
    // wset.forEach(item => console.log(item)); // 오류 발생: wset.forEach is not a function

    // 메모리 참조
    let set2 = new Set();
    let wset2 = new WeakSet();
    (() => {

        let o1 = { a: 1 }; // 메모리
        let o2 = { a: 2 }; // 가비지 컬렉터에 의해 메모리 삭제

        set2.add(o1);
        wse2.add(o2)
    });

})();


// #2. Set VS WeakSet
(() => {
    // 자신이 아닌 다른 객체가 내 메서드를 빌려쓰고자 할 때 차단한다.
    
    // Set은 메모리 누수, 가비지 컬렉터를 지우지 않는다 !!

    // WeakSet 어떻게 사용하면 좋을까?
    // 참고: https://goo.gl/lrwPDV

    // WeakSet 객체 생성 - 외부 참조 불가
    let ownClass = new WeakSet();

    // 클래스 OffCanvasMenu 정의 - 외부 참조 가능
    class OffCanvasMenu {

        constructor() {
            // 클래스 자신을 ownClass에 추가
            ownClass.add(this);
            // ...
        }

        toggle() {
            // OffCanvasMenu 객체가 아닌, 
            // 다른 객체가 toggle() 메서드를 사용하려 할 경우 오류 출력
            if (!ownClass.has(this)) {
                throw new TypeError('toggle() 메서드는 OffCanvasMenu 객체만 사용 가능합니다!');
            }
        }
    }
    let ocm = new OffCanvasMenu();
    console.log(ocm);
    // 기본적으로 ocm.toggle 메서드를 사용할 경우 에러를 발생하지 않는다.
    console.log(ocm.toggle());
    // 단, ocm.toggle 메서드를 빌려 쓸 경우 에러가 발생한다.
    // console.log(ocm.toggle.call(document)); // Uncaught TypeError: toggle() 메서드는 OffCanvasMenu 객체만 사용 가능합니다!

})();



