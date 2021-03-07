// ----------------------------------------------------
// 날짜/시간 정보와 관련된 객체
// ----------------------------------------------------

// Date 객체 생성 및 변수 참조
// 밀레니엄 계산(2000년대) 과의 호환성을 위해
// 연도를 지정할 때는 반드시 4자리로 써야 합니다.
// 예를 들자면, 98이 아닌 1998로 써야한다는 뜻입니다.
// 연도 지정을 돕기 위해, JavaScript는
// getFullYear, setFullYear, getUTCFullYear, setUTCFullYear
// 등의 메소드를 포함하고 있습니다.

var date_obj = new Date ();

// 현재 년(year) 구하기
// 로컬 시간에 따라 명시된
// 날짜의 연도(4개 문자)를 반환
var current_year = date_obj.getFullYear();

// 현재 월(month) 구하기
// 로컬 시간에 따라 명시된
// 월(0-11)을 반환
// 0 = 1월, 11 = 12월
var current_month = date_obj.getMonth() + 1;

// 현재 일(date) 구하기
// 로컬 시간에 따라 명시된 날짜가
// 한달의 몇번째 날인지 반환 (1-31)
var current_date = date_obj.getDate();

// 현재 요일(day) 구하기
// 로컬 시간에 따라 명시된 날짜가
// 주중의 몇번째 요일인지 반환 (0-6)
// 0 = 일요일
var current_day = date_obj.getDay();

// 현재 시간(hours) 구하기
// 로컬 시간에 따라 명시된
// 시간(0-23)을 반환
// 12 = 오후 12시
var current_hours = date_obj.getHours();

// 현재 분(minutes) 구하기
// 로컬 시간에 따라 명시된
// 분(0-59)을 반환
var current_minutes = date_obj.getMinutes();

// 현재 초(seconds) 구하기
// 로컬 시간에 따라 명시된
// 초(0-59)를 반환
var current_seconds = date_obj.getSeconds();

// 현재 밀리초(milliseconds) 구하기
// 로컬 시간에 따라 명시된
// 밀리초(0-999)를 반환
// 1000밀리초 = 1초
var current_milliseconds = date_obj.getMilliseconds();

// 현재 시간을 밀리초(milliseconds) 값으로 구하기
// 로컬 시간에 따라 명시된 날짜의 숫자 값을
// 1970년 1월 1일 00:00:00 UTC 이후의 밀리 초 수로 반환
var current_time_to_milliseconds = date_obj.getTime();



/* ============================================
 * 객체의 메서드(함수)를 사용하여 현재 날짜 정보 가져오기 */

// .toLocaleDateString()
// "2018. 3. 20."
var todayLocal = date_obj.toLocaleDateString(); 

// .toDateString()
// "Tue Mar 20 2018"
var to_Date = date_obj.toDateString();

// .toISOString()
// "2018-03-20T04:59:05.131Z"
var to_ios = date_obj.toISOString();

// .toLocaleTimeString()
// "오후 1:59:05"
var to_localtime = date_obj.toLocaleTimeString();

// .toString()
// "Tue Mar 20 2018 13:59:05 GMT+0900 (KST)"
var to_string = date_obj.toString();

// .toTimeString()
// "13:59:05 GMT+0900 (KST)"
var to_timestriong = date_obj.toTimeString();

// .toUTCString()
// "Tue, 20 Mar 2018 04:59:05 GMT"
var to_tcsstring = date_obj.toUTCString();

/* ============================================
 * 날짜를 설정하여 객체를 생성 */

// "December 31, 1980 21:42:18"
var birthday = new Date (1980, 11, 13, 21, 42, 32);

// 1980, 11, 31               →   11 = 12월

// 1980, 11, 31, 21, 42, 18   →   11 = 12월
