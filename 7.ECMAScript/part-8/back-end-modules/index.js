// 모듈 포맷(Modules Format) - Common.js
// Module 호출
const utils = require('./modules/utils');

let { map, each } = utils;

let r_array = map([3, 6, 9], item => item * item);

// 확인하는 방법은 터미널에서 node index.js를 실행해서 확인한다.
// Common.js 말고도 AMD(require.js)환경도 있지만 실제로는 잘 사용되지 않는다.
console.log(r_array);

