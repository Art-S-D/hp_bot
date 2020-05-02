function help(msg) {
  msg.reply(`
    !grimoire

    !merci

    !not_cool

    !no

    !roll bonus *val* relance *val* objectif(ou diff) *val* faces *val*
        *val* est une expression arithmétique qui peut contenir des nombres, des
        compétences, +, -, *, / et des parenthèses
        ça marche dans n'importe quel ordre et y'a de valeurs par défaut,
        ex: juste "!roll" c'est un de 20 avec une difficulté de 15

        valeurs par défaut: relance 10, bonus 10, objectif 15, faces 20

    pnj:
        !pnj <nom>
        !pnj add <nom> <description> *et une image jointe au message*
        !pnj remove <nom>
        !pnj list
        !pnj update <nom> set name <nom>*ou* year <nombre>*ou* description <description>
            *et une image jointe au message si besoin*
            *mettre la description à la fin sinon ça bug :)*

    cartes:
        !carte x<nombre> random pour tirer une carte aléatoire et l'ajouter à sa collection
        !carte x<nombre> nom <nom de carte> pour ajouter la carte en question à sa collection
        !carte x<nombre> categorie <catégorie> pour ajouter une carte commune / rare / légendaire
            à sa collection
        !carte supprime <nom de carte> pour enlever la carte en question de sa collection
        !carte collection pour lister sa collection

    !inventory
        affiche votre inventaire dans votre channel privé

    faut pas oublier de dire stp et merci au bot :)`);
}

module.exports = help;
