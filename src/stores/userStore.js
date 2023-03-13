export class UserStore {
  constructor(RootStore) {
    this.RootStore = RootStore;
  }
}

const createUserStore = () => {
  let authStoreInstance = null;
  if (!authStoreInstance) {
    authStoreInstance = new UserStore();
  }
  return authStoreInstance;
};

export default createUserStore;
