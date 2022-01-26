let id = 0;
export default class eventCenter {
  constructor() {
    this.id = id++;
    this.eventList = [];
    this.eventList.BLOCK = false;
  }
  /**
   * 如果事件列表未被锁定，获取事件列表中的第一个函数并执行，
   * 如果遇到Block函数，则把BLOCK置为true，等待unlock解锁
   */
  next() {
    if (this.eventList.BLOCK) return;
    const { fn } = this.eventList.shift() || {};
    if (fn) {
      fn();
      if (fn.type === "block") this.eventList.BLOCK = true;
      this.next();
    }
  }

  /**
   * 解锁函数，传递给eventBlock中的fn,unlock在组件中只能使用一次
   */
  unlock() {
    let flag = true;
    return function () {
      if (flag) {
        flag = !flag;
        this.eventList.BLOCK = false;
        this.next();
      } else {
        console.warn("The next method can only be called once");
      }
    }.bind(this);
  }

  /**
   *
   * @returns 当前锁状态
   */
  getEventStatus() {
    return this.eventList.BLOCK;
  }

  /**
   * 添加阻塞事件
   * @param {Function} fn   事件
   * @param {Object} vm  this
   * @param {String} key  id值，如果不提供则自动id++
   */
  addEventBlock(fn, key) {
    _checkIsFunc(fn);
    return new Promise((resolve) => {
      const _fn = () => {
        resolve(fn(this.unlock()));
      };
      _fn.type = "block";
      this.eventList.push({ id: key, fn: _fn });
      this.next();
    });
  }
  /**
   * 添加非阻塞事件
   * @param {Function} fn   事件
   * @param {Object} vm   this
   * @param {String} key  id值，
   */
  addEvent(fn, key) {
    _checkIsFunc(fn);
    return new Promise((resolve) => {
      const _fn = () => {
        resolve(fn());
      };
      this.eventList.push({ id: key, fn: _fn });
      this.next();
    });
  }

  /**
   * 移出fn
   * @param {int} id
   * @returns
   */
  removeEvent(eventId) {
    _checkID(eventId);
    const block = this.eventList.BLOCK;
    this.eventList = this.eventList.filter(({ id }) => eventId !== id);
    this.eventList.BLOCK = block;
  }

  /**
   * 查询事件
   * @param {*} eventId
   * @returns
   */
  hasEvent(eventId) {
    _checkID(eventId);
    return this.eventList.filter(({ id }) => eventId === id);
  }
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

/**
 * 检查传入fn是否为函数
 * @param {Function} fn
 */
function _checkID(eventID) {
  const noList = ["[object String]", "[object Number]"];
  if (noList.indexOf(Object.prototype.toString.call(eventID)) === -1) {
    throw new Error("id format error");
  }
}
