/* eslint-disable no-unused-vars */
import template from "./template.vue";
import portal from "../../common/portal";
import { createPopper } from "@popperjs/core";
import { addEvent, addEventBlock } from "../../common/event-control";
export function tooltipBlock(dom, options) {
  const { content, position } = options;
  return addEventBlock((next) => {
    const vm = portal(template, { props: { _next: next, content, position } });
    createPopper(dom, vm.$el, {
      placement: position || "right",
    });
    return vm;
  });
}

export function tooltip(dom, options) {
  const { content, position } = options;
  return addEvent(() => {
    const vm = portal(template, { props: { content, position } });
    createPopper(dom, vm.$el, {
      placement: position || "right",
    });
    return vm;
  });
}
