import PopupWithForm from "./PopupWithForm.js";

class PopupWithСonfirm extends PopupWithForm {
  constructor(popupSelector, hanldeFormSubmit) {
    super(popupSelector, hanldeFormSubmit)
  }

  setSubmitHandler(functionDeleteCard) {
    this._submit = functionDeleteCard;
  }

}
export default PopupWithСonfirm;


// import PopupWithForm from "./PopupWithForm.js";

// class PopupWithСonfirm extends PopupWithForm {
//   constructor(popupSelector, hanldeFormSubmit) {
//     super(popupSelector, hanldeFormSubmit)
//   }

//   setSubmitHandler(functionDeleteCard) {
//     this._submit = functionDeleteCard;
//   }

// }
// export default PopupWithСonfirm;
