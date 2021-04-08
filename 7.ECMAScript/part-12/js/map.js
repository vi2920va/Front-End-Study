//--------------------------------------------------------------------------------------
// Map 
//--------------------------------------------------------------------------------------
// Map 객체는 속성(Key)/값(Value) 쌍으로 구성된 객체이다.
//--------------------------------------------------------------------------------------
// ☆ Map ☆

//  1.  Object VS Map
// (1) 유사한 점
//  : 키(key)로 저장하고, 불러오고, 저장된 값(value)을 확인할 수 있다는 점에서 객체는 맵과 유사하다.

// (2) 다른 점
//  : 문자, 심볼만 키(key)로 사용할 수 있는 객체에 반해, 맵은 어떠한 값도 키로 사용할 수 있다. 그리고 
//    객체는 저장된 데이터 (키 : 값)의 개수를 알 수 없지만, 맵은 .size 속성을 통해 알 수 있다.

// (3) 언제 사용하면 좋을 까 ?
// : 데이터 콜렉션(Collection)을 다룰 때 주로 사용하면 좋다.키 값을 문자, 심볼이 아닌 것을 사용해야 
//   하거나 데이터가 순환(Iterate) 되어야 할 경우 유용하다. 그 외의 경우는 객체를 사용하는 것이 좋다.



// #1. Object VS Map
(() => {
    return;
    // 객체(Object)
    let capitals = {
        korea_ref: '서울',
        china: '북경',
        usa: '워싱턴 D.C'
    };
    console.log(capitals); // {korea_ref: "서울", china: "북경", usa: "워싱턴 D.C"}

    // 맵(Map)
    // new Map([iterable]);
    let capitals_map = new Map();

    capitals_map
        .set('한국', '서울')
        .set('중국', '북경')
        .set('미국', '워싱턴 D.C');

    console.log(capitals_map); // {"한국" => "서울", "중국" => "북경", "미국" => "워싱턴 D.C"}

})();

// #2. Map.prototype
(() => {
    return;
    Map.prototype

    // Map.prototype 객체
    console.dir(Map.prototype);

    // .constructor
    // .size
    // .set()
    // .get()
    // .has()
    // .delete()
    // .clear()
    // .forEach()
    // .entries()
    // .keys()
    // .values()
})();

// #3. .size & .set() & .get() & .has()
(() => {
    return;
    // Map 객체 생성
    let capitals = new Map(); // Map(0) {}

    // 아이템(키,값) 추가
    capitals.set('한국', '서울'); // Map(1) {"한국"=>"서울"}
    capitals.set('중국', '북경'); // Map(2) {"한국"=>"서울", "중국"=>"북경"}
    capitals.set('미국', '워싱턴 D.C'); // Map(3) {"한국"=>"서울", "중국"=>"북경", "미국"=>"워싱턴 D.C"}

    // 저장된 아이템 개수 출력
    console.log(capitals.size); // 3

    // 저장된 아이템 출력
    console.log(capitals.get('한국')); // '서울'
    console.log(capitals.get('일본')); // undefiend

    // 저장된 키 값에 '일본'이 없다면 ?
    if (!capitals.has('일본')) {
        // '일본' => '동경' 아이템 추가
        capitals.set('일본', '동경');
        console.log(capitals.size); // 4
    }
})();

// #3. .delete & .clear()
(() => {
    return;
    // Map 객체 생성
    let capitals = new Map();

    // 아이템(키,값) 추가
    capitals.set('한국', '서울');
    capitals.set('중국', '북경');
    capitals.set('미국', '워싱턴 D.C');
    capitals.set('일본', '동경');

    // 아이템 제거
    console.log(capitals.delete('일본')); // true
    console.log(capitals.delete('러시아')); // false

    // 저장된 아이템 개수 출력
    console.log(capitals.size); // 3

    // 저장된 아이템 모두 제거
    capitals.clear();
    console.log(capitals.size); // 0
})();


// #4. .forEach() & for ~ of
(() => {
    return;
    // Map 객체 생성
    let capitals = new Map();

    // 아이템(키,값) 추가
    capitals.set('한국', '서울');
    capitals.set('중국', '북경');
    capitals.set('미국', '워싱턴 D.C');
    capitals.set('일본', '동경');

    // 아이템 순환
    capitals.forEach((city, nat, collection) => console.log(city, nat, collection));

    // 전달인자 검토
    capitals.forEach((...args) => {
        console.log(args);
        // 서울       한국  Map(4) {"한국" => "서울", ...}
        // 북경       중국  Map(4) {"한국" => "서울", ...}
        // 워싱턴 D.C  미국  Map(4) {"한국" => "서울", ...}
        // 동경       일본  Map(4) {"한국" => "서울", ...}
    });

    // for문으로 Map 객체를 순환 하면?
    for (let i = 0, l = capitals.size; i < l; ++i) {
        console.log(capitals[i]); // undefined
    }
    // for ~ in문으로 Map 객체를 순환 하면?
    for (let key in capitals) {
        console.log(key, capitals[key]); // undefined
    }

    // for ~ of 문으로 Map 객체를 순환 하면?
    for (let [nat, city] of capitals) {
        console.log(nat, city);
    }

})();

// #5. .keys() & .values() & .entries()
(() => {
    return;
    // Map 객체 생성
    let capitals = new Map();

    // 아이템(키,값) 추가
    capitals.set('한국', '서울');
    capitals.set('중국', '북경');
    capitals.set('미국', '워싱턴 D.C');
    capitals.set('일본', '동경');

    // .values()
    for (let city of capitals.values()) {
        console.log(city); // '서울', '북경', '워싱턴 D.C', '동경'
    }

    // .keys()
    for (let nat of capitals.keys()) {
        console.log(nat); // '한국', '중국', '미국', '일본'
    }

    // .entries()
    for (let [key, value] of capitals.entries()) {
        console.log(key, value);
    }

})();

// #6. [key: value] Array
(() => {
    return;
    // capitals 맵
    // 배열([]) 내부에 키/값 배열([key, value])을 포함.
    let capitals = new Map([
        ['한국', '서울'],
        ['중국', '북경'],
        ['미국', '워싱턴 D.C'],
        ['일본', '동경']
    ]);
    console.log([...capitals]);

    /* 
        결과
        ['한국', '서울'],
        ['중국', '북경'],
        ['미국', '워싱턴 D.C'],
        ['일본', '동경']
    */
})();


// #7. mapping & filtering
(() => {
    return;
    // Map 객체 생성
    let capitals = new Map();

    // 아이템(키,값) 추가
    capitals.set('한국', '서울');
    capitals.set('중국', '북경');
    capitals.set('미국', '워싱턴 D.C');
    capitals.set('일본', '동경');

    // 매핑(Mapping)
    // 맵 → 배열 변환 후, .map() 메서드 활용
    // Array.from() 또는 [...세트] 사용
    // 매개변수 [], 반환 값도 []
    let capitals2 = new Map([...capitals].map(([nat, city]) => [nat, `${nat}의 수도 ${city}.`]));
    console.log(capitals2);

    // 필터링(Filtering)
    // 중국을 제외한 나머지 국가 및 수도 데이터 필터링
    let capitals3 = new Map([...capitals].filter(([nat, city]) => nat !== '중국'))
    console.log(capitals3);

})();


// #8. combineMap & convertArray & Map.prototype 확장
(() => {
    return;
    // 맵 병합 유틸리티 함수
    function combineMap(mapA, mapB) {
        return new Map([...mapA, ...mapB]);
    }

    // 맵 → 배열 유틸리티 함수
    function convertMap2Array(map) {
        return [...map];
    }

    // Map.prototype 확장
    Map.prototype.combine = function (x) {
        return new Map([...this, ...x]);
    };

    Map.prototype.convertArray = function () {
        return [...this];
    };
})();

// #9. class map
(() => {
    return;
    class MyMap extends Map {
        // 병합
        combine(x) {
            return new Map([...this, ...x]);
        }

        // 배열 반환
        convertArray() {
            return [...this];
        }
    }

    const m = new MyMap([
        [9, function () { return 'Nice' }],
        [null, 'this is null'],
        [NaN, 'this is a number']
    ]);

    console.log(m);
    console.log(m.get(9));
    console.log(m.get(null));
    console.log(m.combine(new Map([['1', 'One']])));

    console.log(m.convertArray());
})();


// #10. map2json & json2map 유틸리티 함수
(() => {
    return;
    // Map → JSON 유틸리티 함수
    function map2json(map) {
        return JSON.stringify([...map]);
    }

    // JSON → Map 유틸리티 함수
    function json2map(jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }

    let map = new Map().set(true, 7).set({ foo: 3 }, ['abc']);

    console.log(map = map2json(map)); // '[[true,7],[{"foo":3},["abc"]]]'

    console.log(map = json2map(map)); // Map(2) {true => 7, Object {foo: 3} => ['abc']}

})();


// #11. strMap2obj & obj2strMap 유틸리티 함수
(() => {
    return;

    // String Map → Object 유틸리티 함수
    function strMap2obj(strMap) {
        let o = Object.create(null);
        for (let [k, v] of strMap) {
            o[k] = v;
        }
        return o;
    }

    // Object → String Map 유틸리티 함수
    function obj2strMap(o) {
        let m = new Map();
        for (let k of Object.keys(o)) {
            m.set(k, o[k]);
        }
        return m;
    }

    let strMap = new Map().set(true, 'yes').set(false, 'no');

    let o = strMap2obj(strMap); // { true: 'yes', false: 'no' }
    console.log(o);

    let strMap2 = obj2strMap(o); // Map(2) { true => 'yes', false => 'no' }
    console.log(strMap2);

})();


// #12. strMap2json & json2strMap 유틸리티 함수
(() => {

    // String Map → Object 유틸리티 함수
    function strMap2obj(strMap) {
        let o = Object.create(null);
        for (let [k, v] of strMap) {
            o[k] = v;
        }
        return o;
    }

    // Object → String Map 유틸리티 함수
    function obj2strMap(o) {
        let m = new Map();
        for (let k of Object.keys(o)) {
            m.set(k, o[k]);
        }
        return m;
    }

    // strMap → JSON 유틸리티 함수
    function strMap2json(strMap) {
        return JSON.stringify(strMap2obj(strMap));
    }

    // JSON → strMap 유틸리티 함수
    function json2strMap(jsonStr) {
        return obj2strMap(JSON.parse(jsonStr));
    }

    let strMap = new Map().set('yes', true).set('no', false);

    let json = strMap2json(strMap); // '{"yes":true,"no":false}'

    console.log(json);

    let strMap3 = json2strMap(json); // Map(2) {'yes' => true, 'no' => false}
    console.log(strMap3);


})();





