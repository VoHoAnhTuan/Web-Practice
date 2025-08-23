import {franc} from "franc";
import langs from "langs";

let input = process.argv[2];
let langCode = franc(input);

if (langCode === 'und') {
    console.log("Sorry, give more sample please");
} else {
    let language = langs.where("3", langCode);
    if (language) {
        console.log(language.name);
    } else {
        console.log(`Sorry, we could not find lang code for ${langCode}`);
    }
}

