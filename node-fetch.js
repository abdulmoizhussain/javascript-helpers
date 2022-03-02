// To use node-fetch in NodeJS.


// EITHER install: npm install --save node-fetch@2
// then import/use node-fetch normally like the following:
// const fetch = require("node-fetch");


// OR use the following way to import node-fetch with the latest version: ^3

(async function () {
  const sample = require("./sample.json");
  const { default: fetch } = await import('node-fetch');

  console.log(sample);

  const respInit = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  console.log(await respInit.json());


})();
