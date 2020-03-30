function arithmetic(ast, player) {
  console.log(ast);
  if (!ast) throw "Erreur ast vide :)";
  else if (ast.number !== undefined) return ast.number;
  else if (ast.word) {
    const res = player.getStat(ast.word);
    if (res === undefined) throw `Stat inconnue: ${ast.word}`;
    else return res;
  } else if (ast["+"]) {
    const left = arithmetic(ast["+"].left, player);
    const right = arithmetic(ast["+"].right, player);
    return left + right;
  } else if (ast["-"]) {
    const left = arithmetic(ast["-"].left, player);
    const right = arithmetic(ast["-"].right, player);
    return left - right;
  } else if (ast["*"]) {
    const left = arithmetic(ast["*"].left, player);
    const right = arithmetic(ast["*"].right, player);
    return left * right;
  } else if (ast["/"]) {
    const left = arithmetic(ast["/"].left, player);
    const right = arithmetic(ast["/"].right, player);
    return left / right;
  } else throw `ast inconnu: ${JSON.stringify(ast)}`;
}

module.exports = arithmetic;
