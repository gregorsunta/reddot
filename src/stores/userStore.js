export class UserStore {
  constructor(RootStore) {
    this.RootStore = RootStore;
  }
}

export default new UserStore();
