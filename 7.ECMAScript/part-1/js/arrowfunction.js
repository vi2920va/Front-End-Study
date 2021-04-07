//-------------------------------------------------------------------------------------
// 화살표 함수 식(arrow function expressoin) =>
//-------------------------------------------------------------------------------------
// 화살표 함수 식은 function 에 표현에 비해 구문이 짧고 자신의 this, arguments, super 또는
// new.target을 바인딩 하지 않는다. 화살표 함수는 항상 '익명(Anonymous)' 함수 이다.
// 이 함수 표현은 메소드 함수가 아닌 곳에 적당하다. 그래서 생성자 함수로 사용할 수 없다.

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 
// ES5 에서는 함수 선언과 함수 식에서 아래와 같이 사용했어야 했다.

// #1. 함수 선언(Declaration)
// function isType(o) { return Object.prototype.toString.call(o).toLowerCase().slice(8, -1);}

// #2. 함수 식(Expression)
// var isType = function (o) { return Object.prototype.toString.call(o).toLowerCase().slice(8, -1); };
//-------------------------------------------------------------------------------------
// ☆ ES6 - 화살표 함수식 (arrow function expression) ☆ 
// 여기서 말하는 화살표 문법은 '함수식'에서만 사용가능 하다. 즉 변수에 함수를 참조 할때만
// 사용할 수 있고, 함수 선언에서는 쓸 수 없다. function 대신 => 뚱뚱한 화살표 사용하면 된다.

//  #1. function 대신 => 사용
(() => {
    return;
    let sumNmber = (x, y) => { return x + y; };
    let r1 = sumNmber(55, 2);
    let r2 = sumNmber(100, 2);
    console.log(r1); // 57
    console.log(r2) // 102

})();

// #2. return 값을 생략한 상태에서도 심플하게 사용할 수 있다.
(() => {
    return;
    let isType = (o, type) => typeof o === type;
    let is1 = isType('hi', 'string');
    let is2 = isType(75, 'string');
    console.log(is1);
    console.log(is2);
})();

// #3. 단 , 매개 변수가 0 또는 2 개 일 수 경우 괄호 사용은 필수이다
(() => {
    return;
    let makeArray = (o) => Array.prototype.slice.call(o);
    function sum() {
        console.log(Array.isArray(arguments)); // false
        let args = makeArray(arguments);
        console.log(Array.isArray(args)); // true
    }
    sum(1, 2, 4, 5, 6, 8);
})();


// #4. 화살표 문과 식의 코드 차이점
(() => {
    return;
    let users = [
        { name: '신인기', age: 21, job: '배우', email: 'sin@kbs.com' },
        { name: '손예진', age: 34, job: '배우', email: 'son@naver.com' },
        { name: '이지아', age: 24, job: '예능인', email: '-' },
    ];

    // 사용자 업데이트
    // users 데이터를 순환 user 각 데이터 age 값 변경 후, users 덮어쓰기 -> 문(Statement)
    users = users.map(user => { // block
        user.age++;
        return user;
    });
    // 사용자 나이를 증가
    console.log(users);
    // 사용자 데이터 중 age 데이터만 뽑아 새로운 배열 데이터 ages 생성 -> 식(Expression)
    let ages = users.map(user => user.age);
    // 나이 값만 뽑아서 새로운 배열을 생성
    console.log(ages);
})();

//-------------------------------------------------------------------------------------


// ——————————————————————————————————————
// 유틸리티 라이브러리
// ——————————————————————————————————————
((global = window) => {

    // 빌트인 프로토타입 객체 메서드 참조
    let toString = Object.prototype.toString;
    let slice = Array.prototype.slice;

    // DOM 객체 수집
    let $ = (selector, context = document) => context.querySelector(selector);
    let $$ = (selector, context = document) => context.querySelectorAll(selector);

    // 타입 체크 및 변경
    let type = o => toString.call(o).toLowerCase().slice(8, -1);
    let makeArray = o => slice.call(o);

    // 데이터 관리
    const communityManager = {
        _members: [],
        init: function (members, cb = () => { }) {
            this.fetch(members)
                .then(data => this._members = data)
                .then(() => cb());
        },
        getMembers: function () {
            return this._members;
        },
        addMembers: function (newbee, cb = () => { }) {
            this.fetch(newbee)
                .then(data => this._members = [...this._members, ...data])
                .then(() => cb());
        },
        fetch: function (id) {
            return fetch(`https://api.myjson.com/bins/${id}`).then(response => response.json());
        }
    };

    /// 모듈 밖으로 내보낼 객체의 속성을 
    /// 모듈 내부에서만 접근 가능한 함수 이름을 참조하는 
    /// 이 코드를 ES6 속기형 작성 방법으로 바꿔봅시다.
    global.y9 = {
        $: $,
        $$: $$,
        type: type,
        makeArray: makeArray,
        communityManager: communityManager,
    };

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