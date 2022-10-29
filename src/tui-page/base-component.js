export default class BaseComponent extends HTMLElement {
  constructor() {
    super();
  }

  renderBlock(block) {
    // Create the block element & set some props
    const component = document.createElement(block.component);
    component.lang = this.lang;
    component.page = this.page;
    component.block = block;

    // Render each slot for the given language
    Object.keys(block.slots[this.lang]).forEach((slotName) => {
      const slotElem = document.createElement("div");
      slotElem.slot = slotName;
      // v-html equivalent - unsafely set html if slot name ends in HTML
      if (slotName.slice(-4) === "HTML") {
        slotElem.innerHTML = block.slots[this.lang][slotName];
      } else {
        // otherwise safely set text content
        slotElem.innerText = block.slots[this.lang][slotName];
      }

      // Add the slot to the block element
      component.appendChild(slotElem);
    });

    return component;
  }
}
