const storage = {
  setValueIntoKey(key, value) {
    localStorage.setItem(key, value);
  },
  getValueFromKey(key) {
    return localStorage.getItem(key);
  },
  setObjectIntoKey(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  },
  getObjectFromKey(key) {
    return JSON.parse(localStorage.getItem(key) || "{}");
  },
  setAccessToken(token) {
    this.setValueIntoKey("token", token);
  },
  setCDNAccessToken(cdnToken) {
    this.setValueIntoKey("cdnToken", cdnToken);
  },
  setRefreshToken(refreshToken) {
    this.setValueIntoKey("refreshToken", refreshToken);
  },
  setIdToken(idToken) {
    this.setValueIntoKey("id_token", idToken);
  },
  getAccessToken() {
    const token = this.getValueFromKey("token");
    if (!token) return null;
    return token;
  },
  getIdToken() {
    const idToken = this.getValueFromKey("id_token");
    if (!idToken) return null;
    return idToken;
  },
  setEmailSigin(email) {
    this.setValueIntoKey("email", email);
  },
  getEmailSigin() {
    return this.getValueFromKey("email");
  },
  getLanguage() {
    return this.getValueFromKey("i18nextLng");
  },
  getRefreshToken() {
    const token = this.getValueFromKey("refreshToken");
    if (!token) return "";
    return token;
  },
  getIdStore(){
    const idStore = this.getValueFromKey('id_store');
    if (!idStore) return "";
    return idStore;
  },
  removeRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) return null;
    localStorage.removeItem("refreshToken");
  },
  removeIdToken() {
    const idToken = this.getIdToken();
    if (!idToken) return null;
    localStorage.removeItem("idToken");
  },
  removeAccessToken() {
    const token = this.getAccessToken();
    if (!token) return null;
    localStorage.removeItem("token");
  },
  removeLanguage() {
    localStorage.removeItem("lang");
  },
  setDraftArticle(value) {
    this.setObjectIntoKey("article", value);
  },
};

export default storage;
