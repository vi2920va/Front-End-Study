// -----------------------------------------------------------------------------------------
// [JavaScript 반복(Iteration) & 순환(Loops)]
// - 루프는 어떤 것을 반복적으로 시행할때 빠르고 간편한 방법을 제공합니다
// 
// [반복문이 필요한 이유!]
//  반복 처리가 필요한 일을 사람 대신 
//  프로그래밍으로 처리해 줌으로
//  불필요한 공정을 줄여줍니다.
//
// 예) 모든 링크 클릭 이벤트 핸들링은 너무 힘들죠 ㅠㅡㅠ
//    모든 링크에 클릭 이벤트를 한 번에 걸어주고 싶어요.
//    수정 사항이 발생해 아이템이 추가되어도 손 하나 까딱하고 싶지 않아요.
// 
//[JavaScript 반복문]
// - while 문
// - break 문
// - continue 문
// - label 문
// - do ~ while 문
// - for 문
// - for ~ in 문 (객체 탐색)
// 예제 참고 URL: ediya.com/contents/drink.html
// codepen 무한루프 종료 : ? turn_off_js=true
// ------------------------------------------------------------------------------------------

// =====================================================
//[ 배열(Array) 객체]

var languages = ['HTML', 'CSS'];

// 배열 객체의 메서드: .push(), 뒷쪽에 아이템 추가 
languages.push('JavaScript');
languages.push('C');
languages.push('Java');
languages.push('C#');
languages.push('Ruby');

// 배열 객체의 속성: .length, 배열의 갯수  
// console.log(languages.length);

// 배열의 원소에 접근하는 방법 
var first_item = languages[0];
var last_item = languages[languages.length - 1];

// 배열 원소의 아이템을 제거
// 배열 원소를 뒤에서 부터 제거하는 메서드: .pop()
// languages.pop();


// 반복문을 사용해 배열 원소의 아이템 모두 제거
while (languages.length) { // 7, 6, 5, 4, 3, 2, 1, [0]
    // 조건 값이 참이면, 코드 블럭을 실행한다.
    languages.pop(); // 6, 5, 4, 3, 2, 1, 0
    // 조건이 참이면, 참일 동안 계속 반복 실행한다.
    // 조건을 거짓으로 변경하는 중단점 필요.(사용자가 설정) -> 무한반복 (브라우저가 멈춤)
}

if (languages.length > 0) {
    // console.log('languages의 아이템 개수는 총' + languages.length + '개 입니다');
} else {
    // console.log('languages의 아이템 개수는 총 0개 입니다');
}

// =====================================================
//[while 문]
// 조건이 거짓으로 판별될 때까지 반복.
// while (조건) { ... } // 조건이 참이면 반복 실행
// =====================================================

// var while_condition = true;
// var count = 0;

// while (while_condition) {
//     count = count + 1; // 0, 1, 2, 3, 4, 5, 6, ....
//     console.log(count);
//     if (count > 5) { while_condition = false; }
// }

// [if문 VS while문]
// if    (조건) { ... } // 조건이 참이면 1회 실행
// while (조건) { ... } // 조건이 참이면 반복 실행

// =====================================================
// [continue 문]
// - 반복(순환) 중 조건이 충족할 경우, 조건 확인 영역으로 이동

// =====================================================
// [break 문]
// - 반복(순환) 중 조건이 충족할 경우, 실행 종료 (반복문 종료)

// =====================================================
// [label 문]
// - 참조 가능한 식별자로 continue, break에 의해 식별
// - 중첩된 반복문 내에서 활용 (일반적으로 잘 사용하지 않음)

// =====================================================
// [증가 연산자]
// - 선 증가 연산자  ++count;
// - 후 증가 연산자  count++;

// var while_condition = true;
// var count = 0;
// var innerCount = 0;
// var repeatingCount = 10;

// loopCount:
// while (while_condition) {
//     ++count; // 1
//     if (count === 3 || count === 7) { continue; } // 3,7 일 때 아래의 조건을 확인하지 않고 위로 점프한다.
//     while (true) {
//         innerCount++; // 0
//         // 중첩된 while문 조건이 충족해서 종료할 때, 바깥 loopCount while문을 참조한다.
//         if (innerCount === repeatingCount / 2) { break loopCount; }
//         console.log('   - innerCount : ', innerCount);
//     }
//     if (count === 6) { break; } // 1, 2, 4, 5
//     console.log('count : ', count);
//     if (count >= repeatingCount) { while_condition = false; }
// }

// DOM API : 반복문을 사용해 문서 객체 집합의 개별 요소노드에 접근
// i++ : i가 후 증가 연산자 일 경우 0 부터 비교를 시작해서 8 까지 총 9번 카운트 한다. i는 10  
// ++i : i가 선 증가 연산자 일 경우 1 부터 비교를 시작해서 8 까지 총 8번 카운트 한다. i는 9

// var beverage = els('.ediya-menu__item');
// var i = 0;

// while (++i <= beverage.length) {
//     // console.log('후 증가 :', i);
// }

// =====================================================
//  [do ~ while 문 VS while 문]
// while (조건) { ... }    // 조건이 거짓이면 반복 실행되지 않음
// do { ... } while(조건); // 조건이 거짓일지라도 1회는 실행

//  while(false){ 
//     console.log('조건이 거짓이면 실행되지 않는다'); 
// }

// do { 
//     console.log('조건이 거짓이면 실행되지 않는다');
//  } while (false);

// =====================================================
// [for 문]
// 조건이 거짓으로 판별될 때까지 반복. C 언어의 반복문과 비슷. 
// for ([초기문]; [조건문]; [증감문]) { ... }

// [for 실행흐름] - 초기선언 -> 조건문 -> 출력 -> 증가
// 1. for문 내에서 var i = 0; 으로 초기 선언
// 2. 조건 i < 10 을 확인
// 3. console.log(i)로 출력
// 4. 증감문을 통해 i 값을 증가 시킴.


// [while 문 VS for 문]
// 문서 객체에 접근하여 노드리스트를 변수에 참조
// for 반복문을 사용하여 문서 객체 개별 접근

// // #1
// for (var i = 0; i < 10; i++) {
//     console.log(i);
// }

// #2
// for (var i = 0; i < 10; i++) {
//     for (var j = 4; j > 0; j = j - 2) {
//         console.log('j :', j);
//     }
//     console.log('i :', i);
// }

// #3 - 콤마(,)를 사용해서, 변수와 증가에 대해 부분을 묶어 사용 가능.
// for (var i = 0, j = 4; i < 10; ++i, j -= 2) {
//     if (j > 0) {
//         console.log('j :', j);
//         continue;
//     }
//     console.log('i :', i);
// }
// #4 - label과 breck를 사용해서 사용.
// outFor : for ( var i = 0; i < 10; ++i){
//     inFor : for(var j = 4; j > 0; j = j - 2){
//         console.log('j :', j);
//         break outFor;
//     }
//     console.log('i :', i);
// }

// 문서 객체에 접근하여 노드리스트를 변수에 참조
// for 반복문을 사용하여 문서 객체 개별 접근

// 컬러 배열 데이터 []
var colors = [
    '#8DE8E2',
    '#A9FFAB',
    'F2EF83',
    '#FFD17D',
    '#F9947A',
    '#F69A9A',
    '#C8C8A9',
    '#F9CDAE'
];

var menu__item = els('.ediya-menu__item');

for (var i = 0; i < menu__item.length; ++i) {
    var item = menu__item[i];
    // item은 문서객체 이기 때문에 color를 추가한다.
    // JS는 객체 속성 값을 설정하기 쉽다.
    item.color = colors[i];
    item.addEventListener('click', openPanel);
}

function openPanel(e) {
    e.preventDefault();
    var figcaption = el('figcaption', this);
    figcaption.style.color = this.color;
}

// =====================================================
// [for ~ in 문]
// - for문 사용할 수 없는 이유는 length 속성이 없기 떄문이다.
// 배열이 아닌, 객체를 순환할 때 사용.
// for (variable in object) {
//   statements
// }
// 배열을 순환 처리할 수 있지만,
// 성능 문제로 배열은 for 문을 사용하는 것이 좋다.
// 음료 객체 데이터

// #1 변수를 사용
var beverage__01 = {
    name: '벚꽃라떼',
    type: 'ICED',
    photo: 'file:///C:/Users/audwo/Desktop/JavaScript/chapter07/images/ICED-%EB%B2%9A%EA%BD%83%EB%9D%BC%EB%96%BC.png',
    width: '328px',
    height: '328px',
};

for(var propety in beverage__01){
    console.log(propety); // key
    console.log(beverage__01[propety]) // value
}

// beverages.push(beverage__01);

// var beverages = [];
// #2 push 메서드에 직접 담음
// beverages.push({
//     name: '벚꽃라떼',
//     type: 'HOT',
//     photo: 'file:///C:/Users/audwo/Desktop/JavaScript/chapter07/images/HOT-%EB%B2%9A%EA%BD%83%EB%9D%BC%EB%96%BC.png',
//     width: '328px',
//     height: '328px',
// });
