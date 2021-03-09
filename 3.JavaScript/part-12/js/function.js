// -------------------------------------------------------------------------
// JavaScript 함수형 프로그래밍  VS  객체 지향 프로그래밍
// DOM 스크립팅을 목표로 하는 프로그래밍 패러다임 별 사용법을 알아봅시다.
// -------------------------------------------------------------------------


// <함수형 프로그래밍>
(function(global, document) {
  'use strict';
  
  var namespace = 'y9';
  
  function el(selector, context) {
    return (context || document).querySelector(selector);
  }
  function els(selector, context) {
    return (context || document).querySelectorAll(selector);
  }
  function each(list, callback) {
    for (var i=0, l=list.length; i<l; i++) { callback(list[i], i); }
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
    each(names, function(name){ el.classList.add(name); });
    return el;
  }
  function removeClass(el, name) {
    name ? el.classList.remove(name) : (el.className = '');
    return el;
  }  
  function toggleClass(el, name) {
    return hasClass(el, name) ? removeClass(el, name) : addClass(el, name);
  }
  
  Object.defineProperty(global, namespace, { value: {} });
  
  [
    // 내보낼 함수를 추가
    el, els, 
    on, off, 
    hasClass, addClass, removeClass, toggleClass,
    each,
  ]
  .forEach(function(fn){
    global[namespace][fn.name] = fn;
  });

  Object.freeze(global[namespace]);
  
})(window, document);

// 함수형 프로그래밍을 사용해봅시다.
(function(global, document, y9){
	'use strict';
	var el = y9.el;
	var els = y9.els;
	var addClass = y9.addClass;
	var removeClass = y9.removeClass;
	var hasClass = y9.hasClass;
	var each = y9.each;
	var on = y9.on;

	var phone = el('.phone');
	var buttons = els('.button-group .button');
	var phone_colors = 'black gray purple blue'.split(' ');

	function changePhoneColor(index ,e){
		var color = phone_colors[index];
		removeClass(phone, '');
		addClass(phone, 'phone is-' + color);

		y9.each(buttons, function (button) {
			if(hasClass(button, 'is-active')){
				removeClass(button, 'is-active');
			}
		});
		addClass(buttons[index], 'is-active');
	}

	each(buttons, function(button, index){
		on(button, 'click', changePhoneColor.bind(button, index));
	});

	global.setTimeout(function(){
		addClass(buttons[0], 'is-active');
	},1900);

})(window, document, y9);





