//-------------------------------------------------------------------------------------
// 항상된 객체 표기법 (Object Enhancements) 
//-------------------------------------------------------------------------------------
// (1) 간추린 메서드(Abbreviated method) 표기법
//  메서드 선언에서 function 키워드를 생략할 수 있도록 기능 확장.

// (2) 계산된 속성 이름 동적(Computed Dynamic Property Name) 설정
(() => {
    return;
    /* ES5
    var i = 0;
    var index = 'index_';
    var obj = {};

    obj[index + ++i] = i; // index_1:1
    obj[index + ++i] = i; // index_2:2
    obj[index + ++i] = i; // index_3:3
    console.log(obj);
 */
    let i = 1;
    let index = 'index_';
    let obj = {
        [`${index}${++i}`]: i, // index_1:1
        [`${index}${++i}`]: i, // index_2:2
        [`${index}${++i}`]: i  // index_3:3
    };
    console.log(obj);

})();
// 위의 코드를 보면 이전까지는 객체 리터럴 안에서 대괄호 표기법을 사용할 수 없었기에 객체 
// 리터럴과는 별도로 선언한 후 결합하는 방식으로 사용했어야 했다. 하지만 ES6 부터는 객체
// 리터럴을 별도 생성 할 필요 없이 생성 단계 에서 동적 생성 할 수 있다.
// (객체 안에서 대괄호 표기법을 사용할 수 있다.

// (3) 비공개(private) 멤버 
// JavaScript는 별도의 비공개(private)를 지원하지 않아서, 이름 작성 시 _ 기호를 붙여 암시한다

// (4) 객체 속성 및 활용 방법 향상

// (5) 심볼(Simbol)
// 고유하고 수정불가능한 데이터 타입이며, 주로 객체 속성(object Property)들의 식별자로 사용된다.

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 

// #1. function 키워드를 사용한 메서드 정의, 객체의 속성 접근
(() => {
    return;
    var name = 'SM7', maker = 'Samsung';
    var boost = function () { };

    //car 객체 정의
    var car = {
        go: function () { },
        stop: function () { },
        boost: boost
    };

    // mixin(객체 합성) 함수
    function mixin() {
        var objs = Array.prototype.slice.call(arguments);
        var mixin_o = {};
        objs.forEach(function (o) {
            for (var p in o) {
                var v = o[p];
                if (o.hasOwnProperty(p)) {
                    mixin_o[p] = v;
                }
            }
        });
        return mixin_o;
    }
    // car 객체 능력을 복사 한 후, 
    // 자시만의 속성을 가진 객체 정의
    var newbee = mixin(car, {
        name: name,
        maker: maker
    });

    console.log(newbee);
})();

//-------------------------------------------------------------------------------------
// ☆ ES6 - 항상된 객체 표기법(Object Enhancements)☆

// #1. 간추린 메서드, 계산된 속성 이름 동적 설정
(() => {
    return;
    let name = 'SM7', maker = 'Samsung', boost = 'powerUp';
    // car 객체 정의(항상된 객체 표기법 활용)
    const car = {
        // 메서드
        go() { },
        // 계산된 속성(Computed Proterty)
        ['stop']() { },
        [boost]() { },
    };

    //car 객체 능력을 복사 한 후,
    // 자신만의 속성을 가진 객체 정의
    const newbee = {
        // 속기형 객체 속성 추가 방법
        name, maker,
        // 프로토타입 객체 상속
        __proto__: car,
        // 동적 계산된 속성(Dynamic Cumputed Property)
        //'SM8SamsungPowerUp'
        [`${name.replace(7, 8)}${maker}${boost.slice(0, 1).toUpperCase() + boost.slice(1)}`]() { }
    }
    console.log(newbee);

})();


// #2. get, set, private 아래의 코드는 비공개 속성임을 암시하는 
// 언더스코어가 있지만, 접근이 불가능 한 것은 아니다.
/*
{
    let name = 'Explorer', maker = 'FORD', boost = 'powerUP';

    // public
    const ford_car = {
        // private
        _wheel: 4,

        // 게터(getter)
        get wheel() {
            return this._wheel;
        },
        // 세터(setter)
        set wheel(new_wheel) {
            this._wheel = new_wheel;
        },
        go() { },
        ['stop']() { },
        [boost]() { },
    };
    ford_car.wheel = 7;
    console.log(ford_car.wheel);
};
*/

// #3. private을 보완하기 위해서 IIFE과 클로저를 사용해야된다. 
// 그러면 더 이상 외부에서 _wheel에 접근 할 수 없게 된다.
(global => {
    return;
    let name = 'Explorer', maker = 'FORD', boost = 'powerUP';
    //private
    let _wheel = 4;

    // public
    const ford_car = {
        // 게터(getter)
        get wheel() {
            return _wheel;
        },
        // 세터(setter)
        set wheel(new_wheel) {
            _wheel = new_wheel;
        },
        go() { },
        ['stop']() { },
        [boost]() { },
    };

    window.ford_car = ford_car;


})(window);

// #4. 심볼의 생성
// Symbol ()
// Symbol.for ()  : 전역에서 접근 가능한 Symbol
// Symbol.keyfor () : 전역에 접근 가능한 Symbol의 키 값을 가져오고 싶을 경우 사용.


((global = window) => {
    return;
    //심볼(Simbol) 등록

    // 심볼 식별자를 사용해서 내부의 _wheel 변수에 참조시킨다.
    let _wheel = Symbol('wheel');

    global.car = {
        // 등록된 심볼을 속성으로 사용
        // 객체에서 계산된 속성 방식을 사용해서 내부에 심볼 값을 참조한 속성을 만들고
        // 초기값을 설정할 수 있다.

        [_wheel]: 4,

        // 외부에서 심볼 데이터 값에 접근가능(출력 또는 설정)
        // 또한 get, set를 사용해서 내부의 심볼 값을 출력하거나 설정할 수 있다. 
        get wheel() {
            return this[_wheel]; // 심볼 반환
        },
        set wheel(new_wheel) {
            if (typeof new_wheel !== 'number') {
                throw new Error('전달 인자 유형은 숫자여야 한다.');
            }
            // 계산된 값을 심볼에 할당
            this[_wheel] = new_wheel > 4 ? new_wheel : 4;
        }
    };
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
    
    let _members = Symbol('_members');


    /// 객체의 속성 및 메서드를 
    /// 향상된 ES6 객체 표기법으로 변경해봅니다.
    /// 그리고 Symbol을 사용해 
    /// 객체의 속성을 비공개로 만들어 봅니다.
    const communityManager = {
        [_members] : [],
        init (members, cb = ()=> {}) {
            this.fetch(members)
                .then(data => this[_members] = data)
                .then(() => cb());
        },
        getMembers () {
            return this[_members];
        },
        addMembers (newbee, cb = ()=> {}) {
            this.fetch(newbee)
                .then(data => this[_members].push(...data))
                .then(() => cb());
        },
        fetch (id) {
            return fetch(`https://api.myjson.com/bins/${id}`).then(response => response.json());
        }
    };

    global.y9 = { $, $$, type, makeArray, communityManager };

})();



// ——————————————————————————————————————
// DOM 스크립팅
// ——————————————————————————————————————
((global = window, y9 = window.y9) => {

    let members = ['8zt2r', '1f9l0z', '12cowz'];
    let count = 0;

    y9.communityManager.init(members[count++], init);

    // DOM 객체 참조 변수
    let cardContainer = y9.$('.card-container'),
        addButton = y9.$('.add-button');


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
        y9.communityManager.addMembers(members[count++], render.bind(undefined, 'update'));
    }

    function render(state) {
        let template = '';
        y9.communityManager.getMembers().forEach(member => {
            // HTML 템플릿 + 데이터 바인딩
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
        if (y9.type(members[count]) === 'undefined') {
            addButton.setAttribute('disabled', 'disabled');
        }
    }

})();