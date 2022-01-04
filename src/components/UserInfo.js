class UserInfo {
  constructor(configUserInfo) {
    this._profileName = document.querySelector(configUserInfo.nameItemSelector);
    this._profileJob = document.querySelector(configUserInfo.jobItemSelector);
  }

  getUserInfo() {

    const userData = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    }

    return userData;
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileJob.textContent = userData.job;
  }

}

export default UserInfo;
