const numberFormat = (number, separator = ",", digitLength = 3) => {
  if (number === undefined) {
    return "";
  }
  let num = number.toString();
  num = num.replace(/[^\d]/g, "");

  if (num.length > digitLength) {
    const expresion = "\\B(?=(?:\\d{" + digitLength + "})+(?!\\d))";
    num = num.replace(new RegExp(expresion, "g"), separator);
  }

  return num;
};

export const formatHandler = function(value, { separator = ",", digitLength = 3 } = {}) {
  if (value) {
    return numberFormat(value, separator, digitLength);
  } else {
    return numberFormat(value, separator, digitLength);
  }
};
