// -----------------------------------------------------------
// 조건(3항) 연산자 ? :
// Condition Ternary Expression
//
// var 변수 = if (조건) { 값1 } else { 값2 }  [X]
// var 변수 = 조건 ? 값1 : 값2                [O]
// 
// -----------------------------------------------------------

// : 삼항식은 필요에 따라서 결과 값을 변수에 할당 할 수 있다.
//   삼항식을 사용하면 여러 개의 조건식을 연결해 사용할 수 있으므로
//   코드량을 대폭 감소 할 수 있지만, 단점으로는 가독성이 떨어질수 있다.

// 실습 1
function getYear(format) {
  //var date = new Date();
  //var year = date.getFullYear();
  //format = !format ? '' : format;

  // format이 있을 경우 format을 사용하고 그렇지 않으면 빈 문자를 사용하라. 

  return (new Date().getFullYear()) + (format || '');
}


// 실습 2
function getHours(format, ampm) {
  var hour = Number((new Date()).getHours());
  // format = !format ? '' : format;
  if (ampm) {
    // ampm (hour 값이 12 보다 작을 경우 AM  그렇지 않으면 PM)
    ampm = !ampm ? '' : hour < 12 ? 'AM' : 'PM';
    // (hour 값이 AM 11시의 경우 11 - 12 = -1 이므로 결과값이 올바르지 않다. )
    // 1. hour = hour < 12 && 12 - hour > 3 ?  '0'+ hour : hour - 12; 

    // (hour 값이 AM 일 때 잘 작동하지만 오후에 일때는 0이 붙지 않는다.) 
    // 2. hour = hour >= 12 ? hour - 12 : 12 - hour > 3 ?  '0' + hour : hour;

    hour = hour >= 12 ? ((hour = hour - 12) < 10 ? '0' + hour : hour) : 12 - hour >= 3 ? '0' + hour : hour;
  } else {
    ampm = '';
  }
  // 결과 반환

  return ampm + hour + (format || '');
}


// -----------------------------------------------------------
// 논리곱(&&), 논리합(||) 연산자를 활용한 조건 식 처리
// -----------------------------------------------------------
// : 아래의 코드를 보면 조건문 내에서 괄호 안에 들어오는 결과값을 논리값을 반환했다.

// if(c1 && c2){ console.log('c1, c2가 모두 true'); }
// if(c1 || c2){ console.log('c1, c2 하나가 true'); }

// : 조건문이 아닌 조건문 밖에 사용한다면 예를 들어 cl && c2 자체를 식으로 사용할 수 있다.

// true  || getHours(); true
// false || getHours(); getHours 수행

// true  && getHours(); getHours 수헹
// false && getHours(); flase

// 실습 3
function el(selector, context) {
  if (typeof selector !== 'string' || selector.trim().length === 0) { return null; }
  if (context && context.nodeType !== document.ELEMENT_NODE) { context = el(String(context)); }
  // if (!context) { context = document; }
  // context = context || document;

  // context가 undefined 라면 document 객체를 사용해서 대상을 찾아라.
  return (context || document).querySelector(selector);
}

