import Axios from "./axios";

export const boardService = {
  createBoard: async ({
    boardContent,
    boardType,
    boardTitle,
    readingTime,
  }: {
    boardContent: string;
    boardType: string;
    boardTitle: string;
    readingTime: string;
  }) => {
    const getData = await Axios.post(
      "http://localhost:8000/boards/write",
      {
        boardContent,
        boardType,
        boardTitle,
        readingTime,
        userId: localStorage.getItem("userId"),
      },
      {
        headers: { Authorization: `${localStorage.getItem("accessToken")}` },
      }
    );
    return getData;
  },
  getBoardList: async ({ boardType }: { boardType: string }) => {
    const getData = await Axios.get(
      `http://localhost:8000/boards/boardtype/${boardType}`,
      {
        headers: { Authorization: `${localStorage.getItem("accessToken")}` },
      }
    );
    return getData;
  },
  getBoardById: async ({ _id }: { _id: number }) => {
    console.log(_id);
    const getData = await Axios.get(`http://localhost:8000/boards/${_id}`, {
      headers: { Authorization: `${localStorage.getItem("accessToken")}` },
    });
    return getData;
  },
};
