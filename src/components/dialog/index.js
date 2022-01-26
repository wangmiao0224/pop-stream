/* eslint-disable no-unused-vars */
import template from "./template.vue";
import portal from "../../common/portal";
import { event1, destroy } from "../../common/eventManager.js";
export default function dialogBlock(options) {
  const { content, key } = options;
  if (event1.getEventStatus() && key) {
    event1.removeEvent(key);
  }
  return event1.addEventBlock((next) => {
    return portal(template, {
      props: {
        _next: next,
        content,
        closeAll() {
          destroy(event1);
        },
      },
    });
  }, key);
}
