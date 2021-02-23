// -----------------------------------------------------------
// switch 문
// -----------------------------------------------------------
//
// Switch 문은 프로그램이 표현식을 평가하고 값을 조건과 비교합니다.
// 만약 값이 일치한다면, 프로그램은 각 조건의 하위 문장을 실행합니다.
//
// 프로그램은 주어진 값과 일치하는 case 라벨을 찾습니다. 그리고 나서
// 관련된 구문을 수행합니다. 만약 매치되는 라벨이 없다면 default 절을
// 찾습니다. 찾게 되면, 관련된 구문을 수행합니다. default 절을 못 찾게
// 된다면 프로그램의 switch문은 종료됩니다. 관례상 default 절은 마지막
// 절입니다. 하지만 꼭 그럴 필요는 없습니다.
//
// 한번 일치된 문장이 수행되고 switch문을 따라서 계속 수행한다면 각각의
// 조건절로 연결된 선택적인 break문은 프로그램이 switch문을 벗어나게
// 합니다. 만약 break문이 생략된다면, 프로그램은 switch문 안에서
// 다음 문장을 계속 수행합니다.

// switch(변수){
//   case 상수 1 :
//    실행문 1;
//    break;
//   case 상수 2 :
//    실행문 2;
//    break;
//   default :
//    실행문;
// }

/* ==========================================
 * 멀티 조건의 if 조건문 */

// 차종 참고:https://goo.gl/QQ9Az9
var type_of_car = '로드스터';

if (type_of_car === '경차') {
  console.log('기아 모닝을 추천합니다.');
} else if (type_of_car === '소형차') {
  console.log('기아 프라이드는 어떠세요?');
} else if (type_of_car === '중형차') {
  console.log('현대 쏘나타 아니면 BMW 3 시리즈가 좋겠어요.');
} else if (type_of_car === '대형차') {
  console.log(
    '크라이슬러 300, 메르세데스-벤츠 E 클래스, 현대 에쿠스 타보세요!'
  );
} else if (
  type_of_car === '스포츠카' ||
  type_of_car === '컨버터블' ||
  type_of_car === '로드스터' ||
  type_of_car === 'SUV'
) {
  console.log('BMW Z4');
  console.log('푸조 파트너, 오펠 메리바');
  console.log('쉐보레 올란도, 기아 카니발 또는 스포티지 ...');
  console.log('다양합니다! 골라보세요! :-)');
} else {
  console.log('음... 말씀하신 종류는 국내에서 판매하지 않습니다. :-(');
}

/* ==========================================
 * swtich ~ case 문 실습 */
// [switch 조건문 단점 : 상수]
// : switch()의 괄호 사이에는 자유롭게 데이터 올 수 있다.
//   하지만 case 뒤에는 변수나, 조건식을 사용할 수 없다.
//   case 값에는 상수만 올 수 있다!!!

// 잘못된 switch  조건문
// var num = window.prompt('원하는 숫자를 입력하세요.');
// switch(num){
//   case num > 0 :
//     document.write('입력한 숫자는 양수 입니다');
//     break;
// }

var y = x < 9;

switch (y) {
  case true:
    console.log('y가 true 일 경우');
    break;
  case false:
    console.log('y가 false 일 경우');
    break;
}

// 입력 받은 값을 홀짝 비교
var x = window.prompt('원하는 정수의 값을 입력해주세요');
switch (x % 2) {
  default:
    document.write('정수값을 입력해주세요.');
    break;
  case 0:
    document.write('입력한 숫자는 짝수 입니다');
    break;
  case 1:
    document.write('입력한 숫자는 홀수 입니다');
    break;
}
