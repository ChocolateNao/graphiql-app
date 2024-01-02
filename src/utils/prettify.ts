const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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

function formatBracesAndColons(str: string) {
  let formattedCode = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '{') {
      formattedCode += ` ${str[i]}\n`;
    } else if (str[i] === '}') {
      formattedCode += `\n${str[i]}`;
    } else if (str[i] === ':') {
      formattedCode += `${str[i]} `;
    } else {
      formattedCode += str[i];
    }
  }
  return formattedCode;
}

function formatTextWithCode(str: string) {
  const words = str.split(/[\s\n]+/);
  let result = '';
  for (let i = 0; i < words.length; i += 1) {
    const lastChar = result[result.length - 1];
    const code = formatBracesAndColons(words[i]);
    if (lastChar && alphabet.includes(lastChar) && alphabet.includes(code[0])) {
      if (result === 'query') {
        result += ` ${code}`;
      } else {
        result += `\n${code}`;
      }
    } else if (
      lastChar &&
      '}'.includes(lastChar) &&
      alphabet.includes(code[0])
    ) {
      result += `\n${code}`;
    } else {
      result += code;
    }
  }
  return result;
}

export function formatQuery(query: string) {
  const res = formatTextWithCode(query);
  const lines = res.split('\n');
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
