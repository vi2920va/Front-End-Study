// -------------------------------------------------------------------------
// DOM API - HTML 요소 속성,메서드를 사용한 DOM 스크립팅.
//           템플릿(Template)으로 코드 사용.
// 
// element.style
// cssText
// window.getComputedStyle()

/**
 * 메뉴 아이템 데이터
 */
var menu_items_data = [
  {
    figure: {
      name: 'ICED-벚꽃라떼',
      width: 323,
      height: 323,
    },
    detail: {
      ko: 'ICED 벚꽃라떼',
      en: 'Cherry Blossom Latte',
      desc: '은은한 벚꽃향과 라즈베리 화이트 초콜릿 토핑이 올라간 핑크빛 라떼',
      display_criteria: [
        ['칼로리', '393kcal'],
        ['당류', '35g'],
        ['단백질', '7g'],
        ['포화지방', '18.6g'],
        ['나트륨', '149mg'],
        ['카페인', '0mg'],
      ]
    }
  },
  {
    figure: {
      name: 'HOT-벚꽃라떼',
      width: 323,
      height: 323,
    },
    detail: {
      ko: 'HOT 벚꽃라떼',
      en: 'Cherry Blossom Latte',
      desc: '은은한 벚꽃향과 라즈베리 화이트 초콜릿 토핑이 올라간 핑크빛 라떼',
      display_criteria: [
        ['칼로리', '430kcal'],
        ['당류', '38g'],
        ['단백질', '10g'],
        ['포화지방', '19.0g'],
        ['나트륨', '149mg'],
        ['카페인', '0mg'],
      ]
    }
  }
];


/**
 * HTML 템플릿
 */
/*
<li class="ediya-menu__item">
  <a href="#">
    <figure>
      <img src="ICED-벚꽃라떼.png" alt width="323" height="323">
      <figcaption>ICED 벚꽃라떼</figcaption>
    </figure>
  </a>
  <div hidden class="ediya-menu__item--detail">
      <strong class="ediya-menu__item--name">ICED 벚꽃라떼<span lang="en">Cherry Blossom Latte</span></strong>
      <p>은은한 벚꽃향과 라즈베리 화이트 초콜릿 토핑이 올라간 핑크빛 라떼</p>
      <div class="ediya-menu__item--multi-column is-2">
        <p>
          <span>칼로리<b>(393kcal)</b></span>
          <span>당류<b>(35g)</b></span>
          <span>단백질<b>(7g)</b></span>
          <span>포화지방<b>(18.6g)</b></span>
          <span>나트륨<b>(149mg)</b></span>
          <span>카페인<b>(0mg)</b></span>
        </p>
      </div>
      <button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button>
    </div>
</li>
*/

(function DOM_Control(global, document, _) {
  'use strict';

  var ediya_menu = _.el('.ediya-menu');

  var html_code = _.template(menu_items_data, function (item) {
    // 데이터 에서 개별 아이템 값 추출
    var figure = item.figure;
    var name = figure.name;
    var width = figure.width;
    var height = figure.height;
    var detail = item.detail;
    var ko = detail.ko;
    var en = detail.en;
    var desc = detail.desc;
    var display = detail.display_criteria;

    var template = '<li class="ediya-menu__item">\
              <a href="#">\
                <figure>\
                  <img src="images/'+ name + '.png" alt width="' + width + '" height="' + height + '">\
                  <figcaption>'+ ko + '</figcaption>\
                </figure>\
              </a>\
              <div hidden class="ediya-menu__item--detail">\
                  <strong class="ediya-menu__item--name">'+ ko + '<span lang="en">' + en + '</span></strong>\
                  <p>'+ desc + '</p>\
                  <div class="ediya-menu__item--multi-column is-2"><p>';


    template += _.template(display, function (item) {
      return '<span>' + item[0] + '<b>(' + item[1] + ')</b></span>';
    });
    template += '<p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';

    return template;

  });

  // 접합
  _.prependChild(ediya_menu, html_code);

  // javascript로 css style 적용
  var brand = _.el('.brand');


  // 개별적으로 요소에 계속 style 값을 적용하면 성능적 이슈가 생길 수 있다.
  // brand.style.marginTop = '15px';
  // brand.style.marginBottom = '15px';

  // 1. 개별적으로 요소에 style 값을 적용하고 싶을 때 아래의 코드가 위에 보다 더 효율적이다.
  // brand.style.display ='none';
  // brand.style.fontSize = '20px';
  // brand.style.display ='block';

  // 2. cssText(한줄로 전체사용)
  brand.style.cssText = 'margin : 15px 15px; font-size : 20px;'

  // style 값은 설정되있지 않는 값은 가져올수 없다
  // style 속성에 값을 가져오기 위해서 반드시 인라인 속성이 설정되있어야 한다.

  // console.log(brand.style.float);

  // style 모두 제거
  // brand.removeAttribute('style');




})(window, document, y9);


// -------------------------------------------------------
// Ediya 오프캔버스, 토글 패널 스크립트
(function (global, document, _) {
  'use strcit';

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
    app_header = _.el('.app-header');
    menu_open_btn = _.el('.button.is-open', app_header);
    app_navigation = _.el('.app-navigation', app_header);
    menu_close_btn = _.el('.button.is-close-menu', app_navigation);
    app_main = _.el('.app-main');
    ediya_menu = _.el('.ediya-menu');
    menu_items = _.els('.ediya-menu__item', ediya_menu);
  }

  function bindEvents() {

    _.each(menu_items, function (menu_item, index) {
      var link = _.el('a', menu_item);
      var close_panel_btn = _.el('.button.is-close-panel', menu_item);
      _.on(link, 'click', openDetailPanel.bind(link, index));
      _.on(close_panel_btn, 'click', closeDetailPanel);
    });

    _.on(menu_open_btn, 'click', openNavMenu);
    _.on(menu_close_btn, 'click', closeNavMenu);

  }

  function openNavMenu() {
    app_navigation.hidden = false;
    window.setTimeout(function () {
      _.addClass(app_navigation, 'is-active')
    }, 10);
  }

  function closeNavMenu() {
    _.removeClass(app_navigation, 'is-active')
    window.setTimeout(function () {
      app_navigation.hidden = true;
    }, 600);
  }

  function openDetailPanel(index, e) {
    e.preventDefault();
    var detail = _.el('.ediya-menu__item--detail', menu_items[index]);
    detail.hidden = false;
    window.setTimeout(function () {
      _.addClass(detail, 'is-active')
    }, 10);
  }

  function closeDetailPanel() {
    var parent = this.parentNode;
    _.removeClass(parent, 'is-active');
    window.setTimeout(function () {
      parent.hidden = true;
    }, 600);
  }


  // -----------------------------------------------------------------
  // 오프캔버스 메뉴 접근성
  // -----------------------------------------------------------------
  function a11yOffCanvasMenu(app_navigation) {

    var nav_focusables = _.els('a, button', app_navigation);
    var nav_focusable_first = nav_focusables[0];
    var nav_focusable_last = nav_focusables[nav_focusables.length - 1];

    _.on(window, 'keyup', escCloseMenu);
    _.on(nav_focusable_first, 'keydown', navLastFocus);
    _.on(nav_focusable_last, 'keydown', navFirstFocus);

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
        _.off(nav_focusable_last, 'keydown', navFirstFocus);
        window.setTimeout(function () {
          nav_focusable_last.focus();
          _.on(nav_focusable_last, 'keydown', navFirstFocus);
        }, 10);
      }
    }

  }

  window.setTimeout(init, 2000);

}(window, document, y9));