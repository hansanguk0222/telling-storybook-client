import axios, { AxiosResponse } from "axios";

export const reCommentService = {
  createReComment: async ({
    commentId,
    userId,
    reCommentContent,
    boardId,
  }: {
    commentId: number;
    userId: number;
    reCommentContent: string;
    boardId: number;
  }) => {
    const getData = await axios.post("http://localhost:8000/recomments/write", {
      commentId,
      userId,
      reCommentContent,
      boardId,
    });
    return getData;
  },
  getReCommentsByBoardId: async ({ boardId }: { boardId: number }) => {
    const getData = await axios.get(
      `http://localhost:8000/recomments/boards/${boardId}`
    );
    return getData;
  },
};
