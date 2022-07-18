import * as xlsx from "xlsx";

export const useJSONToExcel = () => {
  const convertJSONToExcel = (json) => {
    const workSheet = xlsx.utils.json_to_sheet(json);
    const workBook = xlsx.utils.book_new();
    //append sheet to the workbook
    xlsx.utils.book_append_sheet(workBook, workSheet, "Places Data");
    //generate buffer to help with large amounts of data
    xlsx.write(workBook, { bookType: "xlsx", type: "buffer" });
    xlsx.writeFile(workBook, "PlaceZ Data.xlsx");
  };

  return { convertJSONToExcel };
};
