//-------------------------------------------------------------------------------------
// 배열 유용한(Array Useful) 
//-------------------------------------------------------------------------------------
// ES6+ 등장 이전부터 사용되었던 배열 객체의 알아두면 유용한 메서드를 정리한다.
//-------------------------------------------------------------------------------------
// ☆ ES5 ☆ 

// #1. Array.isArray & Array.prototype.forEach 
(() => {
    return;

    // (1) 전달된 데이터의 타입이 배열인지 확인 Boolean 값을 반환한다.
    const o = {};
    const a = [];

    console.log(Array.isArray(a)); // true
    console.log(Array.isArray(o)) // false

    // (2) 배열의 각 아이템을 순환하여 처리할 때 유용하다. for문 또는 for.of문을 사용할 수 있다.
    const items = ['item1', 'item2', 'item3'];
    const copy = [];

    // (2-1) for 문
    for (let i = 0, l = items.length; i < l; ++i) {
        // copy.push(items[i]);
    }

    // (2-2) forEach 메서드
    items.forEach(item => copy.push(item));

    // (2-3) for.of 문
    for (let item of items) {
        copy.push(item);
    }
    console.log('items : ', items);

    // (3-1). forEach 메서드 활용 
    (() => {
        return;
        // forEach 메서드에 2번째 인자를 전달할 경우, 전달된 인자는 this 컨텍스트가 된다. 
        // 아래 코드는 class Counter의 add 메서드 내부에 forEach를 활용하면서 this 참조
        // 를 변경하는 예시이다. this를 변경함으로 add 메서드 내부의 this는 Counter 
        // 클래스의 인스턴스를 참조하게 된다
        class Counter {
            constructor() {
                this.sum = 0;
                this.count = 0;
            }
            add(array) {
                array.forEach(function (item) {
                    this.sum += item;
                    ++this.count;
                }, this);
            }
        }
        const obj = new Counter();
        obj.add([9, 12, 3]);

        console.log(obj.count);
        console.log(obj.sum);
    })();

    // (3-2) ForEach 메서드 활용
    (() => {
        return;
        // add 메서드를 화살표 함수식을 사용하면 this 컨텍스트를 변경하지 않아도 된다.
        // 화살표 함수 내부의 this 는 상위 컨텍스트를 참조 하므로 아래의 코드에서 this는
        // Counter 클래스의 인스턴스 이다.  
        class Counter {
            constructor() {
                this.sum = 0;
                this.count = 0;
            }
            add(array) {
                array.forEach(item => {
                    this.sum += item;
                    ++this.count;
                });
            }
        }
        const obj = new Counter();
        obj.add([9, 12, 3]);

        console.log(obj.count);
        console.log(obj.sum);
    })();
})();

// #2. Array.prototype.map
(() => {
    return;

    // forEach 메서드와 유사하지만, 배열 객체의 아이템을 가공한 후,
    // 새로운 배열로 반환한다는 점이 다르다.
    let items = ['item1', 'item2', 'item3'];
    let copy = [];

    // (1) forEach 메서드를 사용할 경우
    copy = items.forEach(item => {
        return item.replace(/item/g, '');
    });
    console.log('forEach method copy : ', copy); // undefined

    // (2) map 메서드를 사용할 경우
    copy = items.map(item => {
        return item.replace(/item/g, '');
    });
    console.log('map method copy : ', copy); // ["1", "2", "3"]

    // (2-1) 화살표 함수 식을 아래와 같이 간추려 표현하면 return 키워드가 생략 가능하다.
    let copy_arrfun = [];
    copy_arrfun = copy.map(item => item.replace(/copy_arrfun/g, ''));
    console.log('map method and arrow function : ', copy_arrfun);
})();

// #3. Array.prototype.filter
(() => {
    return;

    // filter 메서드는 배열의 아이템 중 일부를 필터링(Filtering) 할 때 매우 유용하다.

    //(1) 과일 배열 생성
    const fruits = ['Apple', 'GreenApple', 'Grape', 'Mango', 'Banana', 'Orange', 'GrapeJuice', 'OrangeJuice'];

    // (1-1) 검색 조건에 따른 배열 필터링 (쿼리)
    const filterFruits = (query) => {
        return fruits.filter((fruit) => {
            return fruit.includes(query);
        });
    };

    console.log(filterFruits('Apple')); // ["Apple", "GreenApple"]
    console.log(filterFruits('Juice')); // ["GrapeJuice", "OrangeJuice"]

    // (2) 채소 배열 생성
    const vegetables = ['Carrot', 'CarrotJuice', 'Cabbage', 'CabbageJuice', 'Pumpkin'];

    // (2-1) query 매개변수 괄호() 생략 & 함수의 중괄호 {}, return 키워드 생략, 인라인 (1줄) 변경
    const filterVegetables = query => vegetables.filter(vegetables => vegetables.includes(query));

    console.log(filterVegetables('Juice')); // ["CarrotJuice", "CabbageJuice]
})();

// #4. Array.prototype.sort 
(() => {
    return;
    // 구문 - array.sort([compareFunction]);

    // sort 메서드는 배열의 아이템을 오름차순, 내림차순 으로 정렬(Sortering)할 때 유용하게 사용된다.
    // 비교 함수(compareFunction)는 선태적으로 전달 할 수 있다. 비교함수의 매개 변수는 현재 아이템과
    // 다음 아이템으로, 아이템을 비교하여 정렬 순서를 변경한다.

    // (1) sort 메서드 새로운 배열을 반환하는 것이 아니므로, 데이터를 보존 시 복사된 배열을 사용해야 된다!
    const originalArray = ['Original', 'Array', 'Data'];
    const copyedArray = [...originalArray];

    // (2) 숫자 정렬
    // a - b 값이 0 보다 작으면, a 가 먼저 배치 된다.
    // a - b 값이 0 보다 크면,  b 가 먼저 배치 된다.
    // a - b 값이 0 일 경우, a, b 의 배치에 변화가 없다.
    const numbers = [11, 92, 7, 3, -12, 32, -2];

    // (2-1) 숫자 오름차순 정렬
    const sortedASC = [...numbers].sort((n1, n2) => { return n1 - n2; });
    console.log('numbers ASC : ', sortedASC); //  [-12, -2, 3, 7, 11, 32, 92]

    // (2-2) 숫자 내림차순 정렬(비교 함수 내에서 n2에서 n1를 빼면 된다.)
    const sortedDESC = [...numbers].sort((n1, n2) => { return n2 - n1; });
    console.log('numbers DESC : ', sortedDESC); //  [92, 32, 11, 7, 3, -2, -12]

    // (3) 문자 정렬 
    // a > b 비교 값이 1 이면, a 가 먼저 배치 된다.
    // a > b 비교 값이 -1 이면, b 가 먼저 배치 된다.
    // a > b 비교 값이 0 이면, a, b 의 배치에 변화가 없다.
    const names = ['김철수', '이영희', '박서준', '장지혜', '나지윤'];

    // (3-1) 문자 오름차순 정렬 (ㄱ - ㅎ 순)
    const orderedASC = [...names].sort((f1, f2) => { return f1 > f2 ? 1 : f1 < f2 ? -1 : 0; });
    console.log('names ASC : ', orderedASC); // ["김철수", "나지윤", "박서준", "이영희", "장지혜"]

    // (3-2) 문자 내림차순 정렬 (ㅎ - ㄱ 순)
    // (반대로 비교함수 내에 f1 보다 f2 가 클 경우, -1을 반환하도록 설정한다.)
    const orderedDESC = [...names].sort((f1, f2) => { return f1 > f2 ? -1 : f1 < f2 ? 1 : 0; });
    console.log('name DESC : ', orderedDESC); // ["장지혜", "이영희", "박서준", "나지윤", "김철수"]

    // (4) 객체 정렬
    // 문자 비교와 비슷하지만, 정렬하고자 하는 객체의 속성을 비교한 후 결과를 반환해야 한다.
    const members = [
        { name: '박유나', score: 42 },
        { name: '손상경', score: 87 },
        { name: '민준현', score: 78 },
        { name: '김소라', score: 91 },
        { name: '서진욱', score: 65 },
        { name: '나영진', score: 97 },
    ];

    const orderMembersBy = (type = 'name', ascDesc = 1) => {
        const result = [...members].sort((m1, m2) => {
            return m1[type] > m2[type] ? 1 : m1[type] < m2[type] ? -1 : 0;
        });
        return ascDesc >= 0 ? result : result.reverse();
    };

    //(4-1) 이름 ㄱ -ㅎ 순으로 정렬
    orderMembersBy('name'); 
    // (4-2) 이름 ㅎ - ㄱ 순으로 정렬     
    orderMembersBy('name', -1);  
    // (4-3) 점수 낮은 순으로 정렬
    orderMembersBy('score');  
    // (4-4) 점수 높은 순으로 정렬
    orderMembersBy('score', -1); 

    // (4-5) 정렬 검증
    console.log( orderMembersBy('name').map(member => member.name) ); // ["김소라", "나영진", "민준현", "박유나", "서진욱", "손상경"]
    console.log( orderMembersBy('name', -1).map(member => member.name) ); // ["손상경", "서진욱", "박유나", "민준현", "나영진", "김소라"]
    console.log( orderMembersBy('score').map(member => member.score) ); // [42, 65, 78, 87, 91, 97]
    console.log( orderMembersBy('score', -1).map(member => member.score) ); // [97, 91, 87, 78, 65, 42]

})();