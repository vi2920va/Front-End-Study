// -------------------------------------------------------------------------
// DOM API 실습
// - 문서 객체 동적 생성 및 제거, 복제
//
// .hasChildNodes()
// .createTextNode()
// .removeChild()
// .replaceChild()
// .cloneNode()


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
  },
  {
    figure: {
      name: 'ICED-브라우니-쇼콜라',
      width: 323,
      height: 323,
    },
    detail: {
      ko: 'ICED 브라우니 쇼콜라',
      en: 'Brownie Chocolate',
      desc: '깊고 진한 초콜릿의 맛에 부드러운 휘핑크림과 브라우니를 함께 어울러져 고급스러운 디저트 같은 초콜릿 음료',
      display_criteria: [
        ['칼로리', '503kcal'],
        ['당류', '42g'],
        ['단백질', '9g'],
        ['포화지방', '20.8g'],
        ['나트륨', '262mg'],
        ['카페인', '12mg'],
      ]
    }
  },
  {
    figure: {
      name: 'HOT-브라우니-쇼콜라',
      width: 323,
      height: 323,
    },
    detail: {
      ko: 'HOT 브라우니 쇼콜라',
      en: 'Brownie Chocolate',
      desc: '깊고 진한 초콜릿의 맛에 부드러운 휘핑크림과 브라우니를 함께 어울러져 고급스러운 디저트 같은 초콜릿 음료',
      display_criteria: [
        ['칼로리', '503kcal'],
        ['당류', '42g'],
        ['단백질', '9g'],
        ['포화지방', '20.9g'],
        ['나트륨', '299mg'],
        ['카페인', '12mg'],
      ]
    }
  },
  {
    figure: {
      name: '제주청귤-오리지널',
      width: 323,
      height: 323,
    },
    detail: {
      ko: '제주청귤 오리지널',
      en: 'Jeju Green Tangerine Tea',
      desc: '청정 제주지역에서 자라난 귀한 청귤의 풍부한 과육을 맛볼 수 있는 새콤달콤한 홈메이드 스타일 과일차',
      display_criteria: [
        ['칼로리', '218kcal'],
        ['당류', '51g'],
        ['단백질', '0g'],
        ['포화지방', '0.1g'],
        ['나트륨', '4mg'],
        ['카페인', '0mg'],
      ]
    }
  },
  {
    figure: {
      name: '제주청귤-블라썸',
      width: 323,
      height: 323,
    },
    detail: {
      ko: '제주청귤 블라썸',
      en: 'Jeju Green Tangerine Tea',
      desc: '청귤의 새콤함이 복숭아, 포도 등의 다양한 과일향과 함께 어우러져 밸런스가 훌륭한 블렌딩티',
      display_criteria: [
        ['칼로리', '202kcal'],
        ['당류', '46g'],
        ['단백질', '1g'],
        ['포화지방', '0.1g'],
        ['나트륨', '5mg'],
        ['카페인', '0mg'],
      ]
    }
  },
  {
    figure: {
      name: '석류-오리지널',
      width: 323,
      height: 323,
    },
    detail: {
      ko: '석류 오리지널',
      en: 'Pomegranate Tea',
      desc: '석류 특유의 산뜻한 향과 깔끔한 뒷맛이 느껴지며, 과육이 한알 한알 살아있는 붉은 빛의 매력적인 과일차',
      display_criteria: [
        ['칼로리', '210kcal'],
        ['당류', '42g'],
        ['단백질', '0g'],
        ['포화지방', '0.1g'],
        ['나트륨', '5mg'],
        ['카페인', '0mg'],
      ]
    }
  },
  {
    figure: {
      name: '석류-애플라임',
      width: 323,
      height: 323,
    },
    detail: {
      ko: '석류 애플라임',
      en: 'Pomegranate Apple Lime',
      desc: '산뜻한 석류에 다양한 과일과 꽃, 그리고 샴페인의 향이 더해져 보다 깊고 중후한 맛이 느껴지는 블렌딩티',
      display_criteria: [
        ['칼로리', '220kcal'],
        ['당류', '42g'],
        ['단백질', '1g'],
        ['포화지방', '0.1g'],
        ['나트륨', '7mg'],
        ['카페인', '0mg'],
      ]
    }
  },
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

  // HTML 템플릿을 토대로 메뉴 아이템 데이터를 순환하여
  // HTML 구조 동적 생성 후, 문서에 추가
  var ediya_menu = _.el('.ediya-menu');
  // console.log(ediya_menu.hasChildNodes()); // true(공백, 주석 포함)

  _.each(menu_items_data, function (item, index) {

    // 데이터 개별 값 참조
    var figcaption = item.figure.name;
    var img_width = item.figure.width;
    var img_height = item.figure.height;
    var detail = item.detail;
    var ko = detail.ko;
    var en = detail.en;
    var desc = detail.desc;
    var display_criteria = detail.display_criteria;

    // 동적으로 문서 객체 생성
    // li
    var meun_item = document.createElement('li');
    meun_item.setAttribute('class', 'ediya-menu__item');

    // a 
    var link = document.createElement('a');
    link.setAttribute('href', '#');

    // figure
    var figure = document.createElement('figure');

    // figure > img
    var figure_img = document.createElement('img');
    figure_img.setAttribute('src', 'images/' + figcaption + '.png');
    figure_img.setAttribute('alt', '');
    figure_img.setAttribute('width', img_width);
    figure_img.setAttribute('height', img_height);

    // figure > figcaption
    var figure_figcaption = document.createElement('figcaption');

    // TextContent 추가
    var figure_figcaption_content = document.createTextNode(figcaption);

    // 요소 병합
    figure_figcaption.appendChild(figure_figcaption_content);
    figure.appendChild(figure_img);
    figure.appendChild(figure_figcaption);
    link.appendChild(figure);

    // div
    var item_detail = document.createElement('div');
    item_detail.setAttribute('class', 'ediya-menu__item--detail');
    item_detail.setAttribute('hidden', true);

    // strong
    var detail_strong = document.createElement('strong');
    detail_strong.appendChild(document.createTextNode(ko));

    // span
    var detail_strong_span = document.createElement('span');
    detail_strong_span.setAttribute('lang', 'en');
    detail_strong_span.appendChild(document.createTextNode(en));
    detail_strong.appendChild(detail_strong_span);

    // p
    var detail_desc = document.createElement('p');
    detail_desc.appendChild(document.createTextNode(desc));

    // div
    var display = document.createElement('div');
    display.setAttribute('class', 'ediya-menu__item--multi-column is-2');

    // div > p
    var display_p = document.createElement('p');

    // div > span > p
    _.each(display_criteria, function (criteria) {
      var prop = criteria[0];
      var value = criteria[1];
      var span = document.createElement('span');
      span.appendChild(document.createTextNode(prop));
      var b = document.createElement('b');
      b.appendChild(document.createTextNode(value));
      span.appendChild(b);
      display_p.appendChild(span);
    });

    display.appendChild(display_p);

    // button 
    var close_button = document.createElement('button');
    close_button.setAttribute('type', 'button');
    close_button.setAttribute('class', 'button is-close-panel');
    close_button.setAttribute('aria-label', '아이템 소개 패널 닫기');
    close_button.appendChild(document.createTextNode('X'));

    // 병합
    item_detail.appendChild(detail_strong);
    item_detail.appendChild(detail_desc);
    item_detail.appendChild(display);
    item_detail.appendChild(close_button);

    meun_item.appendChild(link);
    meun_item.appendChild(item_detail);
    // 최종
    ediya_menu.appendChild(meun_item);

  });


  // 버튼 요소노드 동적 생성
  // '제거' 텍스트노드 동적 생성
  // 버튼 요소노드 마지막 자식으로 텍스트노드 추가
  function makeRemoveButton() {
    // 생성
    var remove_button = document.createElement('button');
    remove_button.setAttribute('class', 'remove-button');
    remove_button.appendChild(document.createTextNode('제거'));

    // 스타일 설정 (레이아웃)
    remove_button.style.cssText = [
      'cursor : pointer',
      'position : absolute',
      'top : -3px',
      'right : -3px',
      'border : none',
      'border-radius : 4px',
      'padding : 0.3em 0.5em',
      'font-size : 13px',
      'background : #000',
      'color : #fff',
    ].join(';');

    return remove_button;

  }

  // 각 메뉴 아이템(li)의 첫번째 자식(a) 앞에 
  // 제거 버튼 추가
  var meun_items = _.els('.ediya-menu__item');

  _.each(meun_items, function (item, index) {
    var first_el = item.firstElementChild;

    var remove_button = makeRemoveButton();
    first_el.parentNode.insertBefore(remove_button, first_el);

    _.on(remove_button, 'click', function () {
      var parent = this.parentNode;
      parent.parentNode.removeChild(parent);
    });

  });

  // 제거 버튼 스타일 설정 (레이아웃)

  // 제거 버튼 클릭 시, 
  // 부모 노드 제거 이벤트 설정

  var is_duplicated = false;

  global.addEventListener('scroll', function () {
    var top = global.scrollY;

    if (top > 700 && !is_duplicated) {
      global.setTimeout(function () {
        var clone = _.el('.ediya-menu').cloneNode(true);
        _.el('.app-main').appendChild(clone);

      }, 500);

      is_duplicated = true;
    }
  });

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