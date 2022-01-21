/* eslint-disable no-unused-vars */
import template from "./template.vue";
import portal from "../../common/portal";
import { addEventBlock } from "../../common/event-control";

export default function dialogBlock(options) {
  const { content } = options;
  addEventBlock((next) => {
    portal(template, { props: { _next: next, content } });
  });
}
