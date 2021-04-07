//-------------------------------------------------------------------------------------
// 확장된 문자 개체 능력 활용 (String Additions)
//-------------------------------------------------------------------------------------
// 문자 객체에 새롭게 추가된 인스턴스 메서드(Instance Methods)를 통해서 기존에는
// 별도의 헬퍼 함수 만들어야 했던 기능을 ES6 부터는 기본적으로 제공해준다.
//-------------------------------------------------------------------------------------
// ☆ ES6 - 확장된 문자 개체 능력 활용 (String Additions)☆ 
// .indcludes()
// 임의의 텍스트가 포함되어있는지 여부 확인 가능, 보다 명시적이고 의미적으로 사용 가능

// .startsWith()
// 임의의 텍스트로 시작하는지 여부 확인 가능

// .endsWith()
// 임의 텍스트로 끝나는지 여부 확인 가능

// .repeat()
// 필요한 경우, 특정 텍스트를 반복 횟수 처리 가능
//-------------------------------------------------------------------------------------

// #1 .indcludes() 
// 플레이어 리스트(배열)
const players = 'messi ronaldo honaldo son'.split(' ');

// 함수: 문자를 포함하는 리스트 반환
function filterWordList(words, filter) {
    let word_list = [];
    for (let i = 0, l = words.length; i < l; ++i) {
        var word = words[i];
        // 문자 포함 여부 검증
        if (word.includes('naldo')) {
            word_list.push(word);
        }
    }
    return word_list;
}

// 함수 실행: 필터링 결과
let naldos = filterWordList(players, 'naldo');

// 결과 출력
console.log(naldos);

const title = '경제 지표 예측'
const substring = '지표';

//결과 출력
console.log(title.includes(substring)); //true
//-------------------------------------------------------------------------------------
//#2 .startsWith()

let kings_4 = '청룡 백호 현무 주작';

// 1. kings_4의 글자는 '백호'로 시작하는가?
kings_4.startsWith('백호'); // false

// 2. '현무'는 kings_4 글자의 6 인덱스 부터 시작하는가?
kings_4.startsWith('현무', 6); // true

//-------------------------------------------------------------------------------------
// #3 .endsWith()

let season = '봄 여름 가을 겨울';

// 1. season의 글자는 '겨울'로 끝나는가?
season.endsWith('겨울'); // true

// 2. season의 글자는 '가을'이 7번째 인덱스 (가을 다음 위치)에서 끝나는가?
season.endsWith('가을', 7); // true
//-------------------------------------------------------------------------------------
//#4 .repeat()

let repeat_word = '양심과 욕심';
repeat_word.repeat(); // ''
repeat_word.repeat(4); // '양심과 욕심양심과 욕심양심과 욕심양심과 욕심'    