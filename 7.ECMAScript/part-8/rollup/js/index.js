  // 모듈 로드
  import {$} from './modules/yamoo9.js';
  import PeopleLoader from './modules/PeopleLoader.js';

  // 멤버 API 배열
  let members = ['8zt2r', '1f9l0z', '12cowz'];

  // DOM 객체 참조 변수
  let cardContainer = $('.card-container'),
      addButton     = $('.add-button');

  // PeopleLoader 객체 생성
  let loader = new PeopleLoader(members, cardContainer, addButton);