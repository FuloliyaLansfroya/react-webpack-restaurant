export default {
  wls: {
    /* localStorage 封装 */
    ls: window.localStorage,
    getItem(key) {
      try {
        let key1 = key && this.ls.getItem(key);
        if (key1) {
          return JSON.parse(key1);
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    setItem(key, val) {
      this.ls.setItem(key, JSON.stringify(val));
    },
    clear() {
      this.ls.clear();
    },
    keys() {
      return this.ls.keys();
    },
    removeItem(key) {
      this.ls.removeItem(key);
    },
  },
  wss: {
    /* sessionStorage 封装 */
    ls: window.sessionStorage,
    getItem(key) {
      try {
        let key1 = key && this.ls.getItem(key);
        if (key1) {
          return JSON.parse(key1);
        } else {
          return null;
        }
      } catch (err) {
        return null;
      }
    },
    setItem(key, val) {
      this.ls.setItem(key, JSON.stringify(val));
    },
    clear() {
      this.ls.clear();
    },
    keys() {
      return this.ls.keys();
    },
    removeItem(key) {
      this.ls.removeItem(key);
    },
  },
};
