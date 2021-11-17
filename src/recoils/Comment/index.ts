import { atom, selector, selectorFamily } from "recoil";
import { authService } from "@/services";
import { emptyValueChecker } from "@/utils";
import { commentService } from "@/services/";
import { IComment } from "@/types";

export const commentBoardIdAtom = atom<{ boardId: number }>({
  key: "commentBoardIdAtom",
  default: { boardId: 0 },
});

export const commentBoardIdSelector = selector({
  key: "commentBoardIdSelector",
  get: async ({ get }) => {
    const { boardId } = get(commentBoardIdAtom);
    console.log(boardId);
    try {
      if (!emptyValueChecker([boardId]) && boardId !== 0) {
        const { data } = await commentService.getCommentsByBoardId({
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

export const createCommentAtom = atom<{
  boardId: number;
  commentContent: string;
  userId: number;
}>({
  key: "createCommentAtom",
  default: {
    boardId: 0,
    commentContent: "",
    userId: 0,
  },
});

export const createCommentSelector = selector({
  key: "createCommentSelector",
  get: async ({ get }) => {
    const { boardId, userId, commentContent } = get(createCommentAtom);
    try {
      if (
        !emptyValueChecker([boardId, userId, commentContent]) &&
        boardId !== 0 &&
        userId !== 0 &&
        commentContent !== ""
      ) {
        const { data } = await commentService.createComment({
          boardId,
          userId,
          commentContent,
        });
        console.log(data);
        return data;
      }
    } catch (err) {
      return false;
    }
  },
});
