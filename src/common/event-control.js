let eventList = [];
let BLOCK = false;

/**
 * 下一步，
 */
function _next() {
  if (BLOCK) return;
  const { fn, resolve } = eventList.shift() || {};
  if (fn) {
    resolve(fn());
    if (fn.type === "block") BLOCK = true;
    _next();
  }
}

/**
 * 解锁函数，传递给fn
 */
 function unlock() {
  BLOCK = false;
  _next();
}

/**
 * 添加阻塞事件
 * @param {} fn   事件
 * @param {*} vm  this
 */
export function addEventBlock(fn, vm) {
  return new Promise((resolve) => {
    const _fn = () => {
      fn.call(vm, unlock);
    };
    _fn.type = "block";
    eventList.push({ fn: _fn, resolve });
    _next();
  });
}
/**
 * 添加非阻塞事件
 * @param {t} fn   事件
 * @param {*} vm   this
 */
export function addEvent(fn, vm) {
  return new Promise((resolve) => {
    eventList.push({ fn: fn.bind(vm), resolve });
    _next();
  });
}
