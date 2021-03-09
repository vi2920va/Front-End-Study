// -------------------------------------------------------------------------
// JavaScript 객체 지향 프로그래밍(OOP, Object Oriented Programming) & 상속
// -------------------------------------------------------------------------

// JavaScript 객체 지향 프로그래밍에 대한 이해를 돕기 위해 가벼운 실습을 진행해봅시다.
// 
// UI 디자인과 직접적인 관련이 있는 것은 아니지만, 객체 지향 프로그래밍 이해를 위한 예제로
// 실생활 예시를 많이 듭니다. 자! 동물, 사람, 애완동물, 강아지, 고양이 각 객체를 생성하는 
// 프로그래밍이 필요하다는 미션이 주어졌습니다.

// 가장 쉬운 방법은 각 객체를 생성하는 생성자 함수를 만들고, 공통적인 부분을 생성자 함수의
// 프로토타입 객체에 설정하는 것일 겁니다. 동물, 애완동물, 고양이를 디자인(설계) 해봅시다.

(function(){
  'use strict';
  /**
   * @constructor: Animal
   * 생성자 함수: `동물`
   */
  function Animal() {
    'use strcit';
  }

  // @prototype: Animal
  // 프로토타입 객체: `동물`
  Animal.prototype.type  = '동물';
  Animal.prototype.brain = true;
  Animal.prototype.legs  = 0;
  Animal.prototype.run   = function(){};

  /**
   * @constructor: Pet
   * 생성자 함수: `애완동물`
   */
  function Pet() {
    'use strcit';
  }

  // @prototype: Pet
  // 프로토타입 객체: `애완동물`
  Pet.prototype.type  = '애완동물';
  Pet.prototype.brain = true;
  Pet.prototype.legs  = 4;
  Pet.prototype.fleas = 0;
  Pet.prototype.run   = function(){};

  /**
   * @constructor: Cat
   * 생성자 함수: `고양이`
   */
  function Cat(name, gender, color) {
    'use strcit';
    this.name   = name;
    this.color  = color;
    this.gender = gender;
  }

  // @prototype: Cat
  // 프로토타입 객체: `고양이`
  Cat.prototype.type   = '고양이';
  Cat.prototype.brain = true;
  Cat.prototype.legs  = 4;
  Cat.prototype.fleas = 4;
  Cat.prototype.run    = function(){};
  
}());


// 어떤가요? ^^ 
//
// 각 객체를 생성할 수 있는 생성자 함수와
// 공통된 속성/메서드를 관리하는 프로토타입 객체를 
// 만들어 보니 JavaScript 객체를 생성하는
// 설계에 대해 감이 좀 잡히시나요?

// 자! 감이 잡혔다면 `상속`에 대해 좀 더 이야기를 
// 나눠 봅시다. Animal, Pet, Cat 객체 관계에
// 대해 생각해보면 공통적인 부분을 발견할 수 있습니다.
//
// 생물학 시간을 떠올려보세요. 각 종의 종속 관계를
// 생각해보면 다음과 같을 거에요.
//
// Animal > Pet > Cat
//
// 쉽게 말해 Cat 종은 Animal 종에서 세부 분류되죠.
// 즉, Animal이 가진 속성/메서드는 Cat이 모두 가진다는 
// 거에요. 이럴 경우 `상속`을 활용해 효율적으로 관리할 
// 수 있습니다. 예제를 살펴봅시다. :-)

(function() {
  'use strict';
  
  /**
   * @constructor: Animal
   * 생성자 함수: `동물`
   */
  function Animal() {
    'use strcit';
  }

  // @prototype: Animal
  // 프로토타입 객체: `동물`
  Animal.prototype.type  = '동물';
  Animal.prototype.brain = true;
  Animal.prototype.legs  = 0;
  Animal.prototype.run   = function(){ return this.type + ' 달리다'; };

  /**
   * @constructor: Pet
   * 생성자 함수: `애완동물`
   */
  function Pet() {
    'use strcit';
  }

  // @inheritance: Pet ⇐ Animal
  // 상속: `동물`의 속성/메서드를 `애완동물`에게
  // Pet.prototype = Object.create(Animal.prototype);
  // Pet.prototype.constructor = Pet;

  // 헬퍼함수
  function inherit(sub_class, super_class) {
    try {
      sub_class.prototype = Object.create(super_class.prototype);
      sub_class.prototype.constructor = sub_class;
    } catch(e) {
      console.error(e.message); 
    }
  }

  // Pet ⇐ Animal 상속
  inherit(Pet, Animal);
  
  // @prototype: Pet
  // 프로토타입 객체: `애완동물`
  Pet.prototype.type  = '애완동물';
  Pet.prototype.legs  = 4;
  Pet.prototype.fleas = 0;

  /**
   * @constructor: Cat
   * 생성자 함수: `고양이`
   */
  function Cat(name, gender, color) {
    'use strcit';
    this.name   = name;
    this.color  = color;
    this.gender = gender;
  }
  
  // Cat ⇐ Pet 상속
  inherit(Cat, Pet);

  // @prototype: Cat
  // 프로토타입 객체: `고양이`
  Cat.prototype.type  = '고양이';
  Cat.prototype.fleas = 4;
  
})();


// 생성자 함수와 프로토타입 객체를 사용해 클래스(class)를
// 어떻게 설계해야 하는지 감이 왔다면 `성공`입니다. :-A

// 그런데 작성한 생성자 함수와 상속, 프로토타입 객체 코드가 
// 코드를 보다 매끄럽게 묶어서 관리하면 좋을텐데 말이죠.
// 다른 코드와 충돌 걱정 없이 오직 하나의 클래스만 
// 생각할 수 있는 그런 독립된 공간이 필요합니다.

// 가만?! 독립된 공간을 사용해 캡슐화(Encapsulation)?
// 아하! 즉시 실행 함수식(IIFE) 패턴이 있었네요!

// IIFE 패턴을 사용해 생성자 함수와 상속, 프로토타입 객체를
// 한데 묶어 관리하면 충돌 걱정도 없고 단 하나의 클래스에만
// 집중해서 개발이 가능하겠네요! 자! 어서 해봅시다.

(function(global) {
  'use strict';

  // `상속` 헬퍼함수
  function inherit(sub_class, super_class) {
    try {
      sub_class.prototype = Object.create(super_class.prototype);
      sub_class.prototype.constructor = sub_class;
    } catch(e) {
      console.error(e.message); 
    }
  }

  // @class Animal
  var Animal = (function(){
    
    // @constructor
    function Animal() {
      'use strcit';
    }

    // @prototype
    Animal.prototype.type  = '동물';
    Animal.prototype.brain = true;
    Animal.prototype.legs  = 0;
    Animal.prototype.run   = function(){ return this.type + ' 달리다'; };

    return Animal;
    
  })();

  // @class Pet
  var Pet = (function(Animal){
    
    // @constructor
    function Pet() {
      'use strcit';
    }
    
    // @inherit Animal
    inherit(Pet, Animal);

    // @prototype
    Pet.prototype.type  = '애완동물';
    Pet.prototype.legs  = 4;
    Pet.prototype.fleas = 0;

    return Pet;
    
  })(Animal);

  // @class Cat
  var Cat = (function(Pet){
    
    // @constructor
    function Cat(name, gender, color) {
      'use strcit';
      this.name   = name;
      this.color  = color;
      this.gender = gender;
    }
    
    // @inherit Pet
    inherit(Cat, Pet);

    // @prototype
    Cat.prototype.type  = '고양이';
    Cat.prototype.fleas = 4;

    return Cat;
    
  })(Pet);

  // Cat 클래스를 상속하는 새로운 서브 클래스를 만들어야 합니다.
  // 러시안 블루(Russian Blue) 고양이 종을 클래스로 만들어 봅시다.
  // 참고: https://ko.wikipedia.org/wiki/러시안_블루
  var RussianBlue = (function(Cat){
    
    // @constructor
    function RussianBlue(name, gender, color, baby) {
      'use strict';

      // 생성자 함수의 속성 상속
      // arguments는 유사 배열이므로 
      // 함수 객체의 apply() 메서드를 사용해 인자 전달 
      Cat.apply(this, arguments);

      // 자신만의 속성 추가
      this.baby = baby || [];

    }
    
    // @inhert Cat
    inherit(RussianBlue, Cat);
    
    // @prototype
    RussianBlue.prototype.type      = '러시안 블루';
    RussianBlue.prototype.origin    = '러시아(Russia)';
    RussianBlue.prototype.pattern   = '숏헤어(Shorthair)';
    RussianBlue.prototype.character = '주인이 신나면 같이 신나고, 우울하면 같이 위로해주는 감성적인 성격';
    RussianBlue.prototype.nickname  = ['아크엔젤블루(archangel blue)', '포린블루(foreign blue)'];
    RussianBlue.prototype.run       = function(who) { return (who || '주인') + '에게 달려 안긴다' };
    RussianBlue.prototype.charming  = function(who) { return (who || '주인') + '에게 애교를 부린다.' };
    
    return RussianBlue;
    
  })(Cat);

  
  // 글로벌에 `공개`  
  Object.defineProperties(global, {
    Animal      : { value: Animal },
    Pet         : { value: Pet },
    Cat         : { value: Cat },
    RussianBlue : { value: RussianBlue },
  });
  
  // 확장 및 제거 차단
  Object.freeze(Animal);
  
})(window);