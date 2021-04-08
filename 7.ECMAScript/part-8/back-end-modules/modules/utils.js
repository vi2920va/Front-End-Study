// Export (./Utils.js)

const makeArray = (o) => [...o];
const each = (list, cb) => makeArray(list).forEach(cb);
const map = (list, cb) => list.map(cb);

module.exports = { each, map, makeArray };