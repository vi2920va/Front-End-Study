// -------------------------------------------------------------
// DOM API
// - 문서 객체(Document Objects)를 선택하는 방법
// - 요소노드(ELEMENT_NODE) vs 노드리스트(NodeList) | HTMLCollection
// -------------------------------------------------------------

// : 웹 브라우저가 HTML를 해석하면서 Document Object 객체를 만들고
//  그 객체를 접근할 수 있는 방법


// tagName 으로 선택하는 방법
// 문서에서 tagName 값이 [   ]인 요소들을 찾아라.

// : 해당하는 태그 이름은 모두 선택, HTMLCollction을 반환
// 여기서 정확히 대상을 뽑고 싶을 때 item 함수를 사용한다.
var daum = document.getElementsByTagName('h2');
var aTag = daum.item(0).getElementsByTagName('a').item(0);


// id 속성 값으로 선택하는 방법


// class 속성 값으로 선택하는 방법
var active = document.getElementsByClassName('active');
var btn_a = active.item(1);


// CSS 선택자(selector)로 선택하는 방법
// 요소노드
var webtoon = document.querySelector('.webtoon');

// 노드리스트
// NodeList를 반환, 유사 배열, forEach 사용해서 반복처리 할 수 있으며, arrayfrom 를 사용해 배열로 바꿀 수 있다.
var list = document.querySelectorAll('.list');

