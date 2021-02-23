// -------------------------------------------------------------
// JavaScript 함수(Function)
// : 절차, 일을 할 때 거쳐야 하는 일정한 차례와 방법을 말한다.

// - 미리 정의된 함수들
// - 함수 정의(선언)
// - 함수 표현식 
// - 함수 호출
// - 함수 전달인자와 매개변수
// - 함수 결과 반환
// - 함수 범위(유효범위)
// - 재사용 목적 함수
// -------------------------------------------------------------


/* =====================================
 * 미리 정의된(내장된) 함수들 */

// 함수는 절차(procedure)
// 일을 하는 데 거쳐야 하는 일정한 차례와 방법
// 쉽게 말해 "할 일 묶음"

// ※ window 전역 객체는 생략 가능.

// window.parseInt()
// window.parseFloat()
// window.alert()
// window.confirm()
// window.prompt()

// ※ console 객체는 생략 불가능.

// console.log()
// console.info()
// console.warn()
// console.error()

// 익명함수 용도

/* =====================================
 * 사용자 정의 함수 */

// [1.1] 함수 정의(선언)

function myfun(){
	// CodeBlock
	console.log('함수 만들었어');
}

// [1.2] 함수 표현식(Function Expression)
// : 함수를 정의 할 때 이름을 정해주지 않으면 익명함수가 된다. 그러므로 
// 변수에 참조 시켜야 한다.

var moofun = function(){
	console.log('익명 함수');
};

moofun();

// [2] 함수 호출
// 선언된 함수 이름 또는 함수 값을 참조하는 변수 이름을 호출()
myfun();

// [3] 함수 전달인자(arguments)와 매개변수(parameters)
// : '매개변수' 함수 정의 부분에 있는 변수, '인자' 함수를 호출 할때 실제 전달되는 값 


// [4] 함수 결과 반환(return)
// 결과 값을 요구할 때        return 사용
// 결과 값을 요구하지 않을 때   return 미사용
// 결과 값을 명시 하지 않으면 undefined를 반환한다.


// [5] 함수 유효범위(영역)
// : 함수 안에서 변수를 정의하면 함수 밖에서 접근할 수 없다. 
name ='전역변수';
function scopeFn(){
	var name ='지역변수';
	err = '함수 내에서 var 키워드를 사용하지 않고 선언하면 전역변수로 처리';

	console.log(name);
}
scopeFn();

console.log('이 변수는 :', name);
console.log('접근 가능 :', err);

// [6] 재사용 목적 함수
// var all_elms = document.querySelector('*');
function list(selector){
	return document.querySelectorAll(selector);
}

// context가 부모
var el = function(selector, context) {
	if(!context){
		context = document;
	}

	return document.querySelector(selector);
}

var all_elms = list('*');
var figures = list('figure');
var clouds = list ('.cloud');
var boy = el('#boy');
var info = el('.info');
var kbd = el('kbd', info);

