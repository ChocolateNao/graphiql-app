export function isCodeValid(code: string) {
  let balance = 0;
  for (let i = 0; i < code.length; i += 1) {
    if (code[i] === '{') {
      balance += 1;
    } else if (code[i] === '}') {
      balance -= 1;
    }
    if (balance < 0) {
      return false;
    }
  }
  return balance === 0;
}

export function formatCode(userInput: string) {
  let indentLevel = 0;
  let formattedCode = '';
  for (let i = 0; i < userInput.length; i += 1) {
    if (userInput[i] === '{') {
      formattedCode += ` ${userInput[i]}\n`;
      indentLevel += 1;
      formattedCode += '  '.repeat(Math.max(0, indentLevel));
    } else if (userInput[i] === '}') {
      indentLevel -= 1;
      formattedCode += `\n${'  '.repeat(Math.max(0, indentLevel))}${
        userInput[i]
      }`;
    } else if (
      userInput[i - 1] &&
      userInput[i] !== ' ' &&
      userInput[i] !== '\n' &&
      userInput[i - 1] === '}'
    ) {
      formattedCode += `\n${userInput[i]}`;
    } else {
      formattedCode += userInput[i];
    }
  }
  return formattedCode;
}

export function formatWords(str: string) {
  const words = str.split(/[\s\n]+/);
  let result = '';
  for (let i = 0; i < words.length; i += 1) {
    const lastChar = result[result.length - 1];
    const code = formatCode(words[i]);
    if (
      lastChar &&
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.includes(
        lastChar
      ) &&
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.includes(code[0])
    ) {
      result += `\n${code}`;
    } else {
      result += code;
    }
  }
  return result;
}

export function formatQuery(query: string) {
  const lines = query.split('\n');
  let formattedQuery = '';
  let indentLevel = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line[line.length - 1] === '}') {
      indentLevel -= 1;
    }
    formattedQuery += `${'  '.repeat(indentLevel) + line}\n`;
    if (line[line.length - 1] === '{') {
      indentLevel += 1;
    }
  }
  return formattedQuery;
}
