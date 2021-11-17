import { atom, selector, selectorFamily } from "recoil";
import { authService } from "@/services";
import { emptyValueChecker } from "@/utils";
import { reCommentService } from "@/services/";
import { IComment } from "@/types";

export const reCommentBoardIdAtom = atom<{ boardId: number }>({
  key: "reCommentBoardIdAtom",
  default: { boardId: 0 },
});

export const reCommentBoardIdSelector = selector({
  key: "reCommentBoardIdSelector",
  get: async ({ get }) => {
    const { boardId } = get(reCommentBoardIdAtom);
    console.log(boardId);
    try {
      if (!emptyValueChecker([boardId]) && boardId !== 0) {
        const { data } = await reCommentService.getReCommentsByBoardId({
          boardId,
        });
        console.log(data);
        return data;
      }
    } catch (err) {
      return false;
    }
  },
});

export const createReCommentAtom = atom<{
  boardId: number;
  reCommentContent: string;
  userId: number;
  commentId: number;
}>({
  key: "createReCommentAtom",
  default: {
    boardId: 0,
    reCommentContent: "",
    userId: 0,
    commentId: 0,
  },
});

export const createReCommentSelector = selector({
  key: "createReCommentSelector",
  get: async ({ get }) => {
    const { boardId, userId, reCommentContent, commentId } =
      get(createReCommentAtom);
    try {
      if (
        !emptyValueChecker([boardId, userId, reCommentContent, commentId]) &&
        boardId !== 0 &&
        reCommentContent !== "" &&
        userId !== 0 &&
        commentId !== 0
      ) {
        const { data } = await reCommentService.createReComment({
          boardId,
          userId,
          reCommentContent,
          commentId,
        });
        console.log(data);
        return data;
      }
    } catch (err) {
      return false;
    }
  },
});
