//-------------------------------------------------------------------------------------
// 전개 연산자(Spread Operator) 
//-------------------------------------------------------------------------------------
// 전개 연산자를 사용하면 함수 또는 배열등에서 유용하다고 앞서 다룬적이 있다.
// 여기서 좀 더 전개 연산자에 대한 예제를 다뤄보도록 하자.
//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 

// #1. 기존 코드에서 배열 내의 숫자들의 최대값 찾기 위해서
// Math.Max 에 apply () 메서드를 사용했다.
// console.log(Math.max.apply(null, [-1, 10, 100, 1000, 9999])); // 9999

//-------------------------------------------------------------------------------------
// ☆ ES6 - 전개 연산자(Spread Operator)☆
// 전개 연산자(...)는 함수 또는 배열 등에서 유용하게 활용된다.


// #1. 전개 연산자를 활용해 배열에 최대값 구하기.
(() => {
    return;
    let arr = [2, 10, 30, 10, 1000];
    console.log(Math.max(...arr));
})();

// #2. 전개 연산자를 사용한 배열에 중간 삽입
(() => {
    return;
    let cities = ['서울', '부산'];
    let places = ['여수', ...cities, '제주'];
    console.log(places);
})();

// #3. 객체 또한 전개 연산자 사용해 합칠 수 있다.
(() => {
    return;
    const seoul = {
        name: '서울',
        country: '대한민국',
        capital: true
    };
    const seoulInKorea = {
        ...seoul, // 객체 속성 복사
        latitude: 37.5665,
        longitude: 126.9779
    };
    console.log(seoulInKorea);
})();

// #4. 중첩된 데이터를 포함한 객체를 복사할 때는 전개 연산자를 사용하면 안된다!!
// (아래의 잘못된 예제임을 알려주기 기술 해놨다. 주석을 잘 읽도록!!)
(() => {
    return;
    const seoul = {
        name: '서울',
        info: {
            country: '대한민국',
            capital: true,
            latitude: 37.5665,
            longitude: 126.9779
        },
    };
    const seoulCity = { ...seoul };
    // 값 복사가 아닌 참조가 일어나기 때문에 실제 데이터가 변경되는 위험이 있다.
    seoulCity.info.country = '한국';
    console.log(seoul.info.country); // '한국' ⟾ 값 참조(Pass by Reference)
    console.log(seoulCity);
})();

// #5. 중첩된 데이터를 포함한 객체를 복사할 경우 JSON 객체의 
// stringify, parse 메서드를 사용하길 권장한다.
// (JSON : 자바스크립트 객체 표기법으로 파생된 부분 집합이다. 이름과 값의 쌍으로 이루어진다.)
(() => {
    return;
    const seoul = {
        name: '서울',
        info: {
            country: '대한민국',
            capital: true,
            latitude: 37.5665,
            longitude: 126.9779
        },
    };
    function deepCopyObject(o) {
        return JSON.parse(JSON.stringify(o));
    }
    const seoulCity = deepCopyObject(seoul);
    seoulCity.info.country = '한국'; // seoulCity의 값만 변경
    console.log(seoul.info.country);
    console.log(seoulCity); // seoul 값은 변경되지 않는다.
})();


