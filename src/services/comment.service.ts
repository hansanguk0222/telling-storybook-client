import axios, { AxiosResponse } from "axios";

export const commentService = {
  createComment: async ({
    boardId,
    commentContent,
    userId,
  }: {
    boardId: number;
    commentContent: string;
    userId: number;
  }) => {
    const getData = await axios.post(
      "http://localhost:8000/comments/write",
      {
        boardId,
        commentContent,
        userId,
      },
      {
        headers: { Authorization: `${localStorage.getItem("accessToken")}` },
      }
    );
    return getData;
  },
  getCommentsByBoardId: async ({ boardId }: { boardId: number }) => {
    const getData = await axios.get(
      `http://localhost:8000/comments/boards/${boardId}`,
      {
        headers: { Authorization: `${localStorage.getItem("accessToken")}` },
      }
    );
    return getData;
  },
};
