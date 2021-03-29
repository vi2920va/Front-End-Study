// TEXT
; (function (global, ajax) {
  'use strict';

}) // (window, ajax);

  //[2. HTML]
  ; (function (global, $, ajax) {
    'use strict';
    var $links = $('nav a');
    var $main = $('main.content');

    var ajaxCallHTML = function (e) {
      // event preventDefault
      e.preventDefault();

      // link attribute
      var href = this.getAttribute('href');

      // Native Code - remove class
      $links.each(function (link) {
        if (link.classList.contains('is-active')) {
          link.classList.remove('is-active');
        }
      });
      // link add is-active
      this.classList.add('is-active');

      // ajax 라이브러리
      ajax.get(href).then(function (data) {
        $main.html(data);
      });

    };

    $.each($links, function (link, index) {
      var $link = $links.eq(index);

      $link.on('click', ajaxCallHTML);
    });



  })// (window, Dom, ajax);

  // [3. XML]
  // XML은 HTML 에는 없지만 자유롭게 요소를 만들어 구성할 수 있다.
  ; (function (global, $, ajax) {
    'use strict';

    var $meun = $('.ediya-menu');

    ajax.get('data/ediya-menu.xml').then(function (xmlDoc) {
      // [NodeList가 배열의 map method 빌려서 사용]

      // before
      // [].map.call(list, function(NodeList 수집한 변수의 각각 textContent){ });

      // [map call method를 Dom.js에 static method 추가]
      // after
      //$.map(list, function(item){});

      // 각각의 데이터를 추출
      // name
      var names = xmlDoc.querySelectorAll('name');
      names = $.map(names, function (name) {
        return name.textContent;
      });

      // width
      var widths = xmlDoc.querySelectorAll('width');
      widths = $.map(widths, function (width) {
        return width.textContent;
      });

      // height
      var heights = xmlDoc.querySelectorAll('height');
      heights = $.map(heights, function (height) {
        return height.textContent;
      });

      // ko
      var kos = xmlDoc.querySelectorAll('ko');
      kos = $.map(kos, function (ko) {
        return ko.textContent;
      });

      // en
      var ens = xmlDoc.querySelectorAll('en');
      ens = $.map(ens, function (en) {
        return en.textContent;
      });

      // desc
      var descs = xmlDoc.querySelectorAll('desc');
      descs = $.map(descs, function (desc) {
        return desc.textContent;
      });

      // display
      var display = xmlDoc.querySelectorAll('display-criteria');
      display = $.map(display, function (criteria) {
        // item
        var items = criteria.querySelectorAll('item');
        var keyMaps = $.map(items, function (item) {
          // item(key, value)
          var key = item.querySelector('key').textContent;
          var value = item.querySelector('value').textContent;
          return [key, value];
        });
        return keyMaps;
      });

      // 추출한 데이터 -> 템플릿 바인딩
      var template = $.template(names, function (name, i) {
        // template
        var templ = '\
              <li class="ediya-menu__item">\
                    <a href="#">\
                      <figure>\
                        <img src="https://raw.githubusercontent.com/yamoo9/assets/master/images/ediya/'+ names[i] + '.png" alt width="' + widths[i] + '" height="' + heights[i] + '">\
                        <figcaption>'+ kos[i] + '</figcaption>\
                      </figure>\
                    </a>\
                    <div hidden class="ediya-menu__item--detail">\
                        <strong class="ediya-menu__item--name">'+ kos[i] + '<span lang="en">' + ens[i] + '</span></strong>\
                        <p>'+ descs[i] + '</p>\
                        <div class="ediya-menu__item--multi-column is-2"><p>';

        templ += $.template(display, function (item, index) {

          // 위에서 순환는 i 값과 item의 index 값이 일치한다면
          if (i === index) {
            // var key = item[0][0];
            // var value = item[0][1];
            // console.log(key, value);

            // 위의 코드 처럼 하면 key 값이 순환을 안하므로 다시 item 안에서 반복 순환!!
            return $.template(item, function (it) {
              var key = it[0];
              var value = it[1];
              return '<span>' + key + '<b>(' + value + ')</b></span>';
            });
          }
        });

        templ += '</p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';

        return templ;
      });
      // console.log(template);
      // 추출한 데이터를 최종적으로  $meun 변수에 html template 코드를 담는다. 
      $meun.html(template);
    });

  }) //(window, Dom, ajax);

  // 템플릿
  /*
   
    var template = '\
                    <li class="ediya-menu__item">\
                      <a href="#">\
                        <figure>\
                          <img src="https://raw.githubusercontent.com/yamoo9/assets/master/images/ediya/'+ name +'.png" alt width="'+ width +'" height="'+ height +'">\
                          <figcaption>'+ ko +'</figcaption>\
                        </figure>\
                      </a>\
                      <div hidden class="ediya-menu__item--detail">\
                          <strong class="ediya-menu__item--name">'+ ko +'<span lang="en">'+ en +'</span></strong>\
                          <p>'+ desc +'</p>\
                          <div class="ediya-menu__item--multi-column is-2"><p>\
                    ';
   
    template += _.template(display, function(item){
      return '<span>'+ item[0] +'<b>('+ item[1] +')</b></span>';
    });
   
    template += '</p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';
   
  */

  // [4. JSON]
  // JSON의 value 값은 무저건 ""쌍따옴표 사용
  // JSON key, value만 들어올 수 있고 함수는 들어올수 없다.
  ; (function (global, $, ajax) {
    'use strict';

    var $meun = $('.ediya-menu');

    // JSON -> Ajax 비동기 통신
    ajax.get('data/ediya-menu.json').then(function (data) {
      // console.log(data[0].detail.display_criteria);

      var templ = $.template(data, function (item) {
        // 데이터 값을 추출
        var figure = item.figure;
        var detail = item.detail;
        var name = figure.name;
        var width = figure.width;
        var height = figure.height;
        var ko = detail.ko;
        var en = detail.en;
        var desc = detail.desc;
        var display = detail.display_criteria;

        // 데이터 추출 값 -> 템플릿 바인딩
        var template = '\
        <li class="ediya-menu__item">\
          <a href="#">\
            <figure>\
              <img src="https://raw.githubusercontent.com/yamoo9/assets/master/images/ediya/'+ name + '.png" alt width="' + width + '" height="' + height + '">\
              <figcaption>'+ ko + '</figcaption>\
            </figure>\
          </a>\
          <div hidden class="ediya-menu__item--detail">\
              <strong class="ediya-menu__item--name">'+ ko + '<span lang="en">' + en + '</span></strong>\
              <p>'+ desc + '</p>\
              <div class="ediya-menu__item--multi-column is-2"><p>';

        template += $.template(display, function (item) {
          return '<span>' + item[0] + '<b>(' + item[1] + ')</b></span>';
        });

        template += '</p></div><button type="button" class="button is-close-panel" aria-label="아이템 소개 패널 닫기">×</button></div></li>';
        return template;
      });

      console.log(templ);

      // 최종적으로 JSON 접합
      $meun.html(templ);
    });


  })(window, Dom, ajax);