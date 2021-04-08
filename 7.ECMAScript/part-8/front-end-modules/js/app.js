//--------------------------------------------------------------------------------------------------
// 모듈 (Modules)
//--------------------------------------------------------------------------------------------------
// 1. 모듈 이란?
// : 구현해야 할 기능을 캡슐화 하고, 공개 API를 제공하여 다른 코드에서 재사용 가능한 코드 블럭이다.

// 2. 모듈의 조건
// (1) 코드 추상화 : 외부 라이브러리 기능을 위임하여 사용할 때, 복잡한 이해 없이도 사용 가능해야 한다.
// (2)코드 캡슐화  : 코드 내부를 외부로 부터 접근할 수 없도록 감출 수 있어야 한다.
// (3) 코드 재사용 : 동일한 코드를 반복하여 작성하지 않도록 재사용 가능해야 한다.
// (4) 의존성 관리 : 코드를 다시 작성하지 않고도 쉽게 의존성을 변경할 수 있어야 한다.

// 3. 클라이언트 환경에서의 모듈?
// : 웹 탄생 시대부터 모듈이란 개념은 존재하지 않았다. 모듈과 비슷한 방법은 각각 나눠진 파일을 HTML
//  문서에서 순차적으로 로드해야 합니다. 주의할점은 의존 모듈 파일이 먼저 불러와야 올바르게 작동한다.

// 4. 비표준 모듈 포맷 (Modules Format) 
// (1) IIFE 패턴 - 캡슐화 ,언어 자체에서 모듈이 지원되지 않아서 그동안 IIFE 패턴 사용.
// (2) IIFE + Revealing - 노출 모듈 (Revealing Module) 패턴, 캡슐화, 재사용
var module = (function () {
    return;
    // 비공개
    var private_var = '외부에서 접근 불가, 하지만 publicMethod()로 접근 가능';
    // 외부로 공개하는 모듈
    return {
        publicMethod: function () { return private_var; }
    };
})();
// console.log(module.publicMethod()); // '외부에서 접근 불가, 하지만 publicMethod()로 접근 가능'
// console.log(module.private_var); // undefined
// (3) AMD : 현재 많이 사용하지 않는다.
//--------------------------------------------------------------------------------------------------
// ☆ ES6를 지원하는 환경 ☆ 
// 1. Modules import : 정적 import 문은 다른 모듈에서 내보낸 바인딩을 가져올 때 사용한다.

// (1) import -  jQuery 의존 모듈 로드 (type ='module')
// : 전역과 구분되는 독자적인 공간으로 캡슐화가 구성되어 있다. IIFE 모듈 패턴은 더 이상 필요 없다.
// 다시 말해서 내가 export 키워드로 Data 를 내보내지 않는 이상 해당 데이터는 모듈 안에서 보호 된다.

// + jQuery는 따로 export 구문이 포함되어 있지 않지만, UMD 모듈 포멧을 적용하고 있어 브라우저 환경에서 
// 바로 사용 가능하다
// import 'https://unpkg.com/jquery';

// jQuery('body').css('background', '#20c7be');

// let private_data = [jQuery.fn.jquery];

// console.log(private_data); // ["3.4.1"]

// (2) import - don.fn.js 의존 모듈 로드
// - don.fn만 기입해서 정상적으로 파일을 로드 할 수 없다. 반드시 js도 같이 붙여서 사용해야 된다.
// - 모듈을 로드 했다고 바로 사용할 수 없다. 모듈 파일에서 내보낼 파일을 명시적으로 설정해야 사용 가능하다.

// import './modules/dom.fn.js'; 
// console.log(els); // Uncaught ReferenceError: els is not defined

// (3) import - import 구문에서 'from' 키워드 뒤에 있는 것은 파일의 상대위치.
// import {y9} from './modules/dom.fn.js';  // { y9 : {el, els} }

// console.log('y9 : ', y9); // {el, els}

// let {el, els} = y9;

// console.log(el);

// (4) import - 모듈을 불러와서 모듈 내부에 export 된 원하는 함수만 꺼집어내서 비구조화 방식으로 사용
// import { el, css } from './modules/dom.fn.js';  // {el, els, each, css, ...}

// window.setTimeout(() => css(el('body'), 'background', '#20c7be'), 2000);

// (5) import - default export로 불러올때는 y9이 메인 이기 때문에 중괄호 별도로 필요 없다.
// import y9 from './modules/dom.fn.js';

// let { el, css } = y9;

// window.setTimeout(() => css(el('body'), 'background', '#20c7be'), 2000);


// (6) import - default export & Others 개별 이름 함수 받기
// import y9, { scrollWidth, scrollHeight } from './modules/dom.fn.js';

// let { el, css } = y9;

// console.log(scrollHeight(el('body')));

// window.setTimeout(() => css(el('body'), 'background', '#20c7be'), 2000);

// (7) import - Named export로 출력된 이름을 다른 이름으로 alias 사용하고자 할 때는 
//              as 키워드 사용해서 별칭을 사용하면 된다.

// import y9, { scrollWidth as sw, scrollHeight as sh } from './modules/dom.fn.js';

// let { el, css } = y9;

// scrollHeight는 as를 사용해서 별칭을 사용했기 때문에 이제 이 안에서 sw로 사용해야 된다.
// console.log(typeof sw, typeof scrollHeight); // function undefined

// console.log(sh(el('body')));

// window.setTimeout(() => css(el('body'), 'background', '#20c7be'), 2000);

// (8) import - *  출력된 모든 모듈은 묶어준다.
// import * as $ from './modules/dom.fn.js';

// console.log('$ : ', $);

// let { el, css } = $;

// console.log($.scrollHeight(el('body')));

// window.setTimeout(() => css(el('body'), 'background', '#20c7be'), 2000);

// 2. Moudle Loaders / Bundlers

// https://rollupjs.org/guide/en/ - 롤업(웹팩 보다 더 가볍고 다루기 쉽다. )
// https://webpack.js.org/ - 웹팩

// (1) Loaders
// : 모듈 로더는 클라이언트 환경에서 런타입 실행 중에 모듈을 로드 한다.(현재 잘 사용하지 않는다...)
// RequireJS : 자바스크립트 파일 모듈 로더 (클라이언트 환경
// SystemJS : ES6 모듈 문법을 사용한 로더 (서버/클라이언트 모든 환경)

// (2) Bundlers
// : 모듈 번들러는 서버 환경에서 빌드 과정에서 모듈을 로드하고 번들링 한다.
// Browserify : CommonJS 방식의 모듈 번들러. (번들링 후에는 클라이언트 환경에서 사용 가능)
// Webpack : 자바스크립트 파일 뿐만 아니라, 다양한 파일 포멧을 번들링 하는데 사용된다.
// rollup.js : 자바스크립트 모듈 번들러로 작은 코드를 라이브러리나 애플리케이션과 같이 더 크고 복잡한 코드로 컴파일한다.

// +  인터넷 익스플러는 모듈을 제공하지 않아서 실무에서 쓰지 못할 수 있다. 이떄 모듈 번들러 모듈 툴을 사용해야 된다.
// https://rollupjs.org/guide/en/ - 롤업(웹팩 보다 더 가볍고 다루기 쉽다. )
// https://webpack.js.org/ - 웹팩
//--------------------------------------------------------------------------------------------------
// ☆ Rollup ☆ 
// : 롤업은 javascript 모듈 번들러로 다수의 모듈 파일이나 하나의 번들링 파일로 만들어 준다.
//   COMMONks, AWD, UMD 또는 ES6 표준 모듈 포멧을 선태적으로 출력 옵션을 할 수 있다.

// 1. 롤업을 사용하는 이유 
// : 애플리케이션 구축에는 많은 코드가 필요하다. 그 복잡성을 줄여주기 위해서 코드를 작은 단위로 쪼개서 관리해야할 
//   필요가 있다.하지만 ES5 까지의 JavaScript에서는 모듈 기능을 지원하지 않는다. ES6부터는 언어 차원에서 모듈기능
//   을 지원하지만,아직은 모든 브라우저에서 사용할 수 없는 문제가 있다. 이와 같은 문제 해결을 위해 필요한 것이 
//   모듈 번들러 이다. 롤업은 웹팩과 마찬가지로 '오늘날 모든 브라우저에서 모듈을 사용할 수 있도록 도와주는 도구' 이다.

// 2. 롤업의 특징
// (1)Tree Shaking 
// : 나무 흔들기 (Tree Shaking) 기술은 언어 차원에서 표준으로 지원되는 걸 바로 쓸 수 있다. 실제로 사용되지 않는 코드는 항목에서
//   제외 시켜 번들링한다.



