class UserInfo {
  constructor(configUserInfo, userId) {
    this._profileName = document.querySelector(configUserInfo.nameItemSelector);
    this._profileJob = document.querySelector(configUserInfo.jobItemSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name,
      about: this._about
    }

    return userData;

  }

  setUserInfo(userData) {
  if (userData) {
      this._name = userData.name;
      this._about = userData.about;
      // this._profileName.textContent = this._name;
      // this._profileJob.textContent = this._about;
      this._renderUserInfo();
    }

  }

  _renderUserInfo() {
    this._profileName.textContent = this._name;
    this._profileJob.textContent = this._about;
  }

}

export default UserInfo;




// class UserInfo {
//   constructor(configUserInfo) {
//     this._profileName = document.querySelector(configUserInfo.nameItemSelector);
//     this._profileJob = document.querySelector(configUserInfo.jobItemSelector);
//   }

//   getUserInfo() {

//     const userData = {
//       name: this._profileName.textContent,
//       job: this._profileJob.textContent
//     }

//     return userData;
//   }

//   setUserInfo(userData) {
//     this._profileName.textContent = userData.name;
//     this._profileJob.textContent = userData.job;
//   }

// }


