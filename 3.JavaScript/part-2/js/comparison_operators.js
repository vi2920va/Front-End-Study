// 비교 연산자
// : 값을 비교할때 사용하는 연산자

// ==
// === (권장)
// !=
// !== (권장) : 비교 했을 때 서로 다를 경우
// >
// >=
// <
// <=

// JavaScript 자동형 변환의 단점
// if(l0 == '10'){
// 	console.log('숫자 10과 문자 10은 같아');
// }

if (10 === '9') {
  console.log('true');
} else {
  console.log('문장과 숫자는 같을 수 없어!');
}

// 논리 연산자
// AND ⟹ && : 조건 모두가 true 일 경우
// OR  ⟹ || : 조건 하나가 true 일 경우
// NOT ⟹ ! : true를 false로, false를 true 값을 반대로 바꿔준다.
// 3 > 8 || 10 =< 12

var int = '11';

if (int !== 11) {
  console.log('같아');
} else {
  console.log('같지 않아');
}

// typeof
// : 데이터형을 검증할 때 사용(Array는 Array.isArray를 사용해서 검증해야된다)
console.log(typeof 12);

var x = [1, 2, 8];

console.log(typeof x); // Object

console.log(Array.isArray(x));

//  trim()
// : trim 함수를 사용하면, 양쪽 모두 공백을 제거

// NodeType
// : HTML 노드별 NodeType 의 값

// : 요소 노드(ELEMENT_NODE) 1, 속성 노드(ATTRIBUTE_NODE) 2, 텍스트 노드(TEXT_NODE) 3
//   주석 노드 8(COMMENT_NODE), 문서 노드 9(DOCUMENT_NODE)

function els(selector, context) {
  // selector 유형이 문자가 아니거나, selector 공백을 제거한 길이가 0일 경우 결과 값 null 반환
  if (typeof selector !== 'string' || selector.trim().length === 0) {
    return null;
  }
  // context 값이 존재하고, 노드 유형이 요소 노드(1)가 아니라면... context 변수에 el() 함수를 통해 문서 객체 참조.
  if (context && context.nodeType !== document.ELEMENT_NODE) {
    context = el(String(context));
  }
  // context 값이 undefined, null 일 경우, context는 document 값을 참조.
  if (!context) {
    context = document;
  }
  return context.querySelectorAll(selector);
}

function el(selector, context) {
  if (typeof selector !== 'string' || selector.trim().length === 0) {
    return null;
  }
  if (context && context.nodeType !== document.ELEMENT_NODE) {
    context = el(String(context));
  }
  if (!context) {
    context = document;
  }
  return context.querySelector(selector);
}
