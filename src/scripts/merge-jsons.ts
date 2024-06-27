import * as fs from 'fs';
import * as path from 'path';

const dirPath = path.join(__dirname, '..', 'wiki', 'fumiga');

// // Cria um novo arquivo json
// fs.writeFileSync(
//   path.join(dirPath, 'merged-data.json'),
//   '{ "ghork-e-a-prova-de-fogo": [' + fs.readdirSync(dirPath)
//     .filter((file) => file.endsWith('.json')) // apenas arquivos JSON
//     .map((file) => {
//       const fileContent = fs.readFileSync(path.join(dirPath, file), 'utf8');

//       console.log(fileContent);

//       return JSON.parse(fileContent);
//     })
//     .reduce((accumulator, currentValue, index) => `${accumulator}${(index > 0 ? ', ' : '')}"${currentValue}"`, '') +
//   '] }'
// );

// Cria um novo arquivo json
const mergedData = {
  "ghork-e-a-prova-de-fogo": fs.readdirSync(dirPath)
    .filter((file) => file.endsWith('.json')) // apenas arquivos JSON
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(dirPath, file), 'utf8');

      return JSON.parse(fileContent);
    })
};
fs.writeFileSync(path.join(dirPath, 'merged-data.json'), JSON.stringify(mergedData));
