//-------------------------------------------------------------------------------------
// 클래스(Class / Exntends) 
//-------------------------------------------------------------------------------------
// (1) class 선언(declaration)은 프로토타입(원형) 기반 상속을 사용하여 주어진 이름으로
//     새로운 클래스를 만든다.
// (2) class 식(expression)을 사용하여 클래스를 정의할 수도 있다.

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 

// #1. ES5 객체지향 구조 VS ES6 클래스 객체지향 구조
(() => {
  return;
  // ES5
  function Dom(el) { this.el = el; }

  Dom.createEls = function () { };
  Dom.prototype.init = function () { };
  Dom.prototype.bind = function () { };

  // ES6
  class Person {
    // 생성자 (클래스를 통해 객체를 생성할 때 즉시 실행)
    constructor(el) { this.el = el; }

    // 스태틱 메서드(클래스 메서드)
    static createEls() { }

    //인스턴스 메서드
    // prototype.init
    init() { }
    bind() { }
  }

})();

// #2. ES5 프로토타입 기반의 객체지향 프로그래밍
(function () {
  return;
  'use strict';

  // 비공개(Private) 멤버
  var _origin = '에티오피아';

  // 생성자(Constructor) 함수
  function Coffee(bean) {

    // 공개(Public) 멤버
    this.bean = bean;

  }

  // 스태틱(Static) 메서드
  Coffee.origin = function () { return _origin; };

  // 프로토타입(Prototype) 객체
  // 인스턴스(Instance) 메서드
  Coffee.prototype.parch = function (time) { };

})();

// #3. 프로토타입 기반 상속
(() => {
  return;
  // Coffee 생성자 함수
  function Coffee(bean) { this.bean = bean; }
  // Coffee 프로타입 객체 메서드
  Coffee.prototype.parch = function (hour) { console.log(hour + '시간 만큼' + this.bean + '을 볶다.'); };

  // Latte 생성자 함수 (Coffee 생성자 능력 상속)
  function Latte(bean, milk) {
    // super 호출
    Coffee.call(this, bean);
    this.milk = milk;
  }
  // Coffee 프로토타입 객체 상속
  Latte.prototype = Object.create(Coffee.prototype);
  // Latte 생성자 재정의
  Latte.prototype.constructor = Latte;

  // 메서드 오버라이드
  Latte.prototype.parch = function (hour) {
    Coffee.prototype.parch.call(this, hour / 2);
    console.log((hour / 4) + '시간 만큼' + this.milk + '를 넣고 끓인다.');
  };

})();

//-------------------------------------------------------------------------------------
// ☆ ES6 (Class / Extends) ☆ 

// #1. 클래스(Class)문법을 사용한 JavaScript 객체 지향 프로그래밍(Sugar Syntax)
(() => {
  return;
  // 비공개 멤버
  let _origin = '에티오피아';

  // 클래스
  class Coffee {
    // 생성자
    constructor(bean) {
      // 공개 멤버
      this.bean = bean;
    }
    // 스태틱 메서드
    static origin() {
      return _origin;
    }
    // 인스턴스 메서드
    parch(time) { console.log(`${time} 동안 말린다.`); }
  }

  let arb = new Coffee('abrabica');
  console.log(arb);
  console.log(arb.parch(3000));
  // 비공개 멤버이기 때문에 _origin 으로는 접근할 수 없다.
  console.log(Coffee.origin());

})();

// #2. Class 문법 특성
(() => {
  return;
  // (1) 콤마(,)를 사용하면 문법 오류
  class Todo {
    // (2) class 내부에 변수를 정의 할 수 없다.
    // let _todo = null;
    constructor() { }
    static checkComplete() { }
    addTask() { }
  }

  let todo = new Todo();
  console.log('Task type of : ', typeof Todo);
  console.log(todo instanceof Todo);
  console.log(todo.addTask === Todo.prototype.addTask);

  // (3) 클래스 식(expression) 으로 변수에 참조 가능 하다.
  const Person = class {
    constructor() { }
    static Personstatic() { }
    addPerson() { }
  }

  let personal = new Person();
  console.log(personal instanceof Person);
  console.log(personal.addPerson === Person.prototype.addPerson);

  // (4) 클래스는 호이스트 되지 않는다, 클래스 선언 이전에 사용하면 참조 오류 발생
  // Uncaught ReferenceError : Bread is not defined
  // new Bread();
  // class Bread { }

  // 빵(Bread) 클래스 선언
  const Bread = class { };
  // 잼(Jam)  클래스 선언
  const Jam = class { };

})();

// #3. ES6 관례적인 이름 규칙 활용 
(() => {
  return;
  class Coffee {

    constructor(bean, type) {
      // 공개 데이터
      this.bean = bean;

      // 비공개 데이터
      // : 관례적인 이름 규칙일 뿐, 데이터가 안전하게 보호되지 않는다.
      this._type = type;
    }
  }

  window.Coffee = Coffee;

  let arb = new Coffee('아라비카', '로스팅');
  // public
  console.log(arb.bean);
  // private 비공개 임에도 불구하고 접근 가능...
  // 이름만 암묵적으로 접근 하지말라는 표시...
  console.log(arb._type);

})();

// #4. 다양한 비공개 데이터 관리 방법(Private Data) - Object.assign() 활용
(() => {
  return;
  class Coffee {

    constructor(bean, type) {
      // 비공개 데이터 관리
      // : 완전한 데이터 비공개 관리가 가능하나, 메모리 누수가 발생한다.
      Object.assign(this, {
        getBean() {
          return bean;
        },
        getType() {
          return type;
        }
      });
    }
  }

  const ros = new Coffee('arabica', 'rosting');
  console.log(ros);
  // getBean, getType 메서드를 사용해지만 값을 얻을 수..
  console.log(ros.getBean());
  console.log(ros.getType());
  // Bean, Type은 전달되는 시점에서 보호된다.
  console.log(ros.bean); // undefiend

})();

// #4-1. 다양한 비공개 데이터 관리 방법(Private Data) - Symbol + Getter/Setter 활용
(() => {
  return;
  // 심볼
  let _bean = Symbol('bean');

  class Coffee {
    constructor(bean) {
      // 비공개 데이터 관리
      // - 기본적으로 데이터 안전이 보장되나, 완전히 보호 되지는 않음.
      // - Reflect.ownKeys()로 확인이 가능하기 때문. 
      this[_bean] = bean;
    }
    get pea() {
      return this[_bean];
    }
    set pea(new_bean) {
      this[_bean] = new_bean;
    }
  }

  const ross = new Coffee('rosting');
  // Coffe 내부에 데이터 접근 불가능(개발자 모드에서 확인!)
  // ross[_bean], ross.bean

  // Coffee 내부에 데이터 추출 방법. 
  // console.log(ross.pea);

  // 값 설정
  ross.pea = 'arabica';
  console.log(ross.pea);

  window.Coffee = Coffee;

})();

// #4-2. 다양한 비공개 데이터 관리 방법(Private Data) -위크맵 활용
(() => {
  return;
  // 위크맵
  let _bean = new WeakMap();

  class Coffee {
    constructor(bean) {
      // 완벽한 보호가 가능하다, 다만 코드가 우아하지 않다.
      _bean.set(this, bean);
    }
    get pea() {
      return _bean.get(this);
    }
    set pea(new_pea) {
      _bean.set(this, new_pea);
    }
  }
  const ts = new Coffee('tasting');
  console.log(ts);

  ts.pea = 'delicious';
  console.log(ts.pea);

  window.Coffee = Coffee;

})();

// #4-3. 다양한 비공개 데이터 관리방법이 있지만 IIFE 패턴을 사용해서 지역변수로
// 사용해도 된다. (이 코드는 올바르지 않은 방법으로 정정.)
(() => {
  return;
  // 기존 방식은 적절치 않다. 위크맵으로 변경해야 올바르다. 
  let _bean = null;

  class Coffee {
    constructor(bean) {
      // 비공개 변수에 데이터 값 할당
      _bean = bean; // 생성 모든 객체가 _bean을 참조
    }
    get pea() {
      return _bean;
    }
    set pea(new_pea) {
      _bean = new_pea;
    }
  }
  const tts = new Coffee('tasting');
  console.log(tts);

  // 하지만 내부 비공개 변수 직접 접근 불가능
  tts.pea = '테이스팅';
  console.log(tts.pea);

  // 인스턴스를 여러 개 만들 때 문제점
  // let 변수를 사용하는 것은 올바르지 않다.
  let a = new Coffee('alpha');
  a.pea = 'alpha';

  let b = new Coffee('beta');
  b.pea = 'bata'; // b 가 객체 생성 되면서 기존 pea 값이 수정...

  console.log(b.pea); // bata
  console.log(a.pea); // bata

})();

// #5. 클래스 기반 상속
(() => {
  return;
  // Coffee 클래스
  class Coffee {
    constructor(bean) { this.bean = bean; }
    parch(time) { console.log(`${time}만큼 ${this.bean}을 볶다`); }
  }

  // Latte 클래스 (Coffee 클래스 상속)
  // extends 키워드로 상속 받고 super를 써야 된다.
  class Latte extends Coffee {
    constructor(bean, milk) {
      super(bean);
      this.milk = milk;
    }
    // 메서드 오버라이드

    parch(hour) {
      super.parch(hour / 2);
      console.log(`${hour / 4}시간 만큼 ${this.milk}를 넣고 끓인다.`);
    }
  }
  console.log(Object.getPrototypeOf(Latte) === Coffee); // true
  console.log(Latte.__proto__ === Coffee); // true
})();

// #5-1. 클래스 기반 상속
(() => {
  return;
  class Projects {
    constructor(name) { this.name = name; console.log('projects'); }
    goAHead() { console.log(`${this.name} 프로젝트를 추진하다.`); }
    getDeadline() { return 1; }
  }
  // 상위 클래스와 하위 클래스가 생성자 가지고 있을때는 반드시 super 해야 된다.
  class HardWareProjects extends Projects {
    constructor(name, deadline) {
      super(name);
      this.deadline = deadline;
      console.log('HW Projects');
    }

    // 오버라이딩(Overriding)
    goAHead() {
      super.goAHead();
      console.log(`${this.deadline}  안에 추진한다.`);
    }
    // 상위 클래스 인스턴스 메서드를 상속 받으면서 필요한 경우 재정의 한다.
    getDeadline() {
      console.log(` 프로젝트 기한은 ${super.getDeadline() + this.deadline}년 입니다.`);

    }
  }

  const carEngineProject = new HardWareProjects('자동차 엔진 개발', 4);
  console.log(carEngineProject);
  console.log(carEngineProject.getDeadline());

})();

// #5-2. 클래스 기반 상속 - Object.setPrototypeOf() 활용
(() => {
  return;
  // Espresso 객체(클래스가 아니다.)
  const Espresso = {
    mix() { console.log('믹스(Mix)'); }
  }

  // CafeMocha 클래스
  class CafeMocha {
    constructor(bean, milk, chocolate) { }
  }
  // Object.setPrototypeOf()를 사용한 객체 상속 - 일반 객체를 상속 받게 구현
  Object.setPrototypeOf(CafeMocha.prototype, Espresso);

  // CafeMocha 객체 생성 후,
  let cafemocha = new CafeMocha();

  // Expresso 객체로 부터 상속 받은 mix () 메서드 사용 가능
  cafemocha.mix();
})();

// #5-3. 클래스 기반 상속 - Object.setPrototypeOf() 활용
(() => {
  return;
  const Coffe = {
    bean: 'arabica',
    parch(time) { console.log(`${time}만큼 ${this.bean}을 볶다.`); }
  };

  const Latte = {
    milk: 'shake',
    blend(source) { console.log(`${source}와 ${this.milk} ${this.bean}을 혼합한다.`); }
  };
  // 상속 구현
  Object.setPrototypeOf(Latte, Coffe);
  // Coffe 객체에 bean 값을 변경하게 되면 Latte는 Coffe를 상속 받았기 때문에
  // Latte 또한 bean 값이 변경된다.
  Coffe.bean = 'Black-Eyed Peas';

  // Object.defineProperty 을 사용해 Coffe 새로운 능력을 추가.
  Object.defineProperty(Coffe, 'caffeine', { value: '40mg' });

  console.log(Latte.parch('10초'));
  console.log(Latte.blend('초콜릿'));
  console.log(Latte.caffeine);

})();


// ——————————————————————————————————————
// 유틸리티 라이브러리
// ——————————————————————————————————————
((global = window) => {

  let toString = Object.prototype.toString;
  let slice = Array.prototype.slice;
  let $ = (selector, context = document) => context.querySelector(selector);
  let $$ = (selector, context = document) => context.querySelectorAll(selector);
  let type = o => toString.call(o).toLowerCase().slice(8, -1);
  let makeArray = o => slice.call(o);

  global.y9 = { $, $$, type, makeArray };

})();


// ——————————————————————————————————————
// 클래스
// ——————————————————————————————————————
((y9 = window.y9) => {


  /// ES6 클래스 문법을 사용하여 아래 코드를 수정해보세요.
  let _members = Symbol('members');

  class communityManager {
    constructor() {
      this[_members] = [];
    }
    init(members, cb = () => { }) {
      this.fetch(members).then(data => this[_members] = data).then(() => cb());
    }
    getMembers() { return this[_members]; }
    addMembers(newbee, cb = ()=> {}) {
      this.fetch(newbee)
      .then(data => this[_members].push(...data))
      .then(() => cb());
    }
    fetch(id) {
      return fetch(`https://api.myjson.com/bins/${id}`).then(response => response.json());
    }
  }
  // const communityManager = {
  //   [_members]: [],
  //   init(members, cb = () => { }) {
  //     this.fetch(members)
  //       .then(data => this[_members] = data)
  //       .then(() => cb());
  //   },
  //   getMembers() {
  //     return this[_members];
  //   },
  //   addMembers(newbee, cb = () => { }) {
  //     this.fetch(newbee)
  //       .then(data => this[_members] = [...this[_members], ...data])
  //       .then(() => cb());
  //   },
  //   fetch(id) {
  //     return fetch(`https://api.myjson.com/bins/${id}`).then(response => response.json());
  //   }
  // };

  y9.communityManager = new communityManager();

})();



// ——————————————————————————————————————
// DOM 스크립팅
// ——————————————————————————————————————
((global = window, { communityManager: manager, $, type } = window.y9) => {

  let members = ['8zt2r', '1f9l0z', '12cowz'];
  let count = 0;

  manager.init(members[count++], init);

  // DOM 객체 참조 변수
  let cardContainer = $('.card-container'),
    addButton = $('.add-button');

  // 초기화 함수
  function init() {
    render();
    bind();
  }

  function bind() {
    addButton.addEventListener('click', e => {
      e.target.classList.add('is-loading');
      update();
    });
  }

  function update() {
    manager.addMembers(members[count++], render.bind(undefined, 'update'));
  }

  function render(state) {
    let template = '';
    manager.getMembers().forEach(member => {
      template += `
        <div class="card column is-6-tablet is-4-desktop">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-80x80">
                  <img src="${member.picture}" alt="${member.name}">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">${member.name} | ${member.gender}</p>
                <p class="subtitle is-6">@${member.email}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    cardContainer.innerHTML = template;

    if (state === 'update') {
      updateAddButtonState();
    }
  }

  function updateAddButtonState() {
    addButton.classList.remove('is-loading');
    // 더 이상 불러올 데이터가 없을 경우
    if (type(members[count]) === 'undefined') {
      addButton.setAttribute('disabled', 'disabled');
    }
  }

})();