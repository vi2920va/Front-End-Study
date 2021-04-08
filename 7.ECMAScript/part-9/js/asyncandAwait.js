//-------------------------------------------------------------------------------------
// Async/Await
//-------------------------------------------------------------------------------------
// 지금까지 비동기 프로그래밍은 콜백 또는 Promise를 활용해왔다.
// 하지만 ECMAScript2017(ES8+) 부터 새롭게 추가된 Async/Await를 
// 사용하면 비동기 프로그래밍을 보다 직관적으로 관리할 수 있다.
//-------------------------------------------------------------------------------------
// 1. Async 함수 
// : 함수를 Async 함수로 변경하려면 function 앞에 async 키워드를 붙인다. Async 함수는
//  암묵적으로 Promise를 반환하므로 .then() 또는 .catch() 메서드를 사용해 실행(fulfill),
//  거절(reject)을 처리할 수 있다.
(() => {
    return;
    async function asyncFn() {
        if (Math.random() > 0.5) {
            return '0.5보다 큽니다.';
        } else {
            return new Error('0.5보다 작습니다!!');
        }
    }

    asyncFn()
        .then(response => console.log(response))
        .catch(error => console.error(error.message));
})();

// 2. await 
// : 키워드는 데이터가 응답 반환 될 때까지 실행 흐름을 일시 중단한다. 아래 코드는 약 2초의 지연된 
// 시간 뒤에 응답하는 getData() 함수를 사용해 비동기 처리를 시뮬레이션 하는 코드이다. 
// await는 getData() 함수의 응답이 올 때까지 대기하였다가 응답이 오면 data에 결과를 할당한다
(() => {

    const getData = () => {
        let timeout = Math.floor(Math.random() * 2000);
        return new Promise(resolve => {
            window.setTimeout(() => resolve(['지연', '된', '데이', '터', '전송']), timeout);
        });
    };

    async function asyncFn() {
        const data = await getData(); // 데이터 응답까지 대기
        console.log(data); // 응답 받은 후 데이터 출력
    }
    asyncFn();
})();

// 3.  Promise VS Async 함수의 코드 비교 
(() => {
    return;
    // Promise
    const api = 'https://jsonplaceholder.typicode.com';

    function asyncCallDatas() {
        let todo, photo;
        Promise.all([
            fetch(`${api}/todos/9`)
                .then(response => response.json())
                .then(data => todo = data),
            fetch(`${api}/photos/7`)
                .then(response => response.json())
                .then(data => photo = data)
        ])
            .then(results => console.log(todo, photo));
    }

    asyncCallDatas();
})();


// 3-1  Promise VS Async 함수의 코드 비교 
(() => {
    return;
    // Async/Await 코드
    const api = 'https://jsonplaceholder.typicode.com';

    async function asyncCallDatas() {
        let todo = await (await fetch(`${api}/todos/9`)).json();
        let photo = await (await fetch(`${api}/photos/7`)).json();
        console.log(todo, photo);
    }

    asyncCallDatas();
})();


// 3-2  Async/Await 코드 - 구조분해 할당 활용.
(() => {
    return;
    // Async/Await 코드
    const api = 'https://jsonplaceholder.typicode.com';

    async function asyncCallDatas() {
        let [todo, photo] = await Promise.all([
            (await fetch(`${api}/todos/9`)).json(),
            (await fetch(`${api}/photos/7`)).json()
        ]);
        console.log(todo, photo);
    }
    asyncCallDatas();

})();
