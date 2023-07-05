class PageStore {
  homePage = null;
  updateHomePage = (newData) => {
    this.homePage = newData;
  };
}

const pageStore = new PageStore();
export { pageStore as siteStore };
