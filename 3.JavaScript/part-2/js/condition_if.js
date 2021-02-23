// -------------------------------------------------------------
// 조건문 (Condition Statement)
// - 특정 조건이 참(true)인 경우 실행하는 명령의 집합
// -------------------------------------------------------------

// =======================================================
// if ~ else 문
//
// 특정 조건이 참인 경우 문장을 실행하기 위해 if 문을 사용합니다.
// 또한 선택적으로 조건이 거짓인 경우 문장을 실행하기 위해서는
// else 절을 사용합니다.

// 거짓(false)으로 판단하는 값
// false
// undefined
// null
// 0
// NaN
// ''

var x = false;

if (x == true) {
	console.log('x 가 true 일 때 실행할 문장');
} else {
	console.log('x 가 true가 아니면 실행할 문장')
}

var y = 'JavaScript'

if (y === 'HTML') {
	console.log('HTML');
} else if (y === 'CSS') {
	console.log('CSS')
} else if (y === 'C+') {
	console.log('C+')
} else {
	console.log('JavaScript!');
}

function el(selector, context){

	// context가 fasle일 때 true로 바꿔준다
	if(!context){ context = document; }

	return document.querySelector(selector);

}
