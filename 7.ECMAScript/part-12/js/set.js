//--------------------------------------------------------------------------------------
// Set 
//--------------------------------------------------------------------------------------
// Set 객체는 값 콜렉션(Collections)으로 삽입된 순서대로 요소들을 반복(iterate) 할 수 있다.
//--------------------------------------------------------------------------------------
// ☆ Set ☆

//  1. Set 객체의 속성
// (1) Set 객체는 값 콜렉션(Collections)으로 삽입된 순서대로 요소들을 반복(iterate) 할 수 있다.
// (2) Set 객체의 속성 `.size`는 아이템 개수를 반환한다.
// (3) Array 객체와 달리 Set 객체는 동일한 아이템을 포함하지 않는다. 즉, 저장한 데이터는 
//     유일무이(唯一無二)한 데이터입니다.
// (4) Array 객체에 포함된 'modules' 문자열 원시 값은 동일한 값으로 단 하나의 값만 저장된다.
// (5) Set 객체를 사용하면 Array 객체의 아이템 중, 중복되는 것을 제거하는데 용이하다.
// (6) Array 객체와 달리 Set[index] 방법으로는 아이템에 접근할 수 없다.

// #1. Array VS Set 
(() => {
    return;
    // 배열(Array)
    const features = ['modules', 'arrow function', 'let, const', 'rest parameter', 'modules'];
    console.log(features.length, features[0]); // 5, 'modules'

    // 세트(Set) : new Set([iterable]);
    const features_set = new Set(features);
    console.log(features_set.size, features_set[0]); // 4 undefined

})();

// #2. Set.prototype
(() => {
    return;
    // Set.prototype 객체
    console.dir(Set.prototype);
    // .constructor
    // .size
    // .add()
    // .has()
    // .delete()
    // .clear()
    // .forEach()
    // .entries()
    // .keys()
    // .values()

})();


// #3. .size() & .add () & .has() 
(() => {
    return;
    // Set 객체 생성
    const phones = new Set(); // Set(0) {}

    // 아이템 추가
    phones.add('iPhoneX');        // Set(1) {"iPhoneX"}
    phones.add('Gallaxy Note 8'); // Set(2) {"iPhoneX", "Gallaxy Note 8"}
    phones.add('V30');            // Set(3) {"iPhoneX", "Gallaxy Note 8", "V30"}

    // 저장된 아이템 개수 출력
    console.log(phones.size); // 3

    // 아이템 소유 여부 확인
    console.log(phones.has('V30')); // true
    console.log(phones.has('Window Phone')); // false

    // 'Mi5' 아이템이 phones 세트에 저장되어 있지 않다면 ? 
    if (!phones.has('Mi5')) {
        // phones 세트에 'Mi5' 아이템을 저장
        phones.add('Mi5'); //  Set(4) {"iPhoneX", "Gallaxy Note 8", "V30", "Mi5"}
        console.log(phones.size); // 4
    }

})();



// #4. .delete() & .clear()
(() => {
    return;
    const phones = new Set();

    // 아이템 추가
    phones.add('iPhoneX');
    phones.add('Gallaxy Note 8');
    phones.add('V30');
    phones.add('Mi5');

    // 아이템 제거
    console.log(phones.delete('iPhoneX')); // true
    console.log(phones.delete('iPhoneXE')); // false

    // 저장된 아이템 개수 출력
    console.log(phones.size); // 3

    // 저장된 아이템 모두 제거
    phones.clear();
    console.log(phones.size); // 0

})();



// #5. .forEach() & for ~ of
(() => {
    return;
    const phones = new Set(); // Set(0) {}

    phones.add('iPhoneX');
    phones.add('Gallaxy Note 8');
    phones.add('V30');
    phones.add('Mi5');

    // 아이템 순환
    phones.forEach(phone => console.log(phone)); // 'iPhoneX', 'Gallaxy Note 8', 'V30', 'Mi5'

    // 전달인자 검토
    phones.forEach((...args) => {
        console.log(args);
        // (3) ["iPhoneX", "iPhoneX", Set(4)]
        // (3) ["Gallaxy Note 8", "Gallaxy Note 8", Set(4)]
        // (3) ["V30", "G30", Set(4)]
        // (3) ["Mi5", "Mi5", Set(4)]
    });

    // for ~ of
    // for문으로 Set 객체를 순환 하면?
    for (let i = 0, l = phones.size; i < l; ++i) {
        console.log(phones[i]); // undefined
    }

    // for ~ in문으로 Set 객체를 순환 하면?
    for (let key in phones) {
        console.log(key, phones[key]); // undefined
    }
    // for ~ of 문으로 Set 객체를 순환 하면?
    for (let phone of phones) {
        console.log(phone); // 'iPhoneX', 'Gallaxy Note 8', 'G30', 'Mi5' 
    }

})();


// #6. mapping & filtering
(() => {
    return;
    const phones = new Set(); // Set(0) {}

    phones.add('iPhoneX');
    phones.add('Gallaxy Note 8');
    phones.add('V30');
    phones.add('Mi5');

    // 매핑(Mapping)
    // 세트 → 배열 변환 후, .map() 메서드 활용
    // Array.from() 또는 [...세트] 사용
    let upgradePhones = new Set([...phones].map(phone => `upgrade ${phone}`));
    console.log(upgradePhones);

    // 필터링(Filtering)
    // 아이템 글자 개수가 10개 이상인 것만 필터링
    let filteredPhones = new Set([...phones].filter(phone => phone.length > 10));
    console.log(filteredPhones);

})();


// #7. 집합 : union & intersection & difference & superset & subset & Set.prototype 확장
//          (prototype으로 확장 가능하나 ES6+ 클래스를 사용하는게 더 간편하다.)
(() => {
    return;
    // 합집합(union, ∪) 유틸리티 함수
    function unionSet(setA, setB) {
        return new Set([...setA, ...setB]);
    }

    // 교집합(intersection, ∩) 유틸리티 함수
    function intersectSet(setA, setB) {
        return new Set([...setA].filter(item => setB.has(item)));
    }

    // 차집합(diffrence, \) 유틸리티 함수
    function diffSet(setA, setB) {
        return new Set([...setA].filter(item => !setB.has(item)));
    }

    // 상위집합(superset, ⊃) 유틸리티 함수
    function isSuperset(setA, setB) {
        for (let item of setB) {
            if (!setA.has(item)) { return false; }
        }
        return true;
    }

    //  집합 : Set.prototype 확장
    // 합집합(union, ∪) 메서드
    Set.prototype.union = function (x) {
        return new Set([...this, ...x]);
    };

    // 교집합(intersection, ∩) 메서드
    Set.prototype.intersection = function (x) {
        return new Set([...this].filter(y => x.has(y)));
    };

    // 차집합(diffrence, \) 메서드
    Set.prototype.diffrenece = function (x) {
        return new Set([...this].filter(y => !x.has(y)));
    }

    // 상위집합(superset, ⊃) 메서드
    Set.prototype.isSuperset = function (x) {
        for (let y of x) {
            if (!this.has(y)) { return false; }
        }
        return true;
    }

})();

// #8. 집합 class
(() => {

    class MySet extends Set {
        // 합집합
        union(x) { return new Set([...this, ...x]) }

        // 교집합
        intersect(x) { return new Set([...this].filter(y => x.has(y))) }

        // 차집합
        diff(x) { return new Set([...this].filter(y => !x.has(y))) }

        // 상위 집합 유무 확인
        isSuperset(x) {
            for (let y of x) {
                if (!this.has(y)) { return false; }
            }
            return true;
        }
    }
    
    const m = new MySet([1, 3, 5]);
    console.log(m); // Set(3) {1, 3, 5}
    console.log(m.union(new MySet([4, 6, 9]))); // Set(6) {1, 3, 5, 4, 6, …}
    console.log(m.union(new MySet([1, 3, 4, 6, 9]))); // Set(6) {1, 3, 5, 4, 6, …}
    console.log(m.intersect(new MySet([3, 5, 7]))); // Set(2) {3, 5}
    console.log(m.diff(new MySet([3, 7, 10]))); // Set(2) {1, 5}
    console.log(m.isSuperset(new MySet([1,5]))); // true
})();