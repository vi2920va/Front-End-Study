export function el(selector, context) {
  return (context || document).querySelector(selector);
}

export function els(selector, context) {
  return (context || document).querySelectorAll(selector);
}

function each(list, callback, scope) {
  list.forEach((item, i) => callback.call(scope, item, i));
}

function on(el, type, handler) {
  el.addEventListener(type, handler);
}

function off(el, type, handler) {
  el.removeEventListener(type, handler);
}

function hasClass(el, name) {
  return el.classList.contains(name);
}

function addClass(el, name) {
  var names = name.split(' ');
  each(names, name => { el.classList.add(name); });
  return el;
}

function removeClass(el, name) {
  name ? el.classList.remove(name) : (el.className = '');
  return el;
}
function toggleClass(el, name) {
  return hasClass(el, name) ? removeClass(el, name) : addClass(el, name);
}

function prependChild(el, html_code) {
  el.insertAdjacentHTML('afterbegin', html_code);
  return el;
}

function appendChild(el, html_code) {
  el.insertAdjacentHTML('beforeend', html_code);
  return el;
}

function insertBefore(el, html_code) {
  el.insertAdjacentHTML('beforebegin', html_code);
  return el;
}

function insertAfter(el, html_code) {
  el.insertAdjacentHTML('afterend', html_code);
  return el;
}

function beforeEl(el, prev) {
  return el.insertAdjacentElement('beforebegin', prev);
}

function afterEl(el, next) {
  return el.insertAdjacentElement('afterend', next);
}

function firstChildEl(el, first) {
  return el.insertAdjacentElement('afterbegin', first);
}

function lastChildEl(el, last) {
  return el.insertAdjacentElement('beforeend', last);
}

function template(data, fn) {
  try { return data.slice().map(fn).join(''); }
  catch (e) { console.error(e.message); }
}

function getStyle(el, prop, pseudo) {
  return window.getComputedStyle(el, pseudo)[prop];
}

function setStyle(el, prop, value) {
  return el.style[prop] = value;
}

export function css(el, prop, value) {
  var els = [];
  if (el && el.nodeType !== 1 && typeof el === 'string') {
    var els = el.split('::');
    el = document.querySelector(els[0]);
  }
  var getValue = getStyle(el, prop, els.length ? els[1] : null);
  if (!value) {
    return getValue;
  } else {
    if (/^(\+=|-=)/.test(value)) {
      var currentValue = window.parseFloat(getValue, 10);
      var operator = value.substr(0, 2); // += , -=
      var unit = /px/.test(getValue) ? 'px' : /rem/.test(getValue) ? 'rem' : /em/.test(getValue) ? 'em' : '';
      value = window.parseFloat(value.substr(2), 10);
      value = currentValue + (operator === '+=' ? value : -value) + unit;
    }
    setStyle(el, prop, value);
  }
}

function width(el) {
  return window.parseFloat(css(el, 'width'), 10);
}

function height(el) {
  return window.parseFloat(css(el, 'height'), 10);
}
function innerWidth(el) {
  return el.clientWidth;
}

function innerHeight(el) {
  return el.clientHeight;
}

function outerWidth(el, include_margin) {
  return el.offsetWidth + !include_margin ?
    0 : window.parseFloat(css(el, 'margin-left'), 10) + window.parseFloat(css(el, 'margin-right'), 10);
}
function outerHeight(el, include_margin) {
  return el.offsetWidth + !include_margin ?
    0 : window.parseFloat(css(el, 'margin-top'), 10) + window.parseFloat(css(el, 'margin-bottom'), 10);
}

//--------------------------------------------------------------------------------------------------
// ☆ ES6를 지원하는 환경 ☆ 

// 1. Modules export 
// - javascript 모듈에서 함수, 객체, 원시 값을 내보낼때 사용한다.
// -  내보낸 값은 다른 프로그램에서 import문으로 가져가 사용할 수 있다.
// - (1) Named export 
//  : 여러 값을 내보낼 때 유용하다. 가져갈 때는 이름과 동일한 이름을 사용해야 한다.

// - (2) Default export 
// : 모듈 당 딱 하나의 Default export가 있다. 함수 또는 클래스 오브젝트가 될 수 있으며, 이 값은 가장 간단하게
//   import 할 수 있기 때문에 내보낼 값 중에 메인 해당 하는 값으로 고려해야 된다. 또한 이 안에 var, let 혹은
//   const 키워드를 사용할 수 없다.

// (1-1) Named export - 비구조화로 내보내기
// export const y9 = { el, els };

// (1-2) Named export -  함수 내보내기

// export function el(selector, context) {
//   return (context || document).querySelector(selector);
// }

// export function els(selector, context) {
//   return (context || document).querySelectorAll(selector);
// }

// (2-1) Default export - 기본으로 내보내기
// export default { el, css };

// (2-2) Default export & Others - scrollWidth, scrollHeight 개별 이름 사용
export function scrollWidth(el) {
  return el.scrollWidth;
}

export function scrollHeight(el) {
  return el.scrollHeight;
}


