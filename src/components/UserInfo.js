class UserInfo {
  constructor(configUserInfo) {
    this._profileName = document.querySelector(configUserInfo.nameItemSelector);
    this._profileJob = document.querySelector(configUserInfo.jobItemSelector);
  }

  getUserInfo() {
    const nameInput = this._form.querySelector('.popup__input_name');
    const jobInput = this._form.querySelector('.popup__input_job');
    this._name.textContent = nameInput.value;
    this._job.textContent = jobInput.value;

    const userData = {
      name: nameInput.value,
      job: jobInput.value
    }

    return userData;
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileJob.textContent = userData.job;
  }

}

export default UserInfo;
