let id = 0;
let eventList = [];
eventList.BLOCK = false;
/**
 * 如果事件列表未被锁定，获取事件列表中的第一个函数并执行，
 * 如果遇到Block函数，则把BLOCK置为true，等待unlock解锁
 */
function _next() {
  if (eventList.BLOCK) return;
  const { fn } = eventList.shift() || {};
  if (fn) {
    fn()
    if (fn.type === "block") eventList.BLOCK = true;
    _next();
  }
}

/**
 * 解锁函数，传递给eventBlock中的fn,unlock在组件中只能使用一次
 */
function unlock(resolve) {
  let flag = true;
  return function () {
    if (flag) {
      flag = !flag;
      eventList.BLOCK = false;
      resolve()
      _next();
    } else {
      console.warn("The next method can only be called once");
    }
  };
}

/**
 * 添加阻塞事件
 * @param {Function} fn   事件
 * @param {Object} vm  this
 */
export function addEventBlock(fn, vm) {
  _checkIsFunc(fn);
  return new Promise((resolve) => {
    const _fn = () => { 
      const res = fn.call(vm, unlock(()=>resolve(res)));
    }
    _fn.type = "block";
   eventList.BLOCK === false && eventList.push({ id: id++, fn: _fn });
    _next();
  });
}
/**
 * 添加非阻塞事件
 * @param {Function} fn   事件
 * @param {Object} vm   this
 */
export function addEvent(fn, vm) {
  _checkIsFunc(fn);
  return new Promise((resolve) => {
    const _fn = () => { 
      const res = fn.call(vm)
      resolve(res)
    }
    eventList.BLOCK === false && eventList.push({ id: id++, fn:_fn });
    _next();
  });
}

export function removeEvent(id) {
  return id;
}

/**
 * 检查传入fn是否为函数
 * @param {Function} fn
 */
function _checkIsFunc(fn) {
  if (Object.prototype.toString.call(fn) !== "[object Function]") {
    throw new Error("Event parameter is not a function");
  }
}
