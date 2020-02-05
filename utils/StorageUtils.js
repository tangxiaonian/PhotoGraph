export const StorageUtils = {
    get(key) {
        return wx.getStorageSync(key);
    },
    set(key, value) {
        wx.setStorageSync(key, value);
    },
    remove(key) {
        wx.removeStorageSync(key);
    },
    clear() {
        wx.clearStorageSync();
    }
};