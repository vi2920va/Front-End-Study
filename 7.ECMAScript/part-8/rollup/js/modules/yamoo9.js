import CommunityManager from './CommunityManager.js';

let toString = Object.prototype.toString;
let slice = Array.prototype.slice;
export let $ = (selector, context = document) => context.querySelector(selector);
export let $$ = (selector, context = document) => context.querySelectorAll(selector);
export let type = o => toString.call(o).toLowerCase().slice(8, -1);
export let makeArray = o => slice.call(o);
export let communityManager = new CommunityManager();
