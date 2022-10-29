export default class TuiPage extends HTMLElement {
  // Tell the browser to call attributeChangedCallback when these attributes change
  static observedAttributes = ['lang', 'src'];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.page = { content: [] };
    this.init(this);
  }

  init() {
    fetch(this.src, {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(res => res.json())
      .then(page => {
        this.page = page;
        this.render();
      })
  }

  // Response to an attribute change
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'lang':
        this.render();
        break;
      case 'src':
        this.init();
    }
  }

  render() {
    this.shadowRoot.innerHTML = '';
    this.page.content.forEach(block => {
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

  // Link attributes to properties. Note that HTMLElement already handles "lang"
  get src() {
    return this.getAttribute('src');
  }
  set src(val) {
    this.setAttribute('src', val);
  }
}
