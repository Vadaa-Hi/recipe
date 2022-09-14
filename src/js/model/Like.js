export default class Likes {
  constructor() {
    this.likes = [];
  }
  addLike(id, title, publisher, img) {
    const like = {
      id,
      title,
      publisher,
      img,
    };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    // id gdg ID-tei like iig indexiig massive aas haij olno
    const index = this.likes.findIndex((el) => el.id === id);
    // Ug index deerh elementiig massive aas ustgana
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    // if (this.likes.findIndex((el) => el.id === id) !== -1) return false;
    // else return true;
    // deerh bichigleliin tovch helber
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumberOfLikes() {
    return this.likes.length;
  }
}
