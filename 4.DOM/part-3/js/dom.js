// -------------------------------------------------------------------------
// DOM API - HTML 요소 속성,메서드를 사용한 DOM 스크립팅.
//           템플릿(Template)으로 코드 사용.
// 
// .innerHTML
// .insertAdjacentHTML()


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
  }
  // {
  //   figure: {
  //     name: 'HOT-브라우니-쇼콜라',
  //     width: 323,
  //     height: 323,
  //   },
  //   detail: {
  //     ko: 'HOT 브라우니 쇼콜라',
  //     en: 'Brownie Chocolate',
  //     desc: '깊고 진한 초콜릿의 맛에 부드러운 휘핑크림과 브라우니를 함께 어울러져 고급스러운 디저트 같은 초콜릿 음료',
  //     display_criteria: [
  //       ['칼로리', '503kcal'],
  //       ['당류', '42g'],
  //       ['단백질', '9g'],
  //       ['포화지방', '20.9g'],
  //       ['나트륨', '299mg'],
  //       ['카페인', '12mg'],
  //     ]
  //   }
  // },
  // {
  //   figure: {
  //     name: '제주청귤-오리지널',
  //     width: 323,
  //     height: 323,
  //   },
  //   detail: {
  //     ko: '제주청귤 오리지널',
  //     en: 'Jeju Green Tangerine Tea',
  //     desc: '청정 제주지역에서 자라난 귀한 청귤의 풍부한 과육을 맛볼 수 있는 새콤달콤한 홈메이드 스타일 과일차',
  //     display_criteria: [
  //       ['칼로리', '218kcal'],
  //       ['당류', '51g'],
  //       ['단백질', '0g'],
  //       ['포화지방', '0.1g'],
  //       ['나트륨', '4mg'],
  //       ['카페인', '0mg'],
  //     ]
  //   }
  // },
  // {
  //   figure: {
  //     name: '제주청귤-블라썸',
  //     width: 323,
  //     height: 323,
  //   },
  //   detail: {
  //     ko: '제주청귤 블라썸',
  //     en: 'Jeju Green Tangerine Tea',
  //     desc: '청귤의 새콤함이 복숭아, 포도 등의 다양한 과일향과 함께 어우러져 밸런스가 훌륭한 블렌딩티',
  //     display_criteria: [
  //       ['칼로리', '202kcal'],
  //       ['당류', '46g'],
  //       ['단백질', '1g'],
  //       ['포화지방', '0.1g'],
  //       ['나트륨', '5mg'],
  //       ['카페인', '0mg'],
  //     ]
  //   }
  // },
  // {
  //   figure: {
  //     name: '석류-오리지널',
  //     width: 323,
  //     height: 323,
  //   },
  //   detail: {
  //     ko: '석류 오리지널',
  //     en: 'Pomegranate Tea',
  //     desc: '석류 특유의 산뜻한 향과 깔끔한 뒷맛이 느껴지며, 과육이 한알 한알 살아있는 붉은 빛의 매력적인 과일차',
  //     display_criteria: [
  //       ['칼로리', '210kcal'],
  //       ['당류', '42g'],
  //       ['단백질', '0g'],
  //       ['포화지방', '0.1g'],
  //       ['나트륨', '5mg'],
  //       ['카페인', '0mg'],
  //     ]
  //   }
  // },
  // {
  //   figure: {
  //     name: '석류-애플라임',
  //     width: 323,
  //     height: 323,
  //   },
  //   detail: {
  //     ko: '석류 애플라임',
  //     en: 'Pomegranate Apple Lime',
  //     desc: '산뜻한 석류에 다양한 과일과 꽃, 그리고 샴페인의 향이 더해져 보다 깊고 중후한 맛이 느껴지는 블렌딩티',
  //     display_criteria: [
  //       ['칼로리', '220kcal'],
  //       ['당류', '42g'],
  //       ['단백질', '1g'],
  //       ['포화지방', '0.1g'],
  //       ['나트륨', '7mg'],
  //       ['카페인', '0mg'],
  //     ]
  //   }
  // },
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

    // 개행 하는 과정에서 필요한 것이므로 제외해도 무방하다.             
    // template += '<p>';

    //[template 내에서 또 다시 template 재사용한 이유]
    // 데이터 구조가 'display_criteria'가 배열 이기 때문에 'display' 변수에 참조하여
    // 배열 데이터를 순환해서 item을 뽑아낸다. 뽑아낸 item 데이터 이기 때문에 반복 순환 된다.
    template += _.template(display, function (item) {
      // var prop = item[0], value = item[1];
      return '<span>' + item[0] + '<b>(' + item[1] + ')</b></span>';
    });
    template += '<p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';

    return template;

  });

  // 접합
  _.prependChild(ediya_menu, html_code);

  // console.log(html_code);


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