// -------------------------------------------------------------------------
// DOM API
// 문서 객체 모델에 대해 알아보고 자주 사용되는 API를 정리해봅니다.
// -------------------------------------------------------------------------

/*

  DOM
  
  HTML은 웹 페이지의 내용과 양식을 저장하기 위해 사용되고 
  CSS는 웹 페이지가 시각적으로 어떻게 보일지 결정합니다. 

  자바스크립트는 웹 어플리케이션에 더 풍부한 효과를 주기 위해 
  사용됩니다. 웹 브라우저에서 자바스크립트는 여러가지 다른 뜻을 
  가진 포괄적인 용어로, 한가지 뜻은 핵심 언어 (ECMA 스크립트)
  이고 나머지 뜻은 DOM(Document Object Model) 입니다.


  [1] ECMAScript
  
      ECMAScript에서 다음과 같은 것을 정의합니다.
  
      - 언어 문법 (파싱 규칙, 키워드, 흐름 제어, 오브젝트 리터럴 초기화 등)
      - 에러 처리 방법 (throw, try/catch, 유저가 직접 정의한 에러 등)
      - 타입들 (boolean, number, string, function, object...)
      - 전역 오브젝트. 브라우저 환경에서는 window 오브젝트가 전역 오브젝트. 
        몇 가지의 함수들이 이 오브젝트에 포함 됨(parseInt, parseFloat, ... 등).
      - 프로토타입을 기반으로한 상속 구조
      - 내장 객체 및 함수들(JSON, Math, Array, Object, ... 등).
  
  [2] DOM
  
      Document Object Model의 표준은 W3C에 의해 관리됩니다. 
      HTML, XML 문서를 오브젝트로 추상화하여 언어에 관계없이 이들을 
      다루는 방법이 정의되어 있습니다. DOM에서 정의된 것들 중에 
      다음과 같은 것들이 중요합니다.
      
      - 문서 구조, 트리 모델(tree model), DOM core에 있는 이벤트 구조. 
        Node, Element, Document, Event, EventTarget, ... 등
      - 덜 엄격한 DOM 이벤트 구조, DOM events에 속하는 특정 이벤트.
      - DOM 탐색(Traversal), DOM 영역(Range) 등.
*/


// -------------------------------------------------------------------------
// DOM API + Youtube Iframe API 실습
// document.createElement()
// .appendChild()
// .insertBefore()
// .setAttribute()

(function YoutubeIframeAPI__DOM_Control(global, document) {
  'use strict';

  // ---------------------------------------------
  // <div id="ytb-player"> 요소 동적 생성 및 문서에 추가

  // div 요소 생성
  // document.createElement('요소이름')


  // div 요소 ID 속성 추가
  // id : 'ytb-player'


  // 부모 요소의 마지막 자식 요소로 추가
  // parent.appendChild(child)


  // ---------------------------------------------------------------------
  // <script src="https://youtube.com/iframe_api"> 요소 동적 생성 및 문서에 추가

  // script 요소 생성


  // script 요소 src 속성 추가
  // src : 'https://youtube.com/iframe_api'


  // 목표로 하는 요소 노드 앞에 script 추가
  // target.parentNode.insertBefore(insert, target);


  // Youtube Iframe API 참고하여 플레이어 컨트롤
  // https://goo.gl/q9msQV
  //
  // width          : 720
  // height         : 405
  // videoId        : UVLlsaekTas
  //
  // VARS -------------------------------------------------
  //
  // autoplay       : 1
  // controls       : 0
  // enablejsapi    : 1
  // modestbranding : 1
  // rel            : 0
  // showinfo       : 0
  // start          : 40
  // color          : white
  // iv_load_policy : 3"


  // ※ onYouTubeIframeAPIReady 함수는 전역 함수여야 API 동작이 가능.
  //   IIFE 내부에서는 global.onYouTubeIframeAPIReady 함수로 설정.
})(window, document);



(function carousel(global, document) {
  'use strict';

  // 초기 함수
  function init(params) {
    //matches();
  }

  // [DOM 선택 API 메서드]
  // : getElementById(), getElementByTagName(), querySelector(), querySelectorAll(), matches() 등이 있다.

  //[주의 할 점]
  // : querySelector(), querySelectorAll() 메서드로 수집된 집한은 다른 선택 API 메서드와 달리 라이브 상태가 아니다. 
  //   문서의 변경된 내용이 반영이 되지 않는다.

  // DOM 선택 - matches() 
  // : matches 메서드는 element 제공된 selectorString 요소에 의해 선택 될 지 여부를 확인 한다. 
  //   즉, 요소가 선택기 인지 아닌지 true 또는 false 반환 하므로 조건문에 사용할 수 있다.
  var matches = function () {
    var carousel = document.querySelector('.carousel');
    if (carousel.matches('div')) {
      console.log(carousel.parentNode);
    } else {
      console.log('This is not right!');
    }
  };

  // [Node 속성]
  // : nextSibling, previousSibling은 공백 text 까지 선택하므로 요소를 찾을때는 아래의 코드가 더 적절하다.
  //  인터넷 브라우저가 9 이하일 경우 Polyfill을 고려해야 된다.
  var list = document.querySelector('.carousel-list');
  console.log('list  이전 형제: ' , list.previousElementSibling);

  var section = document.querySelector('section');
  console.log('section  다음 형제: ', section.nextElementSibling);
  
  console.log('list 첫 번째 자식 : ', list.firstElementChild);

  console.log('list 마지막 자식 : ', list.lastElementChild);

  console.log('list 부모 : ',list.parentNode);

  console.log('부모의 부모를 연속적으로 탐색 :',list.parentNode.parentNode);

  var h = document.querySelector('h1'); // 3
  console.log(h.firstChild.nodeType === document.TEXT_NODE);

  // h1의 tag name을 대문자로 반환한다.
  console.log(h.nodeName.toLowerCase());

  // localName의 경우 소문자로 반환하지만 익스플로우 또는 사파리는 호환하지 않는다.
  console.log(h.localName);
  
  // 문자값을 처리할 경우 nodeValue를 가져와야한다.
  console.log(typeof list.firstChild);
  console.log(typeof list.firstChild.nodeValue);

  // 문자값을 가져오는 다른 방법으로는 'textContent'가 있다.
  console.log(h.textContent);

  // text를 포함한 모든 자식
  console.log(list.childNodes);
  
  // 직계 자식 요소 노드
  console.log(list.children);

  // 실행 함수
  init();
  
  
})(window, document);



