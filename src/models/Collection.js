import { getDocs, query } from 'firebase/firestore';

export class Collection {
  constructor(name) {
    this.name = name;
  }

  fetchDocsById = (queryParams) => {
    const q = query(queryParams);
    return getDocs(q);
  };
}
