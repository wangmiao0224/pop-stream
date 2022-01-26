/* eslint-disable no-unused-vars */
import template from "./template.vue";
import portal from "../../common/portal";
import { createPopper } from "@popperjs/core";
import { event1 } from "../../common/eventManager";
export async function tooltipBlock(domID, options) {
  const { content, position, key, closeBack } = options;
  return new Promise(function (resolve, reject) {
    const event = (next) => {
      const dom = document.getElementById(domID);
      if (dom) {
        const vm = portal(template, {
          props: { _next: next, content, position, closeBack },
        });
        createPopper(dom, vm.$el, {
          placement: position || "right",
        });
        resolve(vm);
      } else {
        reject("未找到dom");
      }
    };
    event1.addEventBlock(event, key);
  });
}

export function tooltip(domID, options) {
  const { content, position, key, closeBack } = options;
  if (event1.getEventStatus() && key) {
    event1.removeEvent(key);
  }
  return new Promise((resolve, reject) => {
    const event = () => {
      const dom = document.getElementById(domID);
      if (dom) {
        const vm = portal(template, {
          props: { content, position, closeBack },
        });
        createPopper(dom, vm.$el, {
          placement: position || "right",
        });
        resolve(vm);
      } else {
        reject("未找到dom");
      }
    };
    event1.addEvent(event, key);
  });
}
