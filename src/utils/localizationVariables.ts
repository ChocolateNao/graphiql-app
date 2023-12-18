const extractVariableNames = (str: string) => {
  const regex = /%([^%]+)%/g;
  const matches = [];
  let match;

  do {
    match = regex.exec(str);
    if (match) {
      matches.push(match[1]);
    }
  } while (match !== null);

  return matches;
};

const processVariables = (
  str: string,
  variables?: Record<string, string | null>
): string => {
  if (!variables) return str;

  const variableNamesFromStr = extractVariableNames(str);
  let strWithVars = str;
  Object.keys(variables).forEach((variableKey) => {
    if (variableNamesFromStr.includes(variableKey)) {
      strWithVars = strWithVars.replace(
        new RegExp(`%${variableKey}%`, 'g'),
        variables[variableKey] as string
      );
    } else {
      console.error(
        `Insufficient variable key(s)!\nExpected "${variableNamesFromStr}", but got "${Object.keys(
          variables
        )}"\n`
      );
    }
  });
  return strWithVars;
};

export default processVariables;
