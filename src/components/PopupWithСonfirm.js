import PopupWithForm from "./PopupWithForm.js";

class PopupWithСonfirm extends PopupWithForm {
  constructor(popupSelector, hanldeFormSubmit) {
    super(popupSelector, hanldeFormSubmit)
  }

  setSubmitHandler(functionDeleteCard) {
    this.hanldeFormSubmit = functionDeleteCard;
  }

}
export default PopupWithСonfirm;