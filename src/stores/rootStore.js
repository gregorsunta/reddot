import createAuthStore from './authStore';
import createUserStore from './userStore';

class RootStore {
  constructor(app) {
    this.authStore = createAuthStore(app);
    this.userStore = createUserStore();
  }
}

const createRootStore = (app) => {
  let rootStoreInstance = null;
  if (!rootStoreInstance) {
    return (rootStoreInstance = new RootStore(app));
  }
  throw new Error(`Only one instance of RootStore is allowed`);
};

export default createRootStore;
