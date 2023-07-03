import { Content } from './Content';

export class Post extends Content {
  constructor(id, authorId, title, text, upvotes, downvotes, commentIds) {
    super(id, authorId, text, upvotes, downvotes);
    this.title = title;
    this.commentIds = commentIds;
  }

  //   update = () => {};
  //   batchUpdate = (collection, batch) => {};
}
