//----------------------------------------------------------------------------------------
// 비동기 통신 기술 (Asynchronous JavaScript And XML)
//----------------------------------------------------------------------------------------
//  1. Live Server 설치
// (1) Ajax 통신을 하기 위해서 Server 환경이 필요.
// (2) 개발을 할 때 가속화 하기 위해 필요.

//  2. Ajax 장점
// (1) 요청/응답 과정을 통해 불필요한 부분까지 처리하지 않는다. (즉, 필요한 부분 별도 요청 가능)
// (2) 모든 데이터가 업데이트가 필요가 없으므로 불필요한 대역폭 감소 가능, 비용 절감 효과 
// (3) 사용자가 대기시간 감소, 페이지를 새로고침 하지 않고도 필요한 테이터만 내용을 업데이트 가능.
// (4) 기존의 동기 방식이 아닌, 비동기 방식으로 데이터를 요청/처리 하기 때문이다.

//  3. Ajax를 사용해서 전송 가능한 용어
//  : XML, TEXT, HTML, JSON (JSON을 오늘 날 많이 다룬다.)

//  4. 비동기 통신을 하기 위한 객체 (XML Http Request) 
// (1) Ajax 통신을 위해서는 XHR 객체를 사용해야 한다.
// (2) XHR 객체가 요청(Request)을 하게 되면 응답(Response)를 받아온다.
// (3) XHR 객체는 생성자 함수이다. 즉 new를 통해서 생성해야 한다. 
// EX) var xhr = new XMLHttpRequest; 

//  5.  XHR Constructor
// (1) open 메서드 : 서버에서 응답 받는 메서드
// (2) send 메서드 : 설정된 사항을 서버에 요청 하는 메서드, 통신성공을 해주는 역할

//  6. 서버 통신 상태 (Check Status) 
// (1) 100 (continue), 101 (Switching Protocols) : 진행 중인 상태
// (3) 200 (OK) : 성공
// (4) 404 (Client Error) : 잘못된 주소, 페이지를 찾을 수 없을 때
// (5) 5xx (Server Error) : Server 문제

// 7. Receive Response 
//----------------------------------------------------------------------------------------
// ☆ Ajax Synchronous ☆ 

// #1. 동기 통신 실습.
(function (global) {
    'use strict';

    // console.log('ajax lecture');

    // XMLHttpRequest 객체 생성 참조
    var xhr = new XMLHttpRequest();

    // open 메서드 사용 통신 설정 방법
    // : 통신 방법(GET, POST), 통신파일(txt, json...), 비동기 통신 설정(true/false)

    // open 동기 통신 설정
    xhr.open('GET', '../data/ajax-desc.txt', false);

    // 서버에 요청
    // xhr.send();

    // 동기 특성
    // : 개발자 도구에서 Disable cache를 체크하여, 동기 상태 확인 가능.
    //  (한 번 가져온 데이터의 경우 300, 새로 가져온 데이터 200) 

    // call-ajax-data-button 버튼을 참조
    var call_btn = document.querySelector('.call-ajax-data-button');
    var print_area = document.querySelector('.print-area');

    var callAjaxData = function () {
        //  서버에 요청
        xhr.send();
        // 대기중...

        //  통신 요청에 따른 응답이 오면 처리
        if (xhr.status === 200 || xhr.status === 304) {
            // console.log(xhr.responseText);

            // responseText (ajax 서버로 부터 전달 받은 데이터를 프로퍼티를 이용하여 확인)
            print_area.textContent = xhr.responseText;
        } else {
            console.warn('통신 실패');
        }
    };

    call_btn.addEventListener('click', callAjaxData);

})(window);