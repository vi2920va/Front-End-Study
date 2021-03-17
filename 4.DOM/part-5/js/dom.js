/*

  CSSOM
  
  DOM의 일부인 CSSOM (CSS Object Model)은 CSS와 관련된 다양한 정보를 
  조작 할 수있는 특정 인터페이스를 제공합니다. 처음에 DOM Level 2 Style 
  권고안에서 정의된 이 인터페이스는 현재 CSS 인터페이스를 대체하는 CSSOM 
  (CSS Object Model) 사양을 형성 합니다.
  
  가능한 경우 class 속성을 통해 동적으로 클래스를 조작하는 것이 가장 좋습니다. 
  className 속성은 모든 스타일링 훅의 궁극적인 모양이 단일 스타일 시트에서 
  제어 될 수 있기 때문에 유용합니다. 

  스타일 정보에 전념하는 대신 스타일시트에 정확한 스타일 세부 정보를 남기고 
  작성하거나 조작하는 각 섹션의 전반적인 의미에 집중할 수 있기 때문에 
  JavaScript 코드도 보다 명확 해집니다. 
  
*/


/*
  
  요소의 크기(Dimensions)
  
    width, height
  
    clientWidth, clientHeight
      ⇲ 
        너비/높이(width/height) + 패딩(padding)
  
  
    offsetWidth, offsetHeight
      ⇲ 
        너비/높이(width/height) + 패딩(padding) + 보더(border) + 스크롤바
  
  
    scrollWidth, scrollHeight
      ⇲ 
        스크롤 가능한 너비/높이 영역
  
*/

(function(_){
  'use strict';
  
  var body = {
    top: window.parseFloat(_.css('body', 'margin-top'), 10),
    right: window.parseFloat(_.css('body', 'margin-right'), 10),
    bottom: window.parseFloat(_.css('body', 'margin-bottom'), 10),
    left: window.parseFloat(_.css('body', 'margin-left'), 10),
    borderTop: window.parseFloat(_.css('body', 'border-top-width'), 10),
    borderLeft: window.parseFloat(_.css('body', 'border-left-width'), 10),
  };
  
  var ova = _.el('.ova');
  var dimensionW = ' | 너비('+_.css(ova,'width')+'), 패딩('+_.css(ova,'padding')+'), 보더('+_.css(ova,'border')+'), 스크롤바(15px), 마진('+_.css(ova,'margin')+')';
  var dimensionH = ' | 높이('+_.css(ova,'height')+'), 패딩('+_.css(ova,'padding')+'), 보더('+_.css(ova,'border')+'), 스크롤바(15px), 마진('+_.css(ova,'margin')+')';
  
  console.log('.ova 요소, offsetParent:', ova.offsetParent.localName);
  console.log('%c-----------------------------------------------------------------------------------------------------------------', 'color: blueviolet');
  console.log('.ova 요소, offsetTop:', ova.offsetTop, ' | body 마진('+body.top+') + 보더('+body.borderTop+') 뺀 값:', ova.offsetTop - (body.top + body.borderTop));
  console.log('.ova 요소, offsetLeft:', ova.offsetLeft, ' | body 마진('+body.left+') + 보더('+body.borderLeft+') 뺀 값:', ova.offsetLeft - (body.left + body.borderLeft));
  console.log('%c-----------------------------------------------------------------------------------------------------------------', 'color: blueviolet');
  console.log('.ova 요소, clientWidth:', ova.clientWidth, dimensionW);
  console.log('.ova 요소, clientHeight:', ova.clientHeight, dimensionH);
  console.log('%c-----------------------------------------------------------------------------------------------------------------', 'color: blueviolet');
  console.log('.ova 요소, offsetWidth:', ova.offsetWidth, dimensionW);
  console.log('.ova 요소, offsetHeight:', ova.offsetHeight, dimensionH);
  console.log('%c-----------------------------------------------------------------------------------------------------------------', 'color: blueviolet');
  console.log('.ova 요소, scrollWidth:', ova.scrollWidth, dimensionW);
  console.log('.ova 요소, scrollHeight:', ova.scrollHeight, dimensionH);
  
})(y9);
