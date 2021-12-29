class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items; // initialCards
    this._renderer = renderer; // function
    this._container = document.querySelector(containerSelector);
  }

  renderItem() {
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }

}

export default Section;
