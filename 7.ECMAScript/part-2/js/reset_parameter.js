//-------------------------------------------------------------------------------------
// 나머지 매개 변수(Rest Parameters) 
//-------------------------------------------------------------------------------------
// 나머지 매개 변수(Rest parameter) 구문은 정해지지 않은 수(an indefinite number, 부정수)
// 를 배열로 나타낼 수 있게 한다.
//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 
// ES5 에서는 인자의 숫자가 정해지지 않은 경우 다음과 같이 처리했다.

// #1. arguments.length를 활용해 전달된 인자의 합을 구하는 함수
// function sum() {
// arguments는 배열 객체가 아니라, 유사 배열 객체이다.
//    for (var l=arguments.length, r=0, n; (n=arguments[--l]); ) { r += n; }
//     return r; 
// }

// 전달된 인자의 개수에 상관없이 사용 가능.
// sum(1, 3, 10); // 14
// sum(29, 102, 203, 10); // 344

// #2. map 함수를 활용한 배열 복제
// var integer = [0, -10, 10];

// 배열 복제
// var copy_integer = integer.map(function (int) {
//     return int;
// });

// #3. 배열의 (역)순차 결합
(() => {
    return;
    var integer = [0, 10, 10];
    var decimal = [0.8, 0.43, 0.7823];
    var numbers = integer.slice().concat(decimal);
    console.log(numbers);
})();

// #4. 배열의 중간 삽입 결합
(() => {
    return;
    var integer = [3, 6, 9];
    var decimal = [0.9, 0.66];

    // 중간 삽입 결합 (2 번째 위치에 9에 0을 결합)
    var numbers = integer.slice(), idx = 2;
    decimal.forEach(function (dec) { numbers.splice(idx++, 0, dec) });
    console.log(numbers); // [3, 6, 0.9 , 0.66, 9]
})();

// #5. 함수 배열 연산자를 사용한 실전 예제
(() => {
    return;
    // 멤버 데이터
    var members = [
        {
            "gender": "male",
            "name": "hudson lewis",
            "email": "hudson.lewis@example.com",
            "picture": "https://randomuser.me/api/portraits/thumb/men/65.jpg"
        },
    ];

    // 새롭게 추가될 멤버 데이터
    var new_members = [
        {
            "gender": "female",
            "name": "gina reynolds",
            "email": "gina.reynolds@example.com",
            "picture": "https://randomuser.me/api/portraits/thumb/women/35.jpg"
        },
    ];

    // 커뮤니티 매니저 객체
    var communityManager = {
        _members: members,
        // ES5: addMembers 메서드 정의
        addMembers: function () {
            var new_members = [].slice.call(arguments);
            new_members.forEach(function (member) {
                this._members.push(member);
            }, this);
        }
    };

    // ES5: 새로운 멤버들 추가
    communityManager.addMembers.apply(communityManager, new_members);
    // 결과 출력
    console.log(communityManager);
})();
//-------------------------------------------------------------------------------------
// ☆ ES6 - 나머지 매개 변수(Rest Parameters)☆
// ES6 부터는 함수의 마지막 매개변수 앞에 ...를 붙여 사용하게 되면(사용자가 제공한) 모든 
// 나머지 인자를 배열로 대체한다.

// #1. ...manyMoreArgs 마지막 매개변수 나머지 매개변수로 지정.

function myFun(a, b, ...manyMoreArgs) {
    // console.log('a : ' , a); // one
    // console.log('b : ' , b); // two
    // console.log('manyMoreArgs : ', manyMoreArgs); // [three, four, five, six]

}
myFun('one', 'two', 'three', 'four', 'five', 'six');

// #2. ES6 나머지 매개변수 및 화살표 함수(식) 활용
function sum(r = 0, ...nums) { // 전달된 인자에서 첫 번째만  r 값으로 사용한다.
    // 나머지 매개변수(Rest Parameter)는 배열 객체이다.
    nums.forEach(n => r += n);
    return r;
}
sum(5, 1, 3, 10) // 19
sum(10, 29, 102, 7, 203, 10); // 361

// #3. 임의의 수에 나머지 값을 순차적으로 곱한 결과 (전개 연산자 활용)
function n_multiply(r, ...nums) {
    nums.forEach(n => r *= n);
    return r;
}
// 첫 번째 인자 값에 나머지 인자 값을 순차적으로 곱한다
n_multiply(101, 1, 2, 3); // 606

// 전개 연산자를 사용하면 첫 번째 인자를 뺀 나머지 값을 배열로 전달 가능하다.
// (배열 앞에  ... 를 사용하면 '전개 연산자' 라는 의미이다.)
n_multiply(29, ...[3, -1, 8, 2]); // -1392

//-------------------------------------------------------------------------------------
// ☆ ES6 - 전개 연산자(Spread Operator)☆
// 전개 연산자(...)는 함수 또는 배열 등에서 유용하게 활용된다.
// 배열의 사용할 경우 배열은 전개한다, 또한 함수의 매개변수에 전개 연산자를 사용할 경우,
// 나머지 매개변수는 배열으로 사용할 수 있다.

// #1. 전개 연산자를 사용한 배열 복제
(() => {
    return;
    let arr = [2, 10, 30, 10];

    // 배열 복제
    let copy_arr = [...arr];
    console.log(copy_arr);
})();

// #2. 전개 연산자 배열(역) 순차 결합
(() => {
    return;
    let integer = [0, -1, 6, 9];

    let decimal = [0.7, 12.4, 10.3];
    // 전개 연산자 앞에 ...를 배열 앞에 사용 하면 배열 원소를 전개한다.
    let numbers = [...integer, ...decimal];
    console.log(numbers);
    // 역 순차
    console.log(numbers.reverse());
})();

// #3. 전개 연산자를 사용한  배열 중간 삽입 결합
(() => {
    return;
    let integer = [3, 6, 9];
    let decimal = [0.1, 0.5];
    //중간 삽입 결합(인덱스 2번 위치에 삽입)
    let numbers = null;
    (numbers = [...integer]).splice(2, 0, ...decimal);
    console.log(numbers);

})();

// #3. 헬퍼 함수 응용한 배열 순차 & 역순차 결합
(() => {
    return;
    let integer = [0, 10, -10];
    let decimal = [0.8, 0.7, 0.6];

    function combineArrays(a, b) {
        return [...a, ...b];
    }

    function reverseCombineArrays(a, b) {
        return [...a, ...b].reverse();
    }
    let numberics = combineArrays(decimal, integer);
    let r_num = reverseCombineArrays(decimal, integer);
    console.log(numberics);
    console.log(r_num);
})();

// #4. 함수, 배열에 전개 연산자를 사용한 실전 예제
(() => {
    return;
    // 기존 데이터
    let friends = [
        {
            'name': 'junwoo',
            'age': '7',
            'phone': '-',
        }
    ];
    // 새롭게 추가 될 데이터
    let new_friends = [
        {
            'name': 'sourim',
            'age': '30',
            'phone': '010-4344-2333',
        }
    ];
    // 커뮤니티 
    let communit_friend = {
        _friends: friends,
        // ES6 add 메서드 정의
        addFriends: function (...friends) {
            this._friends = [...this._friends, ...friends];
        }
    };
    communit_friend.addFriends(...new_friends);
    console.log(communit_friend);
})();

// ——————————————————————————————————————
// 유틸리티 라이브러리
// ——————————————————————————————————————

// ES6 기본, 나머지 매개변수 및 전개 연산자를 사용해 
// 페이지의 코드를 수정해봅니다.
(global => {
    const yamoo9 = {
        $: (selector, context = document) => context.querySelector(selector),
        $$: (selector, context = document) => context.querySelectorAll(selector),
        type: o => Object.prototype.toString.call(o).toLowerCase().slice(8, -1),
        makeArray: o => [...o],
    };

    global.y9 = yamoo9;

})(window);


// ——————————————————————————————————————
// 데이터 관리
// ——————————————————————————————————————
((global, y9) => {

    const communityManager = {
        _members: [],
        init: function (members, cb) {
            this.fetch(members)
                .then(data => this._members = data)
                .then(() => {
                    y9.type(cb) === 'function' && cb();
                });
        },
        getMembers: function () {
            return this._members;
        },
        addMembers: function (newbee, cb) {
            this.fetch(newbee)
                // .then(data => this._members = this._members.concat(data))
                // .then(data => this._members = [...this._members, ...data]) 
                .then(data => this._members.push(...data))
                .then(() => y9.type(cb) === 'function' && cb());
        },
        fetch: function (id) {
            return fetch(`https://api.myjson.com/bins/${id}`).then(response => response.json());
        }
    };

    y9.communityManager = communityManager;

})(window, (window.y9 = window.y9 || {}));


// ——————————————————————————————————————
// DOM 스크립팅
// ——————————————————————————————————————
((global, y9) => {

    // 멤버 데이터
    let members = ['8zt2r', '1f9l0z', '12cowz'];
    let count = 0;

    // 커뮤니티 매니저 데이터 초기화
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

})(window, window.y9);
