// ----------------------------------------------------
// 날짜 객체를 사용하여 한국형 날짜 정보를 반환하는 함수 만들기
// ----------------------------------------------------
var getYear, getMonth, getDate, getDay, getHour, getMinute, getSecond, getMillisecond, getISOTime;

// 몇 년도인지 반환하는 함수
// 예: '2018' 또는 '2018년'
function getYear(format) {
  var date = new Date();
  // 조건문
  // format 전달인자 값이 있으면 값을 사용하고,
  // 없으면 빈문자열을 사용한다.
  if(!format){
    format ='';
  }
  return date.getFullYear() + format;
}

// 몇 월인지 반환하는 함수
// 예: '3' 또는 '3월'
getMonth = function (format){
  var date = new Date();
  if(!format){
    format = '';
  }
  return (date.getMonth() + 1) + format;
}

// 몇 일인지 반환하는 함수
// 예: '20' 또는 '20일'
getDate = function (format){
  var date = new Date();
  if(!format){
    format ='';
  }
  return date.getDate();
} 

// 몇 요일인지 반환하는 함수
// 예: '화' 또는 '화요일'
getDay = function (format){
  var date = new Date();
  var day = date.getDay();

  switch(day){
    case 0 : day = '일'; break;
    case 1 : day = '월'; break;
    case 2 : day = '화'; break;
    case 3 : day = '수'; break;
    case 4 : day = '목'; break;
    case 5 : day = '금'; break;
    case 6 : day = '토'; break;
  }

  if(!format){ format = ''; }
  return day + format;
}


// 몇 시인지 반환하는 함수
// 예: '22' 또는 '22시'
getHour = function (format){
  var date = new Date();
  if(!format){ format = '';}
  return date.getHours();
}

// 몇 분인지 반환하는 함수
// 예: '45' 또는 '45분'
getMinute = function (format){
  var date = new Date();
  if(!format) {format = '';}
  return date.getMinutes() + format;
}

// 몇 초인지 반환하는 함수
// 예: '21' 또는 '21초'
getSecond = function (format){
  var date = new Date();
  if(!format) {format = '';}
  return date.getSeconds();
}

// 몇 밀리초인지 반환하는 함수
// 예: '514' 또는 '514밀리초'
getMillisecond = function (format){
  var date = new Date ();
  if(!format){format ='';}
  return date.getMilliseconds();
} 

// ISO 8601 문자 정보를 반환하는 함수
  // ISO 8601은 날짜와 시간과 관련된 데이터 교환을 다루는 국제 표준이다.
  // 이 표준은 국제 표준화 기구(ISO)에 의해 공포되었으며 1988년에 처음으로 공개되었다.
  // 이 표준의 목적은 날짜와 시간을 표현함에 있어 명백하고 잘 정의된 방법을 제공함으로써,
  // 날짜와 시간의 숫자 표현에 대한 오해를 줄이고자함에 있는데, 숫자로 된 날짜와 시간
  // 작성에 있어 다른 관례를 가진 나라들간의 데이터가 오갈때 특히 그렇다.
  // 참고: https://ko.wikipedia.org/wiki/ISO_8601
getISOTime = function (){
  var date = new Date();
  return date.toISOString();
};


// 일정한 주기(interval)마다 함수를 실행 (ms = milliseconds)
// window.setInterval(function, ms)
var today = el('.today');
var time = el('time', today);
 var year = el('.year', today);
 var month = el('.month',today);
 var date = el('.date', today);
 var day = el('.day', today);
 var hours = el('.hours', today);
 var minutes = el('.minutes', today);
 var seconds = el('.seconds', today);
 var milliseconds = el('.milliseconds', today);

function updateDateTimes(){
// <time> 요소의 datetime 속성 값을 ISO 날짜 정보 업데이트
time.setAttribute('datetime', getISOTime()); 
// 년, 월, 일, 요일, 시, 분, 초 , 밀리초 정보 업데이트
year.textContent = getYear();
month.textContent = getMonth();
date.textContent = getDate();
day.textContent = getDay();
hours.textContent = getHour();
minutes.textContent = getMinute();
seconds.textContent = getSecond();
milliseconds.textContent = getMillisecond();
}
updateDateTimes();

// 함수를 실행시키는 것 아니라, 참조 하는 것이다!
window.setInterval(updateDateTimes,1000);