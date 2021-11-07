import { firebaseClothesStorage } from "@/config";
import axios from "axios";

export const asmrService = {
  uploadAsmrFile: async ({
    asmrData,
    asmrFileName,
  }: {
    asmrData: Blob;
    asmrFileName: string;
  }) => {
    firebaseClothesStorage
      .ref(`storybookAsmr/${asmrFileName}`)
      .put(asmrData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createAsmr: async ({
    userId,
    asmrFileName,
    title,
  }: {
    userId: number;
    asmrFileName: string;
    title: string;
  }) => {
    const getData = await axios.post(
      "http://localhost:8000/asmrs/write",
      {
        userId,
        asmrFileName,
        title,
      },
      {
        headers: { Authorization: `${localStorage.getItem("accessToken")}` },
      }
    );
    return getData;
  },
  getAsmrList: async () => {
    const getData = await axios.get("http://localhost:8000/asmrs", {
      headers: { Authorization: `${localStorage.getItem("accessToken")}` },
    });
    return getData;
  },
  getAsmrByAsmrId: async ({ _id }: { _id: number }) => {
    const getData = await axios.get(`http://localhost:8000/asmrs/${_id}`, {
      headers: { Authorization: `${localStorage.getItem("accessToken")}` },
    });
    return getData;
  },
  getAsmrUrl: async (url: string) => {
    const data = await firebaseClothesStorage
      .ref(`storybookAsmr/${url}`)
      .getDownloadURL()
      .then((res) => res);
    return data;
  },
};
