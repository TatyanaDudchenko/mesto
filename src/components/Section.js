class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem(items, userData) {

    const reversedItems = items.reverse();

    reversedItems.forEach((item) => {
      this._renderer(item, userData);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }

}

export default Section;
