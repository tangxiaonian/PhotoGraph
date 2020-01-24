export const StorageUtils = {
    get(key,successFun) {
        wx.getStorage({
            key,
            success:successFun
        });
    },
    set(key, value) {
        wx.setStorage({
            key,
            data: value
        });
    },
    remove(key,successFun) {
        wx.removeStorage({
            key,
            success:successFun
        });
    },
    clear() {
        wx.clearStorage();
    }
};