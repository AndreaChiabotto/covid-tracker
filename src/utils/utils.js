import numeral from "numeral";

export const sortData = (data,type="cases",max=10) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => (a[type] > b[type] ? -1 : 1));
  return sortedData.slice(0, max)
};

export const prettyPrintStat = (stat) => {
  if (stat !== undefined) {
    return stat ? `${numeral(stat).format("0,0")}` : "0";
  }
};

