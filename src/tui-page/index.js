import BaseComponent from "./base-component";

export default class TuiPage extends BaseComponent {
  // Tell the browser to call attributeChangedCallback when these attributes change
  static observedAttributes = ['lang', 'src'];

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.lang = 'en';
    this.page = { content: [] };
    this.init(this);
  }

  async init() {
    this.page = await fetch(this.src, {
      method: 'GET',
      credentials: 'same-origin',
    }).then(res => res.json());
    this.render();
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
    // Reset the content
    this.shadowRoot.innerHTML = '';

    // Render each block
    this.page.content.forEach(block => {
      const component = this.renderBlock(block);
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
