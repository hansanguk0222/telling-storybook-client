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
