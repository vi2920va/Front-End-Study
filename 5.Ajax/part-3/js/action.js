
// Open API
// SOP(Same Origin Policy) 문제가 발생하지 않는 경우
// 1. Access-Control-Allow-Origin: *
; (function (global, $, ajax) {
  'use strict';

  // KAIST Open API (https://goo.gl/XgStPb)
  // 뉴스, 알림사항, 학사공지, 채용초빙, 입찰구매 API 로 빠르고 풍부한 뉴스검색결과를 사용해보세요.

  // 사용법
  // 'http://www.kaist.ac.kr/_module/api/json.php?code=kr_060501&start=1&display=10'

  var kaist_open_api_address = 'http://www.kaist.ac.kr/_module/api/json.php';

  // site_dvs_cd
  var site_cd = 'kr';

  // 알림사항 : 0801
  // 학사공지 : 0802
  // 채용초빙 : 'kr_0824'
  // news
  var code = 'news';
  // 정수: 1 ~ 1000
  var start = 4;

  // 정수: 1 ~ 100
  var display = 5;


  ajax
    .get(kaist_open_api_address + '?code=' + code + '&start=' + start + '&display=' + display)
    .then(function (data) {

      var template = $.template(JSON.parse(data), function (item) {
        // 정규표현식 사이트 
        // https://www.regextester.com

        // item content 불러온 img 주소에 문제가 있으므로 정규표현식으로 바꾼다.
        var contents = item.contents.replace(/src=\"\/_prog\//ig, 'src="http://news.kaist.ac.kr/_prog/');
        return '<div>' + contents + '</div>'

      });

      $('main').html(template);

    });

})//(window, Dom, ajax);

  // SOP 문제가 발생한 경우
  // 2. JSONP(JSON with Padding) 방식
  ; (function (global, $, ajax) {
    'use strict';

    var api_address = 'https://yamoo9.herokuapp.com/rest/ediya-menu';

    // SOP 문제 발생!
    // Ajax 비동기 호출
    // ajax
    //   .get(api_address)
    //   .then(function (data) {
    //     console.log(data);
    //   });

    // SOP 문제 해결
    // Ajax가 아닌, JSONP 방식으로 호출 (GET 메서드만 가능)
    function jsonp(url, callback, time_limit, log) {

      // 고유 아이디 생성
      var unique_id = Math.floor(Math.random() * 100000);

      // 콜백 함수 이름 설정
      var jsonpCb = 'jsonpCb_' + unique_id;

      // 임시 <script> 요소 생성
      var s = document.createElement('script');

      // 임시 <script> 요소에 src 속성 값으로 JSONP 설정
      s.src = url + '?callback=' + jsonpCb;

      // 임시 <script> 요소 문서에 추가
      document.head.insertAdjacentElement('beforeend', s);

      // JSONP 콜백 함수를 전역에 생성
      window[jsonpCb] = callback;

      // 사용 후, 불필요한 임시 <script> 요소 제거
      s.remove ? s.remove() : s.parentNode.removeChild(s);

      // 사용 후, 불필요한 window[jsonpCb] 제거
      window.setTimeout(function () {

        // log 옵션 값이 true 일 경우, 로드 출력
        log && console.info('JSONP 콜백함수: ' + jsonpCb + '를 전역에서 제거했습니다.');

        // window[jsonpCb] 제거
        delete window[jsonpCb];

      }, (time_limit || 3) * 1000);

    }

    // 개발자 툴에서 들어온 data를 보게되면 새로고침 할 떄마다
    // jsonpCb의 고유한 ID 값이 설정되고 충돌로 인한 문제 발생을 해결 한다.

    // [현재가 서버가 아닌 다른 서버의 데이터 공유를 jsonp 방법으로 할 수 있다가 핵심이다.]
    jsonp(api_address, function (data) {
      $.template(data, function (item) {
        // console.log(item.figure.name);
        console.log(item.detail.display_criteria);
      });
    }, 3, true);

    // 아래의 코드는 ajax를 사용한 비동기 통신 방법을 사용한 것이 아니다.
    // json data를 받을 때 JSONP(JSONwithPadding)을 사용한 것이다.

    // var s = document.createElement('script');
    // s.src = api_address + '?callback=jsonCb';

    // document.head.insertAdjacentElement('beforeend', s);
    // function jsonCb(data) {
    //   console.log(data);
    // }


  })//(window, Dom, ajax);

  // 3. ajax 객체에 jsonp 메서드 추가
  ; (function (global, $, ajax) {
    'use strict';

    var api_address = 'https://yamoo9.herokuapp.com/rest/ediya-menu';

    ajax.jsonp(api_address, function (data) {
      $.template(data, function (item) {
        console.log(item.detail.display_criteria);
      });
    });

  })//(window, Dom, ajax);


  // 4. CORS 무료 프록시 서버 활용
  // 실제 사이트 배포 시 사용 금지!!
  ; (function (global, $, ajax) {
    'use strict';

    var api_address = 'https://yamoo9.herokuapp.com/rest/ediya-menu';

    function corsURL(url) {
      return 'https://api.allorigins.win/raw?url=' + url;
    }

    ajax.get(corsURL(api_address))
      .then((data) => {
        console.log(JSON.parse(data));
      });

  })(window, Dom, ajax);