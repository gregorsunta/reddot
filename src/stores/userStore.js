export class UserStore {
  constructor(RootStore) {
    this.RootStore = RootStore;
  }
}

const createUserStore = () => {
  let authStoreInstance = null;
  if (!authStoreInstance) {
    return (authStoreInstance = new UserStore());
  }
  throw new Error(`Only one instance of UserStore is allowed`);
};

export default createUserStore;
