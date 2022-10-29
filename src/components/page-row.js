import BaseComponent from "../tui-page/base-component";

export default class PageRow extends BaseComponent {
  static observedAttributes = ['block', 'lang'];

  constructor() {
    super();
    this._block = {};
    this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'lang':
      case 'block':
        this.render();
    }
  }

  render() {
    // Reset the content
    this.shadowRoot.innerHTML = '';
    // If this element had any content, we'd render it here
    // Render children
    if (!this._block?.children) {
      return;
    }
    this.renderChildren();
  }

  renderChildren() {
    this._block.children.forEach(block => {
      const component = this.renderBlock(block);
      // Add the block to the row element
      this.shadowRoot.appendChild(component);
    });
  }

  set block(value) {
    this._block = value;
    this.renderChildren();
  }
}
