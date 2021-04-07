//-------------------------------------------------------------------------------------
// 속기형 속성 설정 방법(Shorthand Properties)
//-------------------------------------------------------------------------------------
// 객체는 new Object(), Object.create() 또는 리터럴(literal) 표기법(initializer 표기법)을 
// 사용하여 초기화 될 수 있다. 객체 초기자(object initializer)는 0개 이상인 객체 속성명, 
// 관련값 쌍 목록입니다. ES6+ 부터 객체 초기자(initializer)에 메서드 정의를 위한 더 짧은 
// 구문이 도입되었다. 이는 메서드 명에 할당된 함수를 위한 단축이다.

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 

// #1. 데이터 접근 하려면 key 와 value 값이 동일 해야된다는 연달아 쓰는 불편함이 있다.
(() => {
    return;
    // 데이터
    var animations = ['원령공주', '센과 치히로의 대모험', '명탐정 코난', '에반게리온'];
    var movies = ['인디에나 존스', '살인자의 기억법', '범죄 도시'];
    var music = [
        {
            song: '선물',
            singer: '멜로망스'
        },
        {
            song: '파카부 (Peek-A-Boo)',
            singer: 'Red Velvet (레드 벨벳)'
        },
    ];
    // 데이터 접근(key 와 vealue 값이 동일)
    var favorites = {
        animations: animations,
        movies: movies,
        music: music
    };
    console.log(favorites);
})();

// #2. 체크 함수, 생성자 함수, 내부적으로 객체 생성
(() => {
    return;
    function isRequired(name) {
        throw new Error(name + '전달인자는 필수 입니다.');
    }

    function Mouse(name, weight, type) {
        if (!name) { isRequired('name'); }
        weight = weight || '100g';
        type = type || 'Bluetooth';

        return {
            name: name,
            weight: weight,
            type: type
        };
    }

    var magic_mouse_2 = new Mouse('Magic Mouse 2', '99g');
    var mx_ergo = new Mouse('MX ERGO', '2g');

})();

//-------------------------------------------------------------------------------------
// ☆ ES6 - 속기형 속성 설정 방법(Shorthand Properties)☆
// 객체의 속성, 값 이름이 동일할 경우 속기형 속성을 적극 활용하자.

// #1. 데이터 접근하기 위해서는 key만 사용하면 된다.
// 이때 주의 할 점은 key와 value 동일할 때만 사용해야된다
(() => {
    return;
    let singer = ['EXO', 'BTS', 'ZICO', '백예린'];
    let song = ['12월의 기적', '아무노래', '다시 난, 여기'];
    let movie = [
        {
            title: 'Frozen 2',
            ost: 'Lost in the Woods'
        },
        {
            title: 'Toy Story 4',
            ost: '넌 나의 친구야'
        }
    ];
    // 또는 개행 해서 사용 가능.   
    let approach = { singer, song, movie };
    console.log(approach);
})();

// #2. ES5(#2) 예제를 ES6 방식으로 바꾸다.
(() => {
    return;
    function isRequired(name) {
        throw new Error(`${name} 전달인자는 필수 입니다.`);
    }
    function Mouse(name = isRequired('name'), weight = '100g', type = 'Bluetooth') {
        return { name, type, weight };
    }

    let magic_mouse_2 = new Mouse('Magic Mouse 2', '99g');
    let mx_ergo = new Mouse('MX ERGO', '2g');
})();


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