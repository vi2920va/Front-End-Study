// 비공개 속성(심볼)
let _members = Symbol('members');

// 클래스
export default class CommunityManager {
    constructor() {
        this[_members] = [];
    }
    init(members, cb = () => { }) {
        this.fetch(members)
            .then(data => this[_members] = data)
            .then(() => cb());
    }
    getMembers() {
        return this[_members];
    }
    addMembers(newbee, cb = () => { }) {
        this.fetch(newbee)
            .then(data => this[_members] = [...this[_members], ...data])
            .then(() => cb());
    }
    fetch(id) {
        return fetch(`https://api.myjson.com/bins/${id}`).then(response => response.json());
    }
}
