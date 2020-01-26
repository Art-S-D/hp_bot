function help(msg) {
    msg.reply(`
    !grimoire

    !merci

    !not_cool

    !roll bonus *val* relance *val* objectif *val* faces *val* joueur *nom_d'un_joueur* 
        *val* est une expression arithmétique qui peut contenir des nombres, des compétences, +, -, *, / et des parenthèses
        ça marche dans n'importe quel ordre et y'a de valeurs par défaut, ex: juste "!roll" c'est un de 20 avec une difficulté de 15

        valeurs par défaut: relance 10, bonus 10, objectif 15, faces 20
        
    faut pas oublier de dire stp et merci au bot :)`);
}

module.exports = help;
