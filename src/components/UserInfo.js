class UserInfo {
  constructor(configUserInfo, userId) {
    this._profileName = document.querySelector(configUserInfo.nameItemSelector);
    this._profileJob = document.querySelector(configUserInfo.jobItemSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name,
      about: this._about,
      _id: this._id
    }

    return userData;

  }

  setUserInfo(userData) {
  if (userData) {
      this._name = userData.name;
      this._about = userData.about;
      this._id = userData._id;
      this._renderUserInfo();
    }

  }

  _renderUserInfo() {
    this._profileName.textContent = this._name;
    this._profileJob.textContent = this._about;
  }

}

export default UserInfo;


