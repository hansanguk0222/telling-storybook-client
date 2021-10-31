export interface IBoard {
  _id: number;
  boardType: string;
  boardContent: string;
  boardTitle: string;
  readingTime?: number;
  boardViews: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface IComment {
  _id: number;
  commentContent: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  boardId: number;
}

export interface IReComment {
  _id: number;
  reCommentContent: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  commentId: number;
  boardId: number;
}
