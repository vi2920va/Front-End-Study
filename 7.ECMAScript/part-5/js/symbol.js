//-------------------------------------------------------------------------------------
// 심볼 (Symbol) 
//-------------------------------------------------------------------------------------
// 심볼(Symbol) 데이터 타입은 ES6 이전에도 존재했지만, 이제 직접적으로 심볼을 사용할 수 있는 
// 공식 인터페이스가 제공된다. 심볼은 고유한 기본 값(primitive value)으로 수정 불가능한
// (immutable) 데이터 타입이고, 클래스나 객체의 내부에서만 접근할 수 있도록 비공개 키
// (private key)로 사용된다. 예를 들면 사용자가 정의한 클래스(custom classes)는 심볼을
// 사용해 비공개 속성(private members)을 만들 수 있다.

//-------------------------------------------------------------------------------------
// ☆ ES6 - 심볼 (Simbol)☆
//  심볼은 new Simbol 문법을 제공하지 않는다!
// Symbol()은 써드 파티(third-party) 라이브러리의 객체 혹은 네임스페이스에 충돌할 염려가 
// 없는 새로운 코드를 덧입히는데 종종 쓰인다. 

// #1. 블록 스코프 내에서만 접근 가능한 심볼
(() => {
  return;
  const _privateKey = Symbol();

  // 글로벌 공개된 클래스
  // 글로벌에 공개된 클래스
  window.FileReader = class {
    constructor() {
      this[_privateKey]();
    }
    [_privateKey]() {
      console.log('비공개 멤버로 클래스 FileReader 만 접근하여 사용 가능');
    }
  }
  const fileReader = new FileReader(); // '비공개 멤버로 클래스 FileReader 만 접근하여 사용 가능'

})();

// #2. Symbol.for(key)
(() => {
  return;
  // 글로벌 Symbol 
  const H1 = Symbol('sym');
  // 로컬 Symbol
  const H2 = Symbol.for('sym');

  // 모든 Symbol은 고유한 값은 가진다 - false
  console.log(H1 === H2);
  // Symbol 결과는 Symbol.for와 동일하지 않다 - false
  console.log(H1.for === H1);
  // Symbol.for(key)를 2번 호출하면 2번 모두 동일한 심볼 인스턴스를 반환한다 - true
  console.log(H1.for === H2.for);

  // 글로벌 심볼
  const globalSymbol = Symbol.for('y9');
  // 로컬 심볼
  const localSymbol = Symbol('y9');
  // Symbol.keyFor(globalSymbol)메서드는 전달된 글로벌 심볼의 공유 키를 검색 반환한다.
  console.log(Symbol.keyFor(globalSymbol)); // 'y9'
  console.log(Symbol.keyFor(localSymbol)); // undefined

})();

// #3. 일반적으로 심볼은 상호 운용성(Interoperability)을 위해 사용한다.
// 상호 운용성은 몇 가지 알려진 인터페이스를 포함하는 써드 파티
// 라이브러리의 객체에 인자로 심볼 멤버 형태의 코드를 사용함으로서 만족될 수 있다.
(() => {

  function reader(obj) {
    const specialRead = Symbol.for('specialRead');
    if (obj[specialRead]) {
      const reader = obj[specialRead]();
    } else {
      throw new TypeError('객체를 읽을 수 없습니다.');
    }
  }
  const specialRead = Symbol.for('specialRead');

  class SomeReadableType {
    [specialRead]() {
      const reader = createSomeReaderFrom(this);
      return reader;
    }
  }

})();
