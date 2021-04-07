//-------------------------------------------------------------------------------------
// 기본 함수 매개 변수(Default Parameter)
//-------------------------------------------------------------------------------------
// 기본 함수 매개변수를 활용하면 null 또는 undefined가 전달될 경우 매개 변수를 기본값으로
// 초기화 할 수 있다.

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 
// ES5 에서는 기본 값(default values), 정해지지 않은 인자(indefinite arguments),
// 이름이  있는 매개 변수(named parameters)를 다루는 함수 구현 방법이 너무 많았다.

// #1. 필수 인자 체크 함수
// function isRequired(name) {
//     throw new Error(name + '매개변수는 전달안지 값을 필수로 요구한다.');
// }

// #2. 사용자 전달 값 혹은 기본 매개변수 값 설정 함수
// function defaultParam(param, defaults) {
//     return typeof param !== 'undefiend' ? param : defaults;
// }

// #3. 지불 내역 계산 함수(가격, 세금, 할인)
// function calcuratePayment(price, tax, discount) {
//     if (!price) { isRequired('price'); }
//     tax = defaultParam(tax, 0.1);
//     discount = defaultParam(discount, 0);
//     return Math.floor(price * (1 + tax) * (1 - discount));
// }
//-------------------------------------------------------------------------------------
// ☆ ES6 - 기본 함수 매개 변수(Default Parameter)☆ 
// ES6 부터는 기본 값 설정 또는 초기화를 일일히 하지 않고  할당 연산자를 통해 손쉽게 사용.

// #1. 필수 인자 체크 함수
function isRequired(name) {
    throw new Error(`${name} 매개변수를 전달인자 값을 필수로 요구 한다.`);
}

// #2. 지불 내역 계산 함수 (가격, 세금, 할인) 
function calcuratePayment(price = isRequired('price'), tax = 0.1, discount = 0) {
    return Math.floor(price * (1 + tax) * (1 - discount));
}
// calcuratePayment(); // error
calcuratePayment(10000, 0.1, 0.165); // 9185


// #3. 비구조 할당(Object Destructuring, ES6) 활용 - 아직 다루지 않음.
// 지불 내역 계산 함수 (가격, 세금, 할인) 
// 객체를 기본 값으로 사용할 경우

//  function calcuratePayment({ price = isRequired('price'), tax = 0.1, discount = 0 } = {}) {
//     return Math.floor(price * (1 + tax) * (1 - discount));
// }

// calcuratePayment(); // ERROR
// calcuratePayment({ price: 10000, discount: 0.165 }); // 9185

//-------------------------------------------------------------------------------------

