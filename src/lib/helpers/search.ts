import fuzzysort from "fuzzysort";
import DATA_BN from "./../../../public/shortData_bn.json"; // Preloaded data
import DATA_EN from "./../../../public/shortData_en.json"; // Preloaded data

const obj: string[][] = [];

const generateSampleString = (item: (string | number)[]) =>
  `${item[1]} ${item[2]} ${item[3]}`;

for (let i = 0; i < DATA_BN.length; i++) {
  const banglaQuery = generateSampleString(DATA_BN[i]);
  const englishQuery = generateSampleString(DATA_EN[i]);
  const query = `${banglaQuery} ${englishQuery}`;
  const item = [String(DATA_BN[i][0]), query.toLowerCase()];
  obj.push(item);
}
// const results = fuzzysort.go(query, obj, {
//   keys: ["query", "id"],
//   threshold: -1000000,
//   limit: 50,
// });
export function SearchPerson(query: string) {
  // Properly check if the query is empty
  if (!query.trim()) return [];
  const ids = [];
  for (let i = 0; i < obj.length; i++) {
    if (obj[i][1].includes(query)) ids.push(obj[i][0]);
  }

  return ids;
}
