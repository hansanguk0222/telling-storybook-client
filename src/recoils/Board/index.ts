import { atom, selector, selectorFamily } from "recoil";
import { authService } from "@/services";
import { emptyValueChecker } from "@/utils";
import { boardService } from "@/services/board.service";
import { IBoard } from "@/types";

export const createBoardAtom1 = atom({
  key: "createBoard",
  default: { boardContent: "", boardType: "", boardTitle: "", readingTime: "" },
});

export const createBoardSelector2 = selector({
  key: "createBoardSelector",
  get: ({ get }) => {
    console.log("hi");
    // try {
    //   const { boardContent, boardType, boardTitle, readingTime } =
    //     get(createBoardAtom);
    //   if (
    //     !emptyValueChecker([boardContent, boardType, boardTitle, readingTime])
    //   ) {
    //     const { data } = await boardService.createBoard({
    //       boardContent,
    //       boardType,
    //       boardTitle,
    //       readingTime,
    //     });
    //     console.log(data);
    //     return data;
    //   }
    // } catch (err) {
    //   alert("에러가 발생했습니다.");
    //   return false;
    // }
  },
});

export const createBoardAtom = atom({
  key: "createBoardAtom",
  default: { boardContent: "", boardType: "", boardTitle: "", readingTime: "" },
});

export const createBoardSelector = selector({
  key: "createBoardSelector",
  get: ({ get }) => {
    const temp = get(createBoardAtom);
    // try {
    //   const { boardContent, boardType, boardTitle, readingTime } =
    //     get(createBoardAtom);
    //   if (
    //     !emptyValueChecker([boardContent, boardType, boardTitle, readingTime])
    //   ) {
    //     const { data } = await boardService.createBoard({
    //       boardContent,
    //       boardType,
    //       boardTitle,
    //       readingTime,
    //     });
    //     console.log(data);
    //     return data;
    //   }
    // } catch (err) {
    //   alert("에러가 발생했습니다.");
    //   return false;
    // }
    console.log(temp);
  },
});

export const fontSizeState = atom({
  key: "fontSizeState",
  default: 14,
});

export const fontSizeLabelState = selector({
  key: "fontSizeLabelState",
  get: async ({ get }) => {
    const fontSize = get(fontSizeState);
    const unit = "px";
    try {
      const { boardContent, boardType, boardTitle, readingTime } =
        get(createBoardAtom);
      if (
        !emptyValueChecker([boardContent, boardType, boardTitle, readingTime])
      ) {
        const { data } = await boardService.createBoard({
          boardContent,
          boardType,
          boardTitle,
          readingTime,
        });
        window.location.href = "http://localhost:3000/novel";
        return data;
      }
    } catch (err) {
      alert("에러가 발생했습니다.");
      return false;
    }
    return `${fontSize}${unit}`;
  },
});

export const boardListTypeAtom = atom<{ boardType: string }>({
  key: "boardListState",
  default: { boardType: "" },
});

export const boardListAtom = atom<{ boardList: IBoard[] }>({
  key: "boardListAtom",
  default: { boardList: [] },
});

export const boradListSelector = selector({
  key: "boardListItemSelector",
  get: async ({ get }) => {
    const { boardType } = get(boardListTypeAtom);
    try {
      if (!emptyValueChecker([boardType])) {
        const { data } = await boardService.getBoardList({ boardType });
        return data;
      }
    } catch (err) {
      alert("에러가 발생하였습니다.");
      return false;
    }
  },
});

export const boardIdAtom = atom<{ _id: number }>({
  key: "boardId",
  default: { _id: 0 },
});

export const boardIdSelector = selector({
  key: "boardIdSelector",
  get: async ({ get }) => {
    const { _id } = get(boardIdAtom);
    try {
      if (!emptyValueChecker([_id]) && _id !== 0) {
        const { data } = await boardService.getBoardById({ _id });
        console.log(data);
        return data;
      }
    } catch (err) {
      return false;
    }
  },
});
