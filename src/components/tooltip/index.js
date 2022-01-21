/* eslint-disable no-unused-vars */
import template from "./template.vue";
import portal from "../../common/portal";
import { createPopper } from "@popperjs/core";
import { addEvent, addEventBlock } from "../../common/event-control";

const domList = [];
export function tooltipBlock(dom, options) {
  if (hasDom(dom)) return;
  domList.push(dom);
  const { content, position } = options;
  addEventBlock((next) => {
    const vm = portal(template, { props: { _next: next, content } });
    createPopper(dom, vm.$el, {
      placement: position || "right",
    });
  });
}

export function tooltip(dom, options) {
  if (hasDom(dom)) return;
  domList.push(dom);
  const { content, position } = options;
  addEvent(() => {
    const vm = portal(template, { props: { content } });
    createPopper(dom, vm.$el, {
      placement: position || "right",
    });
  });
}
function hasDom(dom) {
  if (domList.length === 0) return false;
  for (let i = 0; i < domList.length; i++) { 
    if (dom.compareDocumentPosition(domList[i]) === 0) { 
      console.log(dom.compareDocumentPosition(domList[i]));
    }
  }
  return false
}
function removeDom(dom) { 
  const index = domList.indexOf(dom)
  if (index !== -1) { 
    domList.splice(index, 1);
  }
}
