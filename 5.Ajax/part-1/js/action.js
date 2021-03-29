//----------------------------------------------------------------------------------------
// 비동기 통신 기술 (Asynchronous JavaScript And XML)
//----------------------------------------------------------------------------------------
//  1. Ajax 사용하기 위해서는 Live Server 필요한 이유
// (1) Ajax 통신을 하기 위해서 Server 환경이 필요.
// (2) 개발을 할 때 가속화 하기 위해 필요.

//  2. Ajax 장점
// (1) 요청/응답 과정을 통해 불필요한 부분까지 처리하지 않는다. (즉, 필요한 부분 별도 요청 가능)
// (2) 모든 데이터가 업데이트가 필요가 없으므로 불필요한 대역폭 감소 가능, 비용 절감 효과 
// (3) 사용자가 대기시간 감소, 페이지를 새로고침 하지 않고도 필요한 테이터만 내용을 업데이트 가능.
// (4) 기존의 동기 방식이 아닌, 비동기 방식으로 데이터를 요청/처리 하기 때문이다.

//  3. 서버에서 반환되는 데이터 형식 
//  : XML, TEXT, HTML, JSON (JSON을 오늘 날 많이 다룬다.)

//  4. 서버 통신 상태 (Check Status) 
// (1) 100 (continue), 101 (Switching Protocols) : 진행 중인 상태
// (2) 200 (OK) : 성공
// (3) 404 (Client Error) : 잘못된 주소, 페이지를 찾을 수 없을 때
// (4) 5xx (Server Error) : Server 문제
//----------------------------------------------------------------------------------------
//  Ajax 시작하기
//----------------------------------------------------------------------------------------
//  1. 비동기 통신을 하기 위한 객체 (XML Http Request) 
// (1) Ajax 통신을 위해서는 XHR 객체를 사용해야 한다.
// (2) XHR 객체가 요청(Request)을 하게 되면 응답(Response)를 받아온다.
// (3) XHR 객체는 생성자 함수 이다. 즉 new 를 통해서 생성해야 한다. 
// EX) var xhr = new XMLHttpRequest; 

//  2. 서버로 보내는 Request 
// (1) open 메서드 : 서버에서 응답 받는 메서드
// (2) send 메서드 : 설정된 사항을 서버에 요청 하는 메서드, 통신성공을 해주는 역할

//  3. Check Event & State
//  : Ajax는 비동기 통신 이므로, 서버 요청한 결과를 수신하기 위한 이벤트 핸들러가 필요하다.
//    이떄 onreadystatechange 함수를 연결해서 콜백 할 수 있다.

//  3-1. 이벤트 상태 (ReadyState)
//  : 0 (Uninitialized) : 초기화가 안된 상태, 1 (Loading) : 로딩 중, 2 (Loaded) : 로딩 끝난 상태, 
//    3 (Interactive)   : 데이터 일부를 받은 상태,  4 (Complete) : 완료

//----------------------------------------------------------------------------------------
// ☆ Ajax Synchronous ☆ 

// #1. 비동기 통신 실습.
(function (global) {
    'use strict';

    function ajaxDemo() {
        // XMLHttpRequest 객체 생성 참조
        var xhr = new XMLHttpRequest();

        // 비동기 통신 설정
        xhr.open('GET', 'data/ajax-desc.txt');

        // 서버에서 응답이 올 경우, 이벤트를 감지하여 처리하는 이벤트 핸들링 설정
        xhr.onreadystatechange = function () {
            // 통신 요청에 따른 응답이 오면 처리 (비동기)
            if ((xhr.status === 200 || xhr.status === 304) && xhr.readyState === 4) {
                console.info('Finish : xhr.status: ', xhr.status);
                console.info('Complete xhr.readyState:', xhr.readyState);
                print_area.textContent = xhr.responseText;
            } else {
                console.info('xhr.status: ', xhr.status);
                console.info('xhr.readyState:', xhr.readyState);
                // console.warn('통신 실패');
            }
        };

        // 서버에 요청
        xhr.send();
    }


    // call-ajax-data-button 버튼을 참조
    var call_btn = document.querySelector('.call-ajax-data-button');
    var print_area = document.querySelector('.print-area');

    var callAjaxData = function () {
        // xhr.send();

        // 대기중...

        //  통신 요청에 따른 응답이 오면 처리
        // if (xhr.status === 200 || xhr.status === 304) { print_area.textContent = xhr.responseText; }
        // else { console.warn('통신 실패'); }
    };
    // call_btn.addEventListener('click', ajaxDemo);

    // Ajax 라이브러리 사용
    call_btn.addEventListener('click', function () {
        ajax({
            url: 'data/ajax-desc.txt',
            dataType: 'text'
        }).then(function (data) {
            print_area.textContent = data;
        });
    });

})(window);