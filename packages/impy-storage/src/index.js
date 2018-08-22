import wepy from "wepy";

const storageApis = [
  "getStorage",
  "setStorage",
  "removeStorage",
  "clearStorage",
  "getStorageInfo"
];

const storage = storageApis.reduce(
  (finalStorage, api) => ({
    ...finalStorage,
    [api]: args =>
      new Promise((resolve, reject) =>
        wepy[api]({
          ...args,
          success: res => resolve(res),
          fail: err => reject(err)
        })
      )
  }),
  {}
);

const impyStorage = {
  getItem: key => storage.getStorage({ key }).then(res => res.data),
  setItem: (key, data) => storage.setStorage({ key, data }),
  removeItem: key => storage.removeStorage({ key }),
  clear: () => storage.clearStorage(),
  getAllKeys: () => api.getStorageInfo().then(res => res.keys)
};

export default impyStorage;
