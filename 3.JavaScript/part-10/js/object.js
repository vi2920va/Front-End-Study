// -----------------------------------------------------
// 객체의 속성과 메서드
// -----------------------------------------------------

// JavaScript의 모든 객체들은 Object의 자손입니다.

// console.dir(Number) - JavaScript 객체의 속성들 출력
// prototype -> proto : Object

// 객체 생성
// {} 또는 new Object()
// var o = { };

// 객체 속성 추가
// o.name = '객체';

// 객체 속성 지우기
// delete o.name;

// 손홍민 선수 정보를 담은 객체 생성
// 출처: https://goo.gl/VxH57C




// 속성을 객체가 소유했는지 여부 확인
// 'property' in object
'nickname' in hm_son7; // true

// 객체의 속성 순환 
// for ~ in 문 사용
// 객체 순환을 '열거(enumerable) 한다' 라고 뜻한다.
// 즉, 열거 가능 하다는 의미는 세부의 속성들을 셀 수 있다를 뜻한다.

for (var prop in hm_son7) {
  // console.log(prop, ':', hm_son7[prop]);
}

// 객체 병합(Mixins)
// 여러 개의 객체를 합쳐 새로운 객체를 반환하는 헬퍼 함수

var mixin = function () {
  var mixin_obj = {};
  for (var i = 0, l = arguments.length; i < l; ++i) {
    var o = arguments[i];
    for (var key in o) {
      var value = o[key]; // 객체의 key를 순환
      //단 객체는 상속 받았을 수 있기 때문에 조건문을 사용해 for in인 돌 때
      // 자신의 조상의 능력은 복제 하지 않고 hasOwnProperty를 사용해서
      // 자기 자신만 복제하는 기능을 사용할 수 있다. 그래야 거슬러 올라가서 체이닝 하지 않는다.
      if (o.hasOwnProperty(key)) { mixin_obj[key] = value; } 
    }
  }
  return mixin_obj;
};

var car = {
  type: 'normal',
  wheels: 4,
  handle: 1,
  mirrors: { side: 2, back: 1 },
  engine: '3000cc',
  weight: '313kg',
  booster: false
};

var extend_car_features = {
  type: 'super',
  wheels: 6,
  booster: true,
  engine: '4497cc',
  weight: '452kg',
  maximum: {
    power: '2248 horse-power, 21800 rpm',
    torque: '194kgm, 17100 rpm',
    speed: '695km + alpha'
  }
};

var super_car = mixin(car, extend_car_features);
// console.log(super_car);

// -----------------------------------------------------
// Object 생성자 함수의 메서드 (Static Methods)
// Object는 다양한 정적 메서드를 가지고 있다. 
// 정적 메서드는 객체를 생성하지 않고 사용 할 수 있다.

// [객체 속성 정의]
// 객체 및 속성(property)을 갖는 새 객체를 만듭니다.

// Object.create()

// Object.create()를 사용하게 되면 새로운 객체를 생성 할때 create 내부에 전달
// 되는 객체의 능력을 새롭게 생성 되는 객체가 물려 받게 할 수 있다. 상속을 
// 구현 할 수 있다. 
// (단, 새롭게 생성된 객체에 속성 값을 설정 해도, 상속을 해준 부모의 값을 변하지 않는다.)

var x = Object.create(car);
x.wheels = 10;
console.log(x.hasOwnProperty('wheels'));

// [객체 속성 정의]
// 객체에 직접 새로운 속성을 정의하거나 
// 이미 존재하는 객체를 수정한 뒤 그 객체를 반환
// Object.defineProperty(obj, property, descripter)

// JavaScript 객체는 상당히 쉽게 개발 할 수 있다. (객체 정의, 객체 속성 추가, 속성 제거) 등
// 이 의미는 그만큼 위험하다는 걸 뜻한다. 누구나 다 객체를 마음대로 조작 할 수 있기 때문이다.
// 그러므로 보다 정밀 하기 위해서 Object.defineProperty(obj, property, 기술자(descripter))
// 메서드를 사용해야 한다. 


// Object.defineProperty(x, 'name', { value: 'mouse' });
// delete x.name; // false
// x.name = 'desktop'; // flase


/*
// 속성 기술자(Property descriptors)
descripter: {

  // ------------------------------------------------------
  // 데이터 기술(Data descriptors)
  // ------------------------------------------------------
  writable: false,     // 할당 연산자(=)를 통한 값 변경 가능 여부
  enumerable: false,   // 객체의 속성으로 열거 가능 여부
  configurable: false, // 객체의 속성 제거 가능 여부
  value: undefined,    // 객체 속성 값 설정

  // ------------------------------------------------------
  // 데이터 접근 기술(accessor descriptors)
  // ------------------------------------------------------
  // 속성의 값을 얻는 목적으로 사용되는 getter용 함수로
  // 함수의 반환 값이 객체 속성 값이 됩니다.
  // ※ value, get 을 동시에 사용하면 오류가 발생됩니다.
  get: undefined,
  // 속성의 값을 설정하기 위한 setter용 함수로
  // 오직 하나의 인자를 받으며, 속성의 값으로 할당합니다.
  set: undefined,

}
*/



// ------------------------------------------------------
// 데이터 기술(Data descriptors)
// ------------------------------------------------------
//  writable은 열거 가능한지 설정한다.
Object.defineProperty(x, 'use', {
  value: 'office',
  writable: true,
});

x.use = 'home';

// configurable을 true로 설정해서 속성 값이 제거 가능하다.
Object.defineProperty(x, 'getUse', {
  value: function () { return this.use; },
  configurable: true,
  enumerable: true,
});

x.getUse();
x.use = 'school';

// 열거 가능한지 확인 for ~ in문을 사용하면 된다.
// getUse는 enumerable 값이 true 여서 열거 가능하다.
for (var p in x) {
  console.log('p', p);
}

//delete x.getUse; // true

// ------------------------------------------------------
// 데이터 접근 기술(accessor descriptors)
// ------------------------------------------------------
(function () {
  var display = 'block';

  Object.defineProperty(x, 'display', {
    get: function () { console.log('getter'); return display; }, // return 값을 설정하고, value와 함께 사용할 수 없다.
    set: function (value) { console.log('setter'); display = value; } // value 대신 set를 사용한다. value는 한 개만 설정할 수있다.
  });

}());

x.display;

(function () {
  var visible = true;

  Object.defineProperty(x, 'visible', {
    get: function () { console.log('getter'); return visible; },
    set: function (value) { console.log('setter'); visible = value; }
  });

}());

x.visible;
x.visible = false;

// Object.defineProperties(obj, props)
// 이미 존재하거나 새로운 프로퍼티들의 각종 속성들을 재정의할 수 있습니다.
(function () {

  var pad = 0;
  Object.defineProperties(x, {
    margin: {
      value: '외부 여백'
    },
    padding: {
      get: function () { return pad; },
      set: function (value) { pad = value; }
    }
  });
}());

x.padding = 100;
// delete x.padding; // flase

// [객체 확장 차단]
// 새로운 속성을 추가하지 못함. (지우는 것은 가능)
// Object.preventExtensions()
// Object.isExtensible()

// 객체의 차단을 막음
Object.preventExtensions(car);

car.names = 'hi'; // undefiend

// 객체의 차단 여부를 확인
Object.isExtensible(car); // flase

// 새로운 속성을 추가를 막는 것 뿐, 삭제 하는 걸 막는건 아니다.
delete car.name; // true


// [객체 밀봉(시얼링, Sealing)]
// 객체를 밀봉하면 새로운 속성을 추가할 수 없고, 
// 모든 속성을 설정 불가능 상태로 만들어줍니다.
// 하지만 쓰기 가능한 속성의 값은 밀봉 후에도 
// 변경할 수 있습니다.
// Object.seal()
// Object.isSealed()

// 밀봉 상태를 확인 할 수 있다. 이때 밀봉된 상태가 아니면 flase를 출력한다.
Object.isSealed(super_car); // false

// 시리얼링을 하면 모든 속성을 불가능 상태로 만든다. 
Object.seal(super_car);

// super_car.type 시리얼링은 사용해서 삭제할수 없다.
delete super_car.type; // false

// 단, 쓰기 가능한 속성은 시리얼링 후에도 변경할 수 있다.
super_car.type = 'super car';

// [객체 동결(프리징, Freezing)]
// 객체의 속성을 지우거나, 바꿀 수 없습니다.
// 밀봉 + 속성 값 변경 차단
// Object.freeze()
// Object.isFrozen()

// 동결 상태를 확인한다. 동결 상태 아니면 false를 출력한다.
Object.isFrozen(hm_son7);

Object.defineProperty(hm_son7, 'whatTypeOfPosition', {
  writable: true,
  value: function () { return this.position; }
});

hm_son7.whatTypeOfPosition(); // 윙어

// 동결 상태로 만들면 Object.isFrozen(hm_son7)는 이제 true이다.
Object.freeze(hm_son7);

// 이제 더 이상은 새로운 속성을 추가 및 제거 변경 할 수 없다.
// delete hm_son7.name; // flase
// hm_son7.victory_name = '승리'; // undefiend

// -----------------------------------------------------
// Object 객체의 인스턴스 메서드 (Instance Methods)

// .hasOwnProperty() 메서드
// 객체 자신의 속성인지를 파악할 때 사용한다.
var xx = Object.create(hm_son7);

xx.age = 32;

// xx는 age를 빼고 나머지는 자신의 속성 값이 아니다.
xx.hasOwnProperty('club'); // false
xx.hasOwnProperty('age'); // true 


// -----------------------------------------------------
// helper.js
// 참고: https://goo.gl/aCh2C5
// -----------------------------------------------------

// page 객체 생성
var page = {
  category : "javaScript",
  title : "for ~ in",
  author : "vi2920va",
  date : "2021-03-09"
};



Object.defineProperty(page, 'title', {
  writable : true,
  enumerable  : true
});


Object.defineProperty(page, 'author', {
  writable : false,
  enumerable  : false
});



for(var prop in page){
  console.log(prop, page[prop]);
}