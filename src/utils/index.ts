export const BOARD = {
  modules: {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      ["clean"],
    ],
  },

  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ],
};

export const emptyValueChecker = (arr: any) =>
  arr.every((item) => item === "" || item === undefined || item === null);

export const getBoardKeyType = (keyType: string) =>
  keyType === "독후감" ? "reports" : "novels";

export const prettyDate = (date: string) =>
  date
    .split(".")[0]
    .split("T")
    .map((item, idx) => {
      if (idx === 1) {
        const res = item.split(":");
        return `${res[0]}시 ${res[1]}분 ${res[2]}초`;
      }
      return item;
    })
    .join(" ");
