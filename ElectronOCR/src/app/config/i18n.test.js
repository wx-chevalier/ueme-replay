/**
 * Created by apple on 16/6/24.
 */
import i18n from "./i18n";

const i18nInstance = new i18n();

console.dir(i18nInstance.current);

console.dir(new i18n().current);

i18nInstance.configure({lang:"zh"});

console.dir(i18nInstance.current);

console.dir(new i18n().current);

