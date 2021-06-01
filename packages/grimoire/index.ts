import path from "path";
import * as pug from "pug";

const grimoire = pug.compileFile(path.join(__dirname, "grimoire.pug"));

export default grimoire;
