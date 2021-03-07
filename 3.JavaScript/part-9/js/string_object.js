// JavaScript 문자 객체
// 다른 프로그램 언어 달리 단따옴표('), 쌍따옴표(") 문자열 간의 차이점이 없다.
/* 

\0 - NULL 문자
 \' - 단따옴표
 \" - 쌍따옴표
 \\ - 백슬래시
 \n - 개행문자
 \r - 캐리지리턴
 \t - tab
 \b - 백스페이스
 \f - 폼 피드

*/

// 문자열 + 연사자를 사용해서 합치기
let longString = "This a very long String whith" + "to wrap acorss";

// 문자 접근 - charAt()
var string_text = 'I am JavaScript';
console.log(string_text.charAt(1));

// 문자 접근 - 배열과 동일
console.log(string_text[5]);

// 문자열 비교 영어, 한글을 문자열 순서를 비교 할 수 있다.
var a = 'a';
var b = 'b';
if (a < b) {
  console.log(a + " is less than " + b);
} else if (a > b) {
  console.log(a + " is greater than " + b);
} else {
  console.log(a + " and " + b + " are equal. ");
}

//.lacaleCompare() 
// 문자를 비교해서 값이 작을 때는 -1, 클 경우는 1, 같을 경우에는 0을 반환한다.
// '가'.localeCompare('나'); // -1
// '디'.localeCompare('나'); // 1
// '가'.localeCompare('가'); // 0

// JavaScript는 자동적으로 원형 String 오브젝트 메서드 사용하여 원형 문자열을 생성할 수 있다.
var s_prim = "foo"; // 원시 데이터
var s_obj = new String(s_prim); // 객체 생성

console.log(typeof s_prim); // String
console.log(typeof s_obj); // Object

// indexof() 
// 포함되지 않은 문자 경우 -1를 반환한다.
var name = 'hoieiewoi';
console.log(name.indexOf('ie'));

if (window.navigator.userAgent.indexOf('Chrome') > -1) {
  // console.log('bom is ' + true);
} else {
  //console.log('bom is ' + false)
}

// string.slice(start, end) 
// String 문자 데이터에서 start 부터 end -1 까지 문자를 복사하여 반환한다.
// end 인자 값이 전달되지 않을 경우 start 부터 나머지 전체를 복사 반환한다.

console.log(name.slice(3, 5));
console.log(name.toUpperCase());
if (window.navigator.userAgent.toLocaleLowerCase().indexOf('chrome') > -1) {
  console.log('bom is ' + true);
} else {
  console.log('bom is ' + false)
}

// 문자열 일부를 변경
console.log(name.replace('ho', 'hi'));


var list = document.querySelector('.output ul');
list.innerHTML = '';
var greetings = ['Happy Birthday!',
  'Merry Christmas my love',
  'A happy Christmas to all the family',
  'You\'re all I want for Christmas',
  'Get well soon'];


for(var i = 0; l=greetings.length, i < l; i++) {

  var input = greetings[i];

  if(input.toLowerCase().indexOf('christmas') > -1) {
    var result = input;
    var listItem = document.createElement('li');
    listItem.textContent = result;
    list.appendChild(listItem);
  }
}