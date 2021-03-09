// -------------------------------------------------------------------------
// [생성자 함수와 프로토타입 객체]
// -------------------------------------------------------------------------
// JavaScript 객체(Instance)는 생성자(Constructor) 함수를 통해 생성됩니다.
// new 연산자 뒤에 생성자 함수를 실행하면, 내장 객체 또는 사용자 정의
// 객체 인스턴스를 생성합니다.

// -------------------------------------------------------------------------
// [Object 와 Instance 의 차이점]
// -------------------------------------------------------------------------
// "인스턴스(Instance)" 라는 용어는 "객체(Object)" 와 유사하다. 다만, 의미상으로 
// "객체"는 좀 더 일반적인 의미인 반면에 "인스턴스" 라고 표현하면 "현재 생성된 바로
// 그 객체" 라는 인스턴트(instant)한 뉘앙스를 좀 더 짙게 표현할 수 있습니다.

// -------------------------------------------------------------------------
// [※ 의미 헷갈리지마! - 객체(Instance)]
// 객체(Instance)는 반드시 생성이 되어야지만 사용할 수 있다!!
// 처음에 객체가 존재하는 것 아니고, 객체를 생성하기 위해서는 "생성자 함수"를
// 사용해야 된다. (즉, 생성자 함수를 통해서 객체(Instance)가 태어나게 된다.)

// [※ 의미 헷갈리지마! - 생성자(Constructor) 함수]
// 객체(Instance)는 단순히 "생성자 함수"를 사용한다고 해서 태어나는게 아니다!!
// 반드시 new 연산자와 함께 사용해야 된다!!

// [예시]
// Constructor 생성자 함수에 new 연산자를 함께 사용하게 되면 JavaScript 엔진은
// 생성자(Constructor)를 통해서 객체(instance)를 생성해준다. 생성된 객체는 
// instance 변수에 참조해서 사용하게 된다.

// var instance = new Constructor();

// =========================================================================
// [사용자 정의 객체에 필요한 수행 단계는 다음과 같습니다.]
// (1) 함수를 작성하여 객체 타입을 정의합니다.
// (2) new 연산자로 객체의 인스턴스를 생성합니다.

// (1) 생성자 함수 정의 
// 생성자 함수는 관례적으로 첫글자를 대문자로 작성해, 일반 함수와 구분합니다.
// function Tab(el_selector) { }

function Tab(selector) {
  // this → main_tab, body_tab ...
  // 여기서 this는 생성된 객체
  this.el = document.querySelector(selector);
  // return this; 
}
// ※ JavaScript의 모든 함수 객체는 정의와 동시에 자동으로 
// 함수의 "프로토타입(Prototype) 객체"를 참조하는 속성 .prototype 을 가지게 됩니다.
// Tab.prototype 속성에 참조된 객체는 .constructor 속성을 가지며, 이 속성을 통해 
// 생성자 함수 Tab 을 참조합니다.
console.log('Tab 함수에 연결된 프로토타입 객체 참조 속성:', Tab.prototype);

// (2) 정의된 생성자 함수를 new 연산자와 함께 실행하면 객체 인스턴스를 생성합니다.
// ※ 예시 코드는 .main__tab 문자열을 전달해 문서 객체를 찾아 Tab 컴포넌트 
// 객체를 생성하는 시뮬레이션 한 것입니다.
var main_tab = new Tab('.main__tab');
var body_tab = new Tab('body');

// (3) 생성자 함수를 통해서 생성된 인스턴스를 확인하는 방법
// console.log(main_tab instanceof Tab); 
// console.log(main_tab.constructor === Tab);

// =========================================================================
// [코드 new Tab() 이 실행될 때, 다음과 같은 일이 발생합니다.]
// (1) Tab.prototype 을 상속(Inheritance)하는 새로운 객체가 하나 생성된다.

// (2) 새롭게 생성된 객체에 바인드 된 this와 함께 생성자 함수 Tab 이 호출됩니다. 
// new Tab은 new Tab() 과 동일합니다. 즉 전달인자가 없을 경우, 인자 없이 Tab이 호출됩니다.

// (3) 생성자 함수의 실행 결과, 생성된 객체는 함수의 결과물로 반환됩니다. (return 기본 값)
// 만약 명시적으로 사용자가 다른 객체를 반환할 경우, 반환 결과물을 덮어쓸 수 있습니다.

// [예시]
// 아래 코드는 모두 동일한 동작을 수행합니다.

// 전달인자 생략할 경우 괄호가 생략 가능하다.
var tab1 = new Tab;

// 전달인자가 필요한 경우에는 괄호를 꼭 사용해야된다
var tab2 = new Tab();

// 아래 코드는 전달인자를 전달해 Tab 객체가 생성되는 과정에서 사용될 수 있습니다.
var tab3 = new Tab('.main__tab');

// ※ tab1, tab2, tab3은 모두 Tab 생성자 함수를 통해 생성된 객체이며,
// Tab.prototype 객체의 속성 및 메서드를 상속 받습니다. (정확히는 객체 속성 링크)

// tab1, tab2, tab3 객체는 Tab 생성자 함수를 통해 생성 되었습니다.

var tabs = [];
tabs.push(tab1, tab2, tab3);

for (var i = 0, l = tabs.length; i < l; i++) {
 console.log('tab' + i + '.constructor === Tab:', tabs[i].constructor === Tab); // true
}

// 모두 동일한 프로토타입 객체를 상속한다.


// (1) body_constructor는 프로토타입(Prototype)객체의 능력을 빌려쓴다.
// 아래와 같은 코드는 생성자를 통해서 자신의 생성자 함수를 알 수 있다.
// var body_constructor = body_tab.constructor;

// (2) 생성자 함수는 프로토타입(prototype)을 통해서 다시 생성자 함수 연결된
// 프로토 타입 객체에 접근 할 수 있다.
// var body_constructor = body_tab.constructor.prototype;

// (3) 위와 같은 결과이지만 권장하지는 않는다.
// 그 이유는 인터넷 익스폴러는 11 버전 부터 지원하기 때문이다...
// var body_proto = body_tab.__proto__;

// (4) 그러면 사용할 수 있는 방법은 Object에 내장된 
// getPrototypeOf 메소드를 사용하면 Tab.prototype과 같다.
// var body_proto = Object.getPrototypeOf(body_tab);

var tab1_proto = tab1.constructor.prototype;
var tab2_proto = tab2.constructor.prototype;
var tab3_proto = tab3.constructor.prototype;
console.log('tab1_proto === tab2_proto:', tab1_proto === tab2_proto); // true
console.log('tab2_proto === tab3_proto:', tab2_proto === tab3_proto); // true
console.log('tab3_proto === tab1_proto:', tab3_proto === tab1_proto); // true


// 생성된 이후, 객체의 속성을 추가하게 되면 각 객체는 자신만의 속성을 가집니다.
tab1.color = 'blueviolet';
tab2.margin = '20px';
tab3.visible = false;

// 반면 Tab.prototype 객체에 추가된 속성은 공통 속성이 됩니다.(암시적 연결)
Tab.prototype.version = '0.0.1';

console.log(tab1); // Tab { color: "blueviolet", __proto__: Object }
console.log(tab2); // Tab { margin: "20px",      __proto__: Object }
console.log(tab3); // Tab { visible: false,      __proto__: Object }


// Tab 생성자 함수는 객체를 생성하는 모체 역할을 수행합니다.
// Tab.prototype 객체는 Tab 생성자를 통해 생성된 모든 객체가 공통으로 상속하는 속성/메서드 집합입니다.
// Tab 생성자는 전달 인자를 통해 객체 고유의 속성을 설정할 수 있습니다.

//////////////////
// @constructor //
//////////////////
// Pagenation 생성자 함수를 정의합니다.
// el, options 전달인자를 받을 수 있습니다.
// 전달된 인자는 생성된 객체(this)의 el, options 속성에 할당합니다.
function Pagenation(el, options) {
 // 생성자 함수에서의 this는
 // 일반 함수의 this와 달리, 생성된 객체를 가리킵니다.
 this.el = el;
 this.options = options;

 // 생성자 함수는 return을 명시하지 않아도 this를 반환합니다. (기본값)
 // 하지만 제작자는 return 을 명시함으로 이러한 설정을 덮어쓸 수 있습니다.
 return this;
}

////////////////
// @prototype //
////////////////
// Pagenation.prototype 객체에 추가된 속성(메서드)는 
// Pagenation 생성자를 통해 생성된 모든 객체의 공통 속성(메서드) 입니다.

// 첫번째 페이지로 이동하는 메서드를 정의합니다.
Pagenation.prototype.firstPage = function () { console.log('처음 페이지로 이동') };
// 이전 페이지로 이동하는 메서드를 정의합니다.
Pagenation.prototype.prevPage = function () { console.log('이전 페이지로 이동') };
// 다음 페이지로 이동하는 메서드를 정의합니다.
Pagenation.prototype.nextPage = function () { console.log('다음 페이지로 이동') };
// 마지막 페이지로 이동하는 메서드를 정의합니다.
Pagenation.prototype.lastPage = function () { console.log('마지막 페이지로 이동') };

///////////////
// @instance //
///////////////
// 생성자를 통해 생성된 객체 인스턴스는 생성 과정에서 
// 전달된 개별 인자를 통해 고유 속성 값을 가지게 됩니다.
var table_pagenation = new Pagenation(el('.table .pagenation'), { pages: 6, current: 2 });
var footer_pagenation = new Pagenation(el('.footer .pagenation'), { pages: 3, current: 0 });

var body_page = new Pagenation( document.body, {current : 0, pages : 10} );

var main_header = document.querySelector('.main-header');
var main_header_page = new Pagenation(main_header);

// table_pagenation, footer_pagenation 인스턴스는 
// .constructor.prototype 또는 .__proto__ 속성(IE <= 10 미지원)을 통해 
// Pagenation.prototype 객체에 접근할 수 있습니다.

console.log('table_pagenation.constructor.prototype:', table_pagenation.constructor.prototype);
console.log('footer_pagenation.__proto__:', footer_pagenation.__proto__);

// 보다 나은 방법은 Object.getPrototypeOf() 메서드를 사용하는 것입니다.
console.log('Object.getPrototypeOf(table_pagenation):', Object.getPrototypeOf(table_pagenation));
console.log('Object.getPrototypeOf(footer_pagenation):', Object.getPrototypeOf(footer_pagenation));



// =========================================================================
// Strict 모드
// 생성자 함수와 일반 함수를 구분할 수 없어 new 연산자 사용 없이 생성자 함수를 사용하면?
// 어떤 일이 발생할까요? ⇒ 오류도 발생하지 않고, 작동도 안되고, 전역도 오염시키게 됩니다.

// 일반 함수 VS 생성자 함수
// 일반 함수 안에서 numbers는 오염되지 않는다.
function phone(numbers) {
 console.log('phone :: this:', this);
 // numbers = numbers.replace('-', '');

 // 정규 표현식 활용
 numbers = numbers.replace(/-/g, '');
 return numbers;
}
// phone('010-2934-5858');

// 생성자 함수에서 new 를 사용하지 않고 변수를 정의 하면 전역이 오염이 된다!!!
function Phone(numbers) {
 console.log('Phone :: this:', this);
  this.numbers = numbers;
}

// var phone_number = new Phone('010-5858-6959');

// 실수 할 수 있는 코드 - 생성자 함수에 new를 생략
// var ph = Phone('011-1132-2234'); // undefined

// 생성자에 함수에 new를 쓰지 않으면 전역이 오염된다.
// Phone('019-213-4455');

// Strict 모드란?

// 아래의 코드를 보면 JavaScript 코드 내에서 ginkgo 변수를 선언한적 없는데.
// JavaScript는 오류를 발생하지 않고 문제를 조정 시킨다. (전역 오염)
// 이러한 문제점을 조정 하기 위해서는 "엄격한 모드"로 "use strict" 문자열 
// 을 사용해야 된다. 그러면 참조 오류로 이제 문제 있는 부분을 알려준다.

// (function (){
//   'use strict';
//   ginkgo = '코딩하는 개발자';

// }) ();

function looseMode() {
 looseVar = '멋대로 작동해라';
}

function strictMode() {
 'use strict';
 strictVar = '엄격하게 작동해라';
}


// strict mode를 사용해 이러한 문제를 원천 봉쇄할 수 있습니다.
function PhoneStrict(numbers) {
 'use strict';
 console.log('Phone : this:', this);
 this.numbers = numbers;
}