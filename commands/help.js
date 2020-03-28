function help(msg) {
  msg.reply(`
    !grimoire

    !merci

    !not_cool

    !no

    !roll bonus *val* relance *val* objectif(ou diff) *val* faces *val* joueur *nom_d'un_joueur* 
        *val* est une expression arithmétique qui peut contenir des nombres, des compétences, +, -, *, / et des parenthèses
        ça marche dans n'importe quel ordre et y'a de valeurs par défaut, ex: juste "!roll" c'est un de 20 avec une difficulté de 15

        valeurs par défaut: relance 10, bonus 10, objectif 15, faces 20
    
    pnj:
        !pnj <nom>
        !pnj add <nom> <description> et une image jointe au message
        !pnj remove <nom>
        !pnj list
        
    faut pas oublier de dire stp et merci au bot :)`);
}

module.exports = help;
