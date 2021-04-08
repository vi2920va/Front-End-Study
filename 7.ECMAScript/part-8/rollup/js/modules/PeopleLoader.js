// 모듈 로드
import {communityManager as manager, $, type} from './yamoo9.js';

// 비공개 속성(심볼)
let _data = Symbol('data');
let _init = Symbol('init');
let _bind = Symbol('bind');
let _updateAddButtonState = Symbol('updateAddButtonState');

// 지역 변수
let count = 0;

// 클래스
class PeopleLoader {
    constructor(data, container, button) {
        // 비공개 속성
        this[_data] = data;
        // 공개 속성
        this.container = container;
        this.button = button;
        // manager 객체 초기화
        manager.init(data[count++], this[_init].bind(this));
    }
    [_init]() {
        this.render();
        this[_bind]();
    }
    [_bind]() {
        this.button.addEventListener('click', e => {
            e.target.classList.add('is-loading');
            this.update();
        });
    }
    [_updateAddButtonState]() {
        let button = this.button;
        let members = this[_data];
        button.classList.remove('is-loading');
        // 더 이상 불러올 데이터가 없을 경우
        if (type(members[count]) === 'undefined') {
            button.setAttribute('disabled', 'disabled');
        }
    }
    update() {
        manager.addMembers(this[_data][count++], this.render.bind(this, 'update'));
    }
    render(state) {
        let template = '';
        manager.getMembers().forEach(member => {
            template += `
          <div class="card column is-6-tablet is-4-desktop">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-80x80">
                    <img src="${member.picture}" alt="${member.name}">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">${member.name} | ${member.gender}</p>
                  <p class="subtitle is-6">@${member.email}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        });
        this.container.innerHTML = template;
        if (state === 'update') {
            this[_updateAddButtonState]();
        }
    }
}

// 모듈 출력
export default PeopleLoader;