//-------------------------------------------------------------------------------------
// Iteration Object 
//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// ☆ ES5 예제 ☆ 

// #1. for ~ in
(() => {
  return;
  // 기존 코드의 경우 객체를 순환 처리할 경우 for ~ in 사용
  var picture = {
    large: 'https://randomuser.me/api/portraits/men/65.jpg',
    medium: 'https://randomuser.me/api/portraits/med/men/65.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'
  };
  // for ~ in
  for (var key in picture) {
    if (picture.hasOwnProperty(key)) {
      var value = picture[key];
      console.log(key, value);
    }
  }

})();

//-------------------------------------------------------------------------------------
// ☆ Iteration Object ☆
// 객체 속성 또는 배열 값을 변수에 할당할 때 매, 비구조화 할당을 활용하면 매우 유용하다.

// #1. for ~ of
(() => {
  return;
  let picture = {
    large: 'https://randomuser.me/api/portraits/men/65.jpg',
    medium: 'https://randomuser.me/api/portraits/med/men/65.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'
  };

  const picture_keys = Object.keys(picture);
  // (1) Object.keys() - 객체의 속성 반환
  for (let key of picture_keys) {
    console.log(key);
    // 출력: ['large', 'medium', 'thumbnail']
  }

  //(2) Object.values() - 객체의 값을 Iterable 프로토콜에 준하는 객체로 반환
  const picture_values = Object.values(picture);
  for (let value of picture_values) {
    console.log(value);
    // 출력: ['https://...', 'https://...', 'https://...']
  }
  // (3) Object.entries() - 객체의 속성, 값을 쌍으로 하는 배열을 묶은 배열을 반환
  const picture_entries = Object.entries(picture);
  for (let [key, value] of picture_entries) {
    console.log(key, value);
    // 출력:   
    //   ['large', 'https://...' ],
    //   ['medium', 'https://...'],
    //   ['thumbnail', 'https://...']
  }
})();

// #2. 배열 객체 메서드를 사용해 순환하는 것도 가능.
(() => {

  let picture = {
    large: 'https://randomuser.me/api/portraits/men/65.jpg',
    medium: 'https://randomuser.me/api/portraits/med/men/65.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'
  };
  // 속성 순환
  Object.keys(picture).forEach(key => console.log(key));

  // 값 순환
  Object.values(picture).forEach(value => console.log(value));

  // 속성, 값 순환
  Object.entries(picture).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value);
  });

})();

