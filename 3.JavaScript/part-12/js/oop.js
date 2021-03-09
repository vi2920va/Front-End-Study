// <객체 지향 프로그래밍>

// 객체 지향 프로그래밍을 사용해봅시다.
(function(global, document){

  // @constructor
  function Dom(selector, context){
    try {
      if (typeof selector === 'string') {
        var _els = (document || selector).querySelectorAll(selector);
        var i = 0, l = _els.length;
        for (; i<l; ++i) { this[i] = _els[i]; }
        this.length = l;
      } else if (selector && selector.nodeType === 1) {
        this[0] = selector;
        this.length = 1;
      } else {
        this.length = 0;
      }
    } catch(e) {
      console.error(e.message);
    }
  }
  
  // @static__methods
  Dom.each = function(list, callback) {
    var count = list.length;
    for (var i=0; i<count; i++) { callback(list[i], i); }
  };
  
  // @prototype
  // @instance__methods
  (function(){
    this.version = '0.0.1';
    this.each = function(callback) {
      Dom.each(this, callback);
    };
    this.on = function(type, handler) {
      Dom.each(this, function(item, i) {
        item.addEventListener(type, handler.bind(item, item, i));
      });
    };
    this.hasClass = function(name) {
      return this[0].classList.contains(name);
    };
    this.addClass = function(name) {
      var names = name.split(' ');
      Dom.each(this, function(item, i) {
        Dom.each(names, function(name) {
          item.classList.add(name);
        });
      });
      return this;
    };
    this.removeClass = function(name) {
      Dom.each(this, function(item, i) {
        name ? item.classList.remove(name) : item.className = '';
      });
      return this;
    };
    this.toggleClass = function(name) {
      Dom.each(this, function(item, i) {
        if (item.classList.contains(name)) {
          item.classList.remove(name);
        } else {
          item.classList.add(name);
        }
      });
      return this;
    };
    this.eq = function(index) {
      return new Dom(this[index]);
    };
  }).call(Dom.prototype);
  
  // 공개
  Object.defineProperty(global, 'Dom', { 
    value: function(selector, context) {
      return new Dom(selector, context);
    }
  });

  Object.freeze(global.Dom);
  
}(window, document));

(function(global, document, $){
  'use strict';
  //.button-group, button 클릭 시, 
  // .is-active 설정(활성화된 다른 버튼 is-active 클래스 제거)
  // .phone 요소에 클래스 제거
  // .phone 요소에 .phone .is-(black | gray | purple | blue) 클래스 설정
  var $phone = $('.phone');
  var $buttons = $('.button-group .button');
  var changePhoneColor = function(e){
    redioActiveButtonState.call(this);
    var color = this.className.split('is-color-')[1];
    $phone.removeClass().addClass('phone is-' + color);
  }

  var redioActiveButtonState = function(){
    $buttons.each(function(button, index){
      var $button = $buttons.eq(index);
      if($button.hasClass('is-active')){
        $button.removeClass('is-active');
      }
    });
    $(this).addClass('is-active');
  };

  $buttons.on('click', changePhoneColor);

})(window, document, Dom);
