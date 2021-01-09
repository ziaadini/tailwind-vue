import { modifierVariants } from "@/utility/css-helper";

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

export const formatHandler = function(
  value,
  { separator = ",", digitLength = 3 } = {}
) {
  if (value) {
    return numberFormat(value, separator, digitLength);
  } else {
    return numberFormat(value, separator, digitLength);
  }
};

export function formatHandlerWrapper(
  modifierType: modifierVariants,
  modelModifiers
) {
  const keys = Object.keys(modelModifiers);
  const findKey = (type: modifierVariants) =>
    keys.findIndex((e) => e.includes(type));
  const retArgs = (str: string) => {
    if (str.split(":").length > 1) {
      const tmp = str.split(":");
      tmp.splice(0, 1);
      return tmp.length === 2 ? tmp : [...tmp, 3];
    }
    return [",", 3];
  };
  const key = findKey(modifierType);
  const args = retArgs(keys[key]);

  return [key !== -1, args];
}
