import { atom, selector, selectorFamily } from "recoil";
import { asmrService } from "@/services";
import { emptyValueChecker } from "@/utils";
import { reCommentService } from "@/services/";
import { IAsmr, IComment } from "@/types";
import { v4 } from "uuid";

export const createAsmrAtom = atom<{
  userId: number;
  title: string;
  asmrData: File;
}>({
  key: "createAsmrAtom",
  default: { userId: 0, title: "", asmrData: null },
});

export const createAsmrSelector = selector({
  key: "createAsmrSelector",
  get: async ({ get }) => {
    const { userId, asmrData, title } = get(createAsmrAtom);
    try {
      if (!emptyValueChecker([userId, asmrData, title]) && userId !== 0) {
        const asmrFileName = v4();
        await asmrService.uploadAsmrFile({
          asmrData,
          asmrFileName,
        });
        const { data } = await asmrService.createAsmr({
          asmrFileName,
          title,
          userId,
        });
        return { data };
      }
    } catch (err) {
      return false;
    }
  },
});

export const asmrListAtom = atom<{ asmrList: IAsmr[] }>({
  key: "asmrListAtom",
  default: { asmrList: [] },
});

export const asmrListSelector = selector({
  key: "asmrListSelector",
  get: async ({ get }) => {
    try {
      const { data } = await asmrService.getAsmrList();
      return data;
    } catch (err) {
      alert("에러가 발생하였습니다.");
      return false;
    }
  },
});

export const asmrIdAtom = atom<{ _id: number }>({
  key: "asmrIdAtom",
  default: { _id: 0 },
});

export const asmrIdSelector = selector({
  key: "asmrIdSelector",
  get: async ({ get }) => {
    const { _id } = get(asmrIdAtom);
    try {
      if (!emptyValueChecker([_id]) && _id !== 0) {
        const { data } = await asmrService.getAsmrByAsmrId({ _id });
        return data;
      }
    } catch (err) {
      return false;
    }
  },
});

export const asmrUrlAtom = atom<{ url: string }>({
  key: "asmrUrlAtom",
  default: { url: "" },
});

export const asmrUrlSelector = selector({
  key: "asmrUrlSelector",
  get: async ({ get }) => {
    const { url } = get(asmrUrlAtom);
    try {
      if (!emptyValueChecker([url]) && url !== "") {
        const data = await asmrService.getAsmrUrl(url);
        return data;
      }
    } catch (err) {
      return false;
    }
  },
});
