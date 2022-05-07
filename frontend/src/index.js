import "./css/styles.css";
import layoutTemplate from "./hbs/layout.hbs";


import module from "./js/module";


const appEl = document.getElementById("app");
const siteInfo = { title: "Sample WebPack+Handlebars Frontend" };
window.document.title = siteInfo.title;
appEl.innerHTML = layoutTemplate(siteInfo);