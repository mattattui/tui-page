export default class PageTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<h1><slot name="title"></slot></h1>`;
  }
}
