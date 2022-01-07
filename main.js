(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.baseUrl=e,this.token=n}var n,r;return n=t,(r=[{key:"getInitialCards",value:function(){return fetch("".concat(this.baseUrl,"/cards"),{headers:{authorization:"".concat(this.token)}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r={cardSelector:".card",likeButtonSelector:".card__icon-like",trashButtonSelector:".card__icon-trash",likeButtonActiveClass:"card__icon-like_active",cardImageSelector:".card__image",cardTitleSelector:".card__text"};const o=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._title=t.name,this._image=t.link,this._templateSelector=n,this._handleCardClick=r}var t,o;return t=e,(o=[{key:"_getTemplate",value:function(e){return document.querySelector(this._templateSelector).content.querySelector(e.cardSelector).cloneNode(!0)}},{key:"_setEventListeners",value:function(e){var t=this;this._cardImage=this._item.querySelector(e.cardImageSelector),this._cardImage.addEventListener("click",(function(){t._handleOpenPopup()})),this._likeButton=this._item.querySelector(e.likeButtonSelector),this._likeButton.addEventListener("click",(function(){t._handleLikeButton()})),this._trashButton=this._item.querySelector(e.trashButtonSelector),this._trashButton.addEventListener("click",(function(){t._handleTrashButton()}))}},{key:"_handleOpenPopup",value:function(){this._handleCardClick({name:this._title,link:this._image})}},{key:"_handleLikeButton",value:function(){this._likeButton.classList.toggle(r.likeButtonActiveClass)}},{key:"_handleTrashButton",value:function(){this._item.remove()}},{key:"createCard",value:function(){return this._item=this._getTemplate(r),this._setEventListeners(r),this._cardImage.src=this._image,this._item.querySelector(r.cardTitleSelector).textContent=this._title,this._cardImage.alt=this._title,this._item}}])&&n(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const a=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settingsObject=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._settingsObject.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settingsObject.submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))})),this._formElement.addEventListener("submit",(function(e){e.preventDefault()}))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._settingsObject.inputErrorClass),n.textContent=t,n.classList.add(this._settingsObject.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._settingsObject.inputErrorClass),t.classList.remove(this._settingsObject.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._settingsObject.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._settingsObject.inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const u=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._itemsArray=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItem",value:function(){var e=this;this._itemsArray.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._element=document.querySelector(t),this._closePopupButton=this._element.querySelector(".popup__icon-close"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._element.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._element.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close(e)}},{key:"setEventListeners",value:function(){var e=this;this._closePopupButton.addEventListener("click",(function(t){e.close(t)})),this._element.addEventListener("click",(function(t){t.target.classList.contains("popup_opened")&&e.close(t.target)}))}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(){return h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},h.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function _(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}const b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&d(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imageIsOpened=t._element.querySelector(".popup__image-is-opened"),t._descriptionIsOpened=t._element.querySelector(".popup__description-is-opened"),t}return t=a,(n=[{key:"open",value:function(e){this._imageIsOpened.src=e.link,this._imageIsOpened.alt=e.name,this._descriptionIsOpened.textContent=e.name,h(m(a.prototype),"open",this).call(this)}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}function j(e,t){return j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},j(e,t)}function E(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}const x=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&j(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._element.querySelector(".popup__form"),n._inputs=n._form.querySelectorAll(".popup__input"),n.hanldeFormSubmit=t,n}return t=a,(n=[{key:"_getInputValues",value:function(){var e,t={},n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?w(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){c=!0,i=e},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw i}}}}(this._inputs);try{for(n.s();!(e=n.n()).done;){var r=e.value;t[r.name]=r.value}}catch(e){n.e(e)}finally{n.f()}return t}},{key:"setEventListeners",value:function(){var e=this;S(O(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault();var n=e._getInputValues();e.hanldeFormSubmit(n),e.close(t)}))}},{key:"close",value:function(){S(O(a.prototype),"close",this).call(this),this._form.reset()}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const B=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=document.querySelector(t.nameItemSelector),this._profileJob=document.querySelector(t.jobItemSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,job:this._profileJob.textContent}}},{key:"setUserInfo",value:function(e){this._profileName.textContent=e.name,this._profileJob.textContent=e.job}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();var C={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},L=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_add"),P=document.querySelector(".profile__button-edit"),D=document.querySelector(".profile-container__button-add"),A=L.querySelector(".popup__container"),M=A.querySelector(".popup__input_name"),T=A.querySelector(".popup__input_job"),R=(document.querySelector(".profile__name"),document.querySelector(".profile__job"),q.querySelector(".popup__container"));function H(e){return new o(e,".template-card",U).createCard()}R.querySelector(".popup__input_title"),R.querySelector(".popup__input_link"),new t({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-32",token:"00d03ff0-290d-430c-82a1-6d959f58942a"}).getInitialCards().then((function(e){console.log("ОТВЕТ:",e)})).catch((function(e){console.log("ОШИБКА:",e)}));var N=new u({items:[{name:"Морская звезда",link:"https://images.unsplash.com/photo-1610981263015-ef95481e9ffb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHN0YXJmaXNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},{name:"Рыбы",link:"https://images.unsplash.com/photo-1611833767698-7a8a336761db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fGNvcmFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},{name:"Медуза",link:"https://images.unsplash.com/photo-1549741501-4211de5d3757?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGplbGx5ZmlzaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},{name:"Кораллы",link:"https://images.unsplash.com/photo-1589308945435-38c3f99b3824?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxjb3JhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},{name:"Океан",link:"https://images.unsplash.com/photo-1432889490240-84df33d47091?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fG9jZWFuJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},{name:"Черепаха",link:"https://images.unsplash.com/photo-1580603474920-aa3332b2c40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHR1cnRsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}],renderer:function(e){var t=H(e);N.addItem(t)}},".gallery");N.renderItem();var V=new b(".popup_type_img");V.setEventListeners();var F=new x(".popup_type_add",(function(e){var t=H(e);N.addItem(t)}));F.setEventListeners();var z=new x(".popup_type_edit",(function(e){Z.setUserInfo(e)}));z.setEventListeners();var Z=new B({nameItemSelector:".profile__name",jobItemSelector:".profile__job"});function U(e){V.open(e)}P.addEventListener("click",(function(){var e=Z.getUserInfo(),t=e.name,n=e.job;M.value=t,T.value=n,G.resetValidation(),z.open()})),D.addEventListener("click",(function(){J.resetValidation(),F.open()}));var G=new a(C,L);G.enableValidation();var J=new a(C,q);J.enableValidation()})();