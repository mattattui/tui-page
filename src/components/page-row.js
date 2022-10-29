export default class PageRow extends HTMLElement {
  static observedAttributes = ['block', 'lang'];

  constructor() {
    super();
    this._block = {};
    this.attachShadow({ mode: "open" });
    this.renderChildren();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'lang':
        this.render();
        break;
      case 'block':
        this.renderChildren();
    }
  }

  render() {}

  renderChildren() {
    if (!this._block?.children) {
      return;
    }
    console.log('Rendering children', this._block);
    this.shadowRoot.innerHTML = '';
    this._block.children.forEach(block => {
      const component = document.createElement(block.component);
      component.lang = this.lang;
      component.page = this.page;
      component.block = block;

      Object.keys(block.slots[this.lang]).forEach(slotName => {
        const slotElem = document.createElement('div');
        slotElem.slot = slotName;
        // v-html equivalent - unsafe set html if slot name ends in HTML
        if (slotName.slice(-4) === 'HTML') {
          slotElem.innerHTML = block.slots[this.lang][slotName];
        } else {
          // otherwise safel set text
          slotElem.innerText = block.slots[this.lang][slotName];
        }
        component.appendChild(slotElem);
      });

      this.shadowRoot.appendChild(component);
    });
  }

  set block(value) {
    this._block = value;
    this.renderChildren();
  }
}
