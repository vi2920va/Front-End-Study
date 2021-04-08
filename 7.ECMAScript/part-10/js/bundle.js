(function () {
  'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  // ☆ for ~ of문 ☆
  // : 반복 가능한 객체(배열, 유사 배열, 문자열, 맵, 세트 등)
  var sports_shoes = ['조깅화', '축구화', '농구화'];
  // #3. break, continue 사용 가능하다. 
  // for (let shoes of sports_shoes) { if (shoes === '축구화') { continue; } console.log(shoes); }

  // #4. [].entries -> Array Iterator {}
  // : 배열 데이터에서 of 문을 사용해 index, item을 활용하고 싶다면 비구조 할당과 entries() 메서드 사용
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sports_shoes.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
        index = _step$value[0],
        item = _step$value[1];

      console.log("index: ".concat(index, ", item: ").concat(item));
      // index: 0, item: 조깅화
      // index: 1, item: 축구화
      // index: 2, item: 농구화

    } // #5.  [...arguments].entries() → Array Iterator {}

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  function loopArguments() {
    var args = Array.prototype.slice.call(arguments).entries();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
          i = _step2$value[0],
          arg = _step2$value[1];

        console.log("".concat(i, " => ").concat(arg));
        // 0 => first
        // 1 => []
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  loopArguments('first', []);

  // #7. for ~ of 사용 시, 주의할 점!
  // 유사 배열 객체

  var like_array_obj = {
    length: 3,
    0: '조깅화',
    1: '축구화',
    2: '농구화'
  };
  // for ~ of 문을 사용할 수 없다. - Uncaught TypeError: like_array_obj is not iterable
  // for (let v of like_array_obj) { }

  // 유사 배열 객체를 반복 가능한 객체(Iterator)로 변경해야 for ~ of문 사용 가능하다.
  // [...] 구문은 사용하면 오류. Array.from() 메서드 사용해야 한다.
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = Array.from(like_array_obj).entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var v = _step3.value;
      console.log(v);
      // [0, "조깅화"]
      // [1, "축구화"]
      // [2, "농구화"]

    } // #8. for ~ of문을 var, let, const와 사용할 때 주의할 점
    // 배열 객체
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var print_sports_shoesFn = []; // const, let 동일한 결과

  var _loop = function _loop() {
    var shoes = _arr[_i];
    print_sports_shoesFn.push(function () {
      return shoes;
    });
  };

  for (var _i = 0, _arr = ['조깅화', '축구화', '농구화']; _i < _arr.length; _i++) {
    _loop();
  }

  console.log(print_sports_shoesFn.map(function (f) {
    return f();
  })); // ["조깅화", "축구화", "농구화"]

  console.log(shoes); // ReferenceError: shoes is not defined
  // var 를 사용할 경우, 문제 발생.

  for (var _i2 = 0, _arr2 = ['조깅화', '축구화', '농구화']; _i2 < _arr2.length; _i2++) {
    var shoes = _arr2[_i2];
    print_sports_shoesFn.push(function () {
      return shoes;
    });
  }

  console.log(print_sports_shoesFn.map(function (f) {
    return f();
  })); // ["농구화", "농구화", "농구화"]

  console.log(shoes); // 농구화

}());
