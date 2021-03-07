// -----------------------------------------------------------------------------------------
// JavaScript - 값 복사(pass by value)  VS  값 참조(pass by reference)
// ------------------------------------------------------------------------------------------


// =====================================================
// 값 복사
// - null
// - undefined
// - number
// - string
// - boolean

var repeating_count = 3;
var display_headline_content = '값 복사 vs 값 참조';
var is_toggle_menu = false;

// 값 복사
// 불변(Immutable) 데이터의 경우 그 값이 복사된다. 
// 숫자 값, 문자 값, 불리언 값, null, undefined

// 검증!
// 변수에 할당된 값이 변경되었을 때
// 다른 변수에 담긴 값이 변경되지 않았단 것은
// 값이 복사되었음을 의미한다.

// #1
var a = null;
// 3 이라는 값을 a에 복사한다. 이때 a의 값은 3처럼 보일 뿐 둘은 다른 값이다.
a = repeating_count;
a += 6; // repeating_count - 3

// #2
var b = display_headline_content;
b = b.replace('복사', 'copy');

// #3
var d = is_toggle_menu;
d = !d;


// =====================================================
// 값 참조
// - object
// - array
// - function


var my_family = {
  size: 4,
  moto: '정직하게 살자',
  members: ['아버지', '어머니', '나', '동생'],
  getMembers: function () {
    return this.members;
  },
  addMembers: function (new_member) {
    this.members.push(new_member);
  }
};

var home_tasks = [
  '바닥 쓸고 닦기',
  '침구류 정리',
  '화장실 청소',
  '설거지',
  '분리수거',
];

// 값 참조
// 가변(Mutable) 데이터의 경우 그 값이 참조된다.
// 객체 유형 (객체, 배열, 함수)

// 검증!
// 변수에 참조된 값이 변경되었을 때
// 다른 변수에 담긴 값이 변경된다면
// 값이 참조되었음을 의미한다.

// #1
// j에 my_family를 할당 했기 때문에 j 또한 my_family를 객체를 가리킨다.
var j = my_family;
j.size = 6;
j.members = ['나', '아버지', '어머니', '고양이'];

var m = j.size; // 6
m -= 10; // -4

// #2
var p = home_tasks;
p.pop();

//unshift: 배열 앞에 데이터 추가
home_tasks.unshift('마당 쓸기');

// #3. 배열 복사.
for (var u = [], i = 0; l = home_tasks.length, i < l; ++i) {
  u[i] = home_tasks[i];
}

var name = ['영희', '철수', '기철', '난희', '숙희'];
for (var my_friends = [], i = 0; l = name.length, i < l; ++i) {
  my_friends[i] = name[i];
}

// #4. 참조형 데이터 복사
var y = {};
for (var prop in my_family) {
  // console.log(my_family[prop]); // prop - 속성 값
  y[prop] = my_family[prop];
}


function copyArray(array) {
  for (var copy = [], i = 0; l = array.length, i < l; i++) {
    copy[i] = array[i];
  }
  return copy;
}

var yu = [3, 6, 9, 12];
var x = copyArray(yu);

