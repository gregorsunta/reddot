import { FirebaseDocument } from './FirebaseDocument';

export class Content extends FirebaseDocument {
  constructor(id, authorId, text, upvotes, downvotes) {
    super(id);
    this.authorId = authorId;
    this.text = text;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
  }
}
