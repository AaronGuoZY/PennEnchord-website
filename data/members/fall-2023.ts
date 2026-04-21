export type Member = {
  name: string;
  part: "Soprano" | "Alto" | "Tenor" | "Bass" | "Beatbox" | "Marketing";
  school: string;
  major: string;
  current?: boolean;
  funFact?: string;
  photo?: string;
};

export const fall2023Members: Member[] = [
  // Soprano
  { name: "Tong Hu", part: "Soprano", school: "UPenn SEAS", major: "CIT/CIS", photo: "" },
  { name: "Ziying Lin", part: "Soprano", school: "UPenn", major: "EALC", photo: "" },
  { name: "Bianca Sheng", part: "Soprano", school: "Temple", major: "Piano Performance", photo: "" },
  { name: "Bella Li", part: "Soprano", school: "UPenn", major: "Scientific Computing", photo: "" },
  { name: "Trice", part: "Soprano", school: "UPenn GSE", major: "LST", photo: "" },
  { name: "Alice Hou", part: "Soprano", school: "CHOP", major: "Research Assistant", photo: "" },
  // Alto
  { name: "Hailing Wang", part: "Alto", school: "UPenn GSE", major: "", photo: "" },
  { name: "Karly", part: "Alto", school: "UPenn", major: "TESOL", photo: "" },
  { name: "Judy Qian", part: "Alto", school: "UPenn GSE", major: "", photo: "" },
  { name: "Yiming Huang", part: "Alto", school: "UPenn", major: "Robotics", photo: "" },
  { name: "Youyou Fu", part: "Alto", school: "UPenn", major: "Landscape Architecture", photo: "" },
  { name: "Yifei Yang", part: "Alto", school: "UPenn", major: "East Asian Languages", photo: "" },
  { name: "Zairui", part: "Alto", school: "UPenn", major: "MCIT", photo: "" },
  { name: "Terina Deng", part: "Alto", school: "UPenn", major: "Cognitive Science", photo: "" },
  // Tenor
  { name: "Greyson", part: "Tenor", school: "UPenn", major: "TESOL", photo: "" },
  { name: "Jonathan Zhang", part: "Tenor", school: "UPenn", major: "Bioengineering", photo: "" },
  { name: "Andy Wang", part: "Tenor", school: "UPenn", major: "MCIT", photo: "" },
  { name: "Aaron Guo", part: "Tenor", school: "UPenn", major: "Bioengineering PhD", funFact: "Winter is my favorite season because the cold nights are warmed by the people we meet.", photo: "" },
  { name: "Harliy Wan", part: "Tenor", school: "UPenn", major: "Biochemistry MS", photo: "" },
  // Bass
  { name: "Shiqiu Liu", part: "Bass", school: "UPenn", major: "Electrical Engineering MS", photo: "" },
  { name: "Chuck Fang", part: "Bass", school: "UPenn", major: "Professor of Finance", photo: "" },
  { name: "Yang Dong", part: "Bass", school: "UPenn", major: "Mathematics", photo: "" },
  // Support
  { name: "Tianci Yang", part: "Beatbox", school: "UPenn", major: "IMPA", photo: "" },
  { name: "Xinyi Zhang", part: "Marketing", school: "UPenn", major: "Systems Engineering", photo: "" },
  { name: "Xinyi Lu", part: "Marketing", school: "UPenn", major: "Health and Societies", photo: "" },
];
