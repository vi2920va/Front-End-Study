//-------------------------------------------------------------------------------------
// 구조 분해 할당 (Destructuring Assignment) 
//-------------------------------------------------------------------------------------
// 구조 분해 할당 구문은 배열의 값이나 객체의 속성을 별개의 변수로 추출 할 수 있는 
// JavaScrip 식(experssion) 이다.

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 

// #1. 변수의 데이터 속성 값을 각각 변수로 추출.
((global = window) => {
  return;
  var movie = {
    name: '포레스트 검프',
    director: '로버트 저메키스',
    openning: '1994-10-15',
    link: 'https://movie.naver.com/movie/bi/mi/basic.nhn?code=17159'
  };

  // 객체의 속성 할당
  var name = movie.name;
  var director = movie.director;
  var openning = movie.oppening;
  var link = movie.link;
  console.log('name : ', name);
  console.log('director : ', director);
  console.log('openning : ', openning);
  console.log('link : ', link);

  global.movie = movie;

})();

// #2. 변수 데이터 및 변수 복사
((global = window) => {
  return;
  var music = {
    title: '아무노래',
    singer: 'ZICO',
    genre: '힙합',
    link: 'https://vibe.naver.com/track/39525583'
  };
  // 변수 속성 복사
  var x = music.singer;
  console.log(x);

  global.music = music;

})();

// #3. ES5 에서 변수 및 배열을 복사 할 때 각각의 원소 값을 가져와서
// 다시 또 번거로움이 있다.

(() => {
  return;
  var utensils = ['그물국자', '건지개', '스패튤라', '뒤집개'];

  // 각 변수에 배열 utensils 원소 할당    
  var skimmer = utensils[0];
  var turner = utensils[3];

})();

// #4. JSON 객체(배열)의 원하는 데이터 값을 전달 받기 위한...
(() => {
  return;
  // JSON (배열 내부의 객체 데이터)
  var people = [{
    'gender': 'female',
    'name': 'gina reynolds',
    'email': 'qes@naver.com'
  }, {
    'gender': 'female',
    'name': 'gina reynolds',
    'email': 'qe334ewrj@naver.com'
  }];
  // 콜백 함수 매개변수로 객체를 전달 받아
  // 원하는 데이터 값을 지역 변수로 할당
  people.forEach(function (person) {
    var name = person.name;
    var email = person.email;
    console.log(name, email);
  });
})();

// #5. JSON 객체(배열)의 순서에 해당하는 변수에 할당
(() => {
  return;
  // JSON
  var people = [
    {
      "gender": "female",
      "name": "brooke fuller",
      "email": "brooke.fuller@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/women/3.jpg"
    },
    {
      "gender": "female",
      "name": "judith gerlach",
      "email": "judith.gerlach@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/women/96.jpg"
    },
    {
      "gender": "male",
      "name": "hudson lewis",
      "email": "hudson.lewis@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/men/65.jpg"
    },
    {
      "gender": "female",
      "name": "alice french",
      "email": "alice.french@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/women/37.jpg"
    }
  ];

  // JSON 객체(배열)의 순서에 해당 하는 변수 할당
  var Brooke = people[0],
    Alice = people[people.length - 1];

  // 이메일 출력 함수
  function logEmail(o) {
    // 전달받은 객체 중 email 속성 값 변수 할당
    var email = o.email;
    console.log(email);
  }

  logEmail(Brooke);
  logEmail(Alice);

})();

//-------------------------------------------------------------------------------------
// ☆ ES6 - 구조 분해 할당 (Destructuring Assignment) ☆
// 객체 속성 또는 배열 값을 변수에 할당할 때 매, 비구조화 할당을 활용하면 매우 유용하다.

// #1. movie 객체 속성을 변수명으로 사용  & IIFE 패턴 응용
/*
((global = window, { name, director, openning, link }) => {
    
    
    // 비구조화 할당 (movie 객체 속성을 변수명으로 사용.)
    // let { name, director, openning, link } = movie;

    console.log('name : ', name);
    console.log('director : ', director);
    console.log('openning :', openning);
    console.log('link : ', link);

    // (1) null을 첫 번째 인자로 전달할 경우 global 값이 기본이기 때문에
    // 값이 존재하지 않으므로 window를 사용한다.

    // (2)  두 번째 인자를 비구조화를 할당을 통해서 각각의 매개변수로 내부에서
    // 그 값을 출력할 수 있게 된다.
})(null, movie);
*/

// #2. 필요한 속성만 비구조화 할당으로 가져올 수 있다.
/*
((global=window, {title, singer}) => {
    
    console.log('title : ', title);
    console.log('singer :', singer);

}) (null, window.music);
*/

// #3. 헬퍼 함수 응용 필요한 메서드만 가져온다.(네임스페이스 사용 X)
/*
((global=window, { el, els, css, on, each, width }) => {


    on(el('body'), 'click', (e) => css(e.target, 'background', 'tan'));



}) (null, y9);
*/

// #4. 변수에 속성 복사( 변수명 : 사용 하고자하는 변수명)
// 즉 el 속성은 $ 로 사용한다는 의미.
/*
((global = window, { el: $, els: $$, css: style, on: bind, each, width }) => {

    // 변수로 사용하고자 할 경우
    let { document: doc, location: loc } = global;

    let { href, hash } = loc;

    // console.log(href);

    bind($('body'), 'click', (e) => style(e.target, 'background', 'tan'));

})(window, y9);
*/

// #5. 배열 비구조화 할당 각괄호를 사용해서 내부의 매개변수로 만들 수 있다.
// 또는 전달되는 배열 데이터를 각괄호를 사용해서 내부의 배열에 전달하므로
// 안쪽에서 매개변수로 사용할 수 있다.
(() => {
  return;
  let utensils = ['그물국자', '건지개', '스패튤라', '뒤집개'];
  let [skimmer, spoon, sptular, turner] = utensils;
  console.log(skimmer);
  console.log(spoon);
  console.log(sptular);
  console.log(turner);

})();

// #6. forEach 내부에 인자 값으로
(() => {
  return;
  // JSON (배열 내부의 객체 데이터)
  var people = [{
    'gender': 'female',
    'name': 'gina reynolds',
    'email': 'qes@naver.com'
  }, {
    'gender': 'female',
    'name': 'gina reynolds',
    'email': 'qe334ewrj@naver.com'
  }];
  // 비구조화 할당 방식을 사용하여
  // 콜백 함수 매개변수로 원하는 데이터만 받을 수 있다.
  people.forEach(({ name, email }) => {
    console.log(name, email);
  });

})();

// #7. 비구조화 할당 방식을 사용하여 JSON 객체(배열)의 순서에 해당 하는 변수를 설정.
(() => {
  return;
  // JSON
  let people = [
    {
      "gender": "female",
      "name": "brooke fuller",
      "email": "brooke.fuller@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/women/3.jpg"
    },
    {
      "gender": "female",
      "name": "judith gerlach",
      "email": "judith.gerlach@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/women/96.jpg"
    },
    {
      "gender": "male",
      "name": "hudson lewis",
      "email": "hudson.lewis@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/men/65.jpg"
    },
    {
      "gender": "female",
      "name": "alice french",
      "email": "alice.french@example.com",
      "picture": "https://randomuser.me/api/portraits/thumb/women/37.jpg"
    }
  ];

  // 객체 배열의 순서에 해당하는 변수 설정
  let [, , Fuller, Gerlach] = people;

  // 이메일 출력 함수
  function logEmail({ email }) {
    console.log(email);
  }

  logEmail(Fuller);
  logEmail(Gerlach);
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

  let _members = Symbol('members');
  const communityManager = {
    [_members]: [],
    init(members, cb = () => { }) {
      this.fetch(members)
        .then(data => this[_members] = data)
        .then(() => cb());
    },
    getMembers() {
      return this[_members];
    },
    addMembers(newbee, cb = () => { }) {
      this.fetch(newbee)
        .then(data => this[_members] = [...this[_members], ...data])
        .then(() => cb());
    },
    fetch(id) {
      return fetch(`https://api.myjson.com/bins/${id}`).then(response => response.json());
    }
  };

  global.y9 = { $, $$, type, makeArray, communityManager };

})();


// ——————————————————————————————————————
// DOM 스크립팅
// ——————————————————————————————————————


/// 비구조화 할당 방법을 사용하여
/// y9 객체의 속성을 선택적으로 매개변수에 할당하여 사용해봅니다.
((global = window, y9 = window.y9) => {

  let members = ['8zt2r', '1f9l0z', '12cowz'];
  let count = 0;

  let { communityManager: cm, $, type } = y9;
  cm.init(members[count++], init);

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
    cm.addMembers(members[count++], render.bind(undefined, 'update'));
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
    if (type(members[count]) === 'undefined') {
      addButton.setAttribute('disabled', 'disabled');
    }
  }

})();