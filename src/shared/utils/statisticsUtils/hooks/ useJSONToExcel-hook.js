import * as xlsx from "xlsx";

export const useJSONToExcel = () => {
  const convertJSONToExcel = (json) => {
    const workSheet = xlsx.utils.json_to_sheet(json);
    const workBook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workBook, workSheet, "Places Data");

    xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    xlsx.writeFile(workBook, "PlaceZ Data.xlsx");
  };

  return { convertJSONToExcel };
};
