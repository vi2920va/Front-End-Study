(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // 비공개 속성(심볼)
  var _members = Symbol('members'); // 클래스


  var CommunityManager =
  /*#__PURE__*/
  function () {
    function CommunityManager() {
      _classCallCheck(this, CommunityManager);

      this[_members] = [];
    }

    _createClass(CommunityManager, [{
      key: "init",
      value: function init(members) {
        var _this = this;

        var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        this.fetch(members).then(function (data) {
          return _this[_members] = data;
        }).then(function () {
          return cb();
        });
      }
    }, {
      key: "getMembers",
      value: function getMembers() {
        return this[_members];
      }
    }, {
      key: "addMembers",
      value: function addMembers(newbee) {
        var _this2 = this;

        var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        this.fetch(newbee).then(function (data) {
          return _this2[_members] = [].concat(_toConsumableArray(_this2[_members]), _toConsumableArray(data));
        }).then(function () {
          return cb();
        });
      }
    }, {
      key: "fetch",
      value: function (_fetch) {
        function fetch(_x) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }(function (id) {
        return fetch("https://api.myjson.com/bins/".concat(id)).then(function (response) {
          return response.json();
        });
      })
    }]);

    return CommunityManager;
  }();

  var toString = Object.prototype.toString;
  var $ = function $(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return context.querySelector(selector);
  };
  var type = function type(o) {
    return toString.call(o).toLowerCase().slice(8, -1);
  };
  var communityManager = new CommunityManager();

  var _data = Symbol('data');

  var _init = Symbol('init');

  var _bind = Symbol('bind');

  var _updateAddButtonState = Symbol('updateAddButtonState'); // 지역 변수


  var count = 0; // 클래스

  var PeopleLoader =
  /*#__PURE__*/
  function () {
    function PeopleLoader(data, container, button) {
      _classCallCheck(this, PeopleLoader);

      // 비공개 속성
      this[_data] = data; // 공개 속성

      this.container = container;
      this.button = button; // manager 객체 초기화

      communityManager.init(data[count++], this[_init].bind(this));
    }

    _createClass(PeopleLoader, [{
      key: _init,
      value: function value() {
        this.render();

        this[_bind]();
      }
    }, {
      key: _bind,
      value: function value() {
        var _this = this;

        this.button.addEventListener('click', function (e) {
          e.target.classList.add('is-loading');

          _this.update();
        });
      }
    }, {
      key: _updateAddButtonState,
      value: function value() {
        var button = this.button;
        var members = this[_data];
        button.classList.remove('is-loading'); // 더 이상 불러올 데이터가 없을 경우

        if (type(members[count]) === 'undefined') {
          button.setAttribute('disabled', 'disabled');
        }
      }
    }, {
      key: "update",
      value: function update() {
        communityManager.addMembers(this[_data][count++], this.render.bind(this, 'update'));
      }
    }, {
      key: "render",
      value: function render(state) {
        var template = '';
        communityManager.getMembers().forEach(function (member) {
          template += "\n          <div class=\"card column is-6-tablet is-4-desktop\">\n            <div class=\"card-content\">\n              <div class=\"media\">\n                <div class=\"media-left\">\n                  <figure class=\"image is-80x80\">\n                    <img src=\"".concat(member.picture, "\" alt=\"").concat(member.name, "\">\n                  </figure>\n                </div>\n                <div class=\"media-content\">\n                  <p class=\"title is-4\">").concat(member.name, " | ").concat(member.gender, "</p>\n                  <p class=\"subtitle is-6\">@").concat(member.email, "</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        ");
        });
        this.container.innerHTML = template;

        if (state === 'update') {
          this[_updateAddButtonState]();
        }
      }
    }]);

    return PeopleLoader;
  }(); // 모듈 출력

  // 모듈 로드

  var members = ['8zt2r', '1f9l0z', '12cowz']; // DOM 객체 참조 변수

  var cardContainer = $('.card-container'),
      addButton = $('.add-button'); // PeopleLoader 객체 생성

  var loader = new PeopleLoader(members, cardContainer, addButton);

}());
