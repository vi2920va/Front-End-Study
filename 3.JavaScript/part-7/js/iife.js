// -----------------------------------------------------------------------------------------
// JavaScript - 즉시실행 함수 표현식(IIFE)
// -----------------------------------------------------------------------------------------
//
// JavaScript 언어를 사용할 때, 전역을 가급적 오염시키지 않도록 노력해야 합니다.
// 전역을 오염시키지 않기 위해 사용하는 대중적인 방법으로 IIFE 패턴이 있습니다.

// 이는 Self-Executing Anonymous Function 으로 알려진 디자인(설계) 패턴이며, 크게 두 부분으로 구성됩니다. 

// 첫 번째는 
// 괄호((), Grouping Operator)로 둘러싸인 익명함수(Anonymous Function)입니다.
// 이는 전역범위를 오염시키는 것 뿐만 아니라 IIFE 내부의 변수에 접근하는 것을 방지합니다.

// 두 번째는 
// 즉시 실행 함수를 실행하는 괄호() 입니다. 이를 통해 자바스크립트 엔진은 함수를 '즉시 해석'해서 실행합니다.
// IIFE를 변수에 할당하면 IIFE 자체는 저장되지 않고, 함수가 실행된 결과만 저장됩니다.

// #1. 함수 앞에 실행하는 괄호()를 사용해서 묶어 준 형태로 호출 없이 사용할 수 있다.
// (function showMeTheMoney(){
//   console.log('쇼 미 더 머니!');
// }) ();

// #2. 함수 표현식에 실행하는 () 괄호를 사용하면 return 결과값이 변수에 바로 담긴다.
// var fn1 = function ()  { return 'function3'; }; 
// var fn2 = (function () {return 'function4'; })(); // function2


// 함수식을 변수에 참조 - 함수를 담음
var fn1 = function () { return 'function 1'; };

// 즉시실행함수의 결과(return)를 변수에 참조 - 문자를 담고 있는 변수
var fn2 = (function () {

  // 전역과 독립된 공간
  // 이 곳에 정의된 var, function 은 외부에서 접근 불가
  var count = 0;

  // 변수 fn2에 참조될 (내부)함수가 fn2에 담긴다.
  return function () { return count++; };

})();

// #3. chatpter08-index.js에서 전역변수 함수를 캡슐화 해준다.
(function () {
  var app_header = null;
  var menu_open_btn = null;
  var app_navigation = null;
  var menu_close_btn = null;
  var app_main = null;
  var ediya_menu = null;
  var menu_items = null;

  // 초기화
  function init() {
    // 문서 객체 접근 참조
    accessingDOMElements();
    // 오프캔버스 메뉴 접근성
    a11yOffCanvasMenu(app_navigation);
    // 이벤트 바인딩
    bindEvents();
  }



  function accessingDOMElements() {
    app_header = el('.app-header');
    menu_open_btn = el('.button.is-open', app_header);
    app_navigation = el('.app-navigation', app_header);
    menu_close_btn = el('.button.is-close-menu', app_navigation);
    app_main = el('.app-main');
    ediya_menu = el('.ediya-menu');
    menu_items = els('.ediya-menu__item', ediya_menu);
  }

  function bindEvents() {

    for (var i = 0, l = menu_items.length; i < l; ++i) {
      var menu_item = menu_items[i];
      var link = el('a', menu_item);
      var close_panel_btn = el('.button.is-close-panel', menu_item);
      link.addEventListener('click', openDetailPanel.bind(link, i));
      close_panel_btn.addEventListener('click', closeDetailPanel);
    }

    menu_open_btn.addEventListener('click', openNavMenu);
    menu_close_btn.addEventListener('click', closeNavMenu);

  }

  function openNavMenu() {
    app_navigation.hidden = false;
    window.setTimeout(function () {
      app_navigation.classList.add('is-active');
    }, 10);
  }

  function closeNavMenu() {
    app_navigation.classList.remove('is-active');
    window.setTimeout(function () {
      app_navigation.hidden = true;
    }, 600);
  }

  function openDetailPanel(index, e) {
    e.preventDefault();
    var detail = el('.ediya-menu__item--detail', menu_items[index]);
    detail.hidden = false;
    window.setTimeout(function () {
      detail.classList.add('is-active');
    }, 10);
  }

  function closeDetailPanel() {
    var parent = this.parentNode;
    parent.classList.remove('is-active');
    window.setTimeout(function () {
      parent.hidden = true;
    }, 600);
  }
  function a11yOffCanvasMenu(app_navigation) {

    var nav_focusables = els('a, button', app_navigation);
    var nav_focusable_first = nav_focusables[0];
    var nav_focusable_last = nav_focusables[nav_focusables.length - 1];


    window.addEventListener('keyup', escCloseMenu);
    nav_focusable_first.addEventListener('keydown', navLastFocus);
    nav_focusable_last.addEventListener('keydown', navFirstFocus);

    function escCloseMenu(e) {
      if (e.keyCode === 27) { closeNavMenu(); }
    }

    function navFirstFocus(e) {
      if (!e.shiftKey && e.keyCode === 9) {
        window.setTimeout(function () {
          nav_focusable_first.focus();
        }, 10);
      }
    }

    function navLastFocus(e) {
      if (document.activeElement === e.target && e.shiftKey && e.keyCode === 9) {
        nav_focusable_last.removeEventListener('keydown', navFirstFocus);
        window.setTimeout(function () {
          nav_focusable_last.focus();
          nav_focusable_last.addEventListener('keydown', navFirstFocus);
        }, 10);
      }
    }
  }

  init();

})();

// IIFE 패턴 재사용 목적이 아니라 전역에서 보호되어야 한다.

// 1. 값을 반환 하는 IIFE 
var result = (function () {
  return "Result CallMe!";
}());

console.log(result); // Result CallMe!

// 2. 매개변수가 있는 IIFE
(function iife(msg, times) {

  for (var i = 0; i < times; i++) {
    console.log(msg);
  }

}("Hello", 5)); // Hello 5번 출력



