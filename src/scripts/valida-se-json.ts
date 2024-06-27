import * as fs from 'fs';
import * as path from 'path';

// Caminho do diretorio
const dirPath = path.join(__dirname, '..', 'wiki', 'fumiga');
let cont = 0;
// Lê todos os arquivos do diretorio e renomeia eles.
fs.readdirSync(dirPath).forEach((file) => {
  const filePath = path.join(dirPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // renomeie os arquivos aqui.
  // const newFileName = `${file}`.replace('resumo-resumo-', '');
  // const newFilePath = path.join(dirPath, newFileName);

  // fs.writeFileSync(newFilePath, fileContent);
  // fs.unlinkSync(filePath); // remove original file
  try {
    JSON.parse(fileContent);
    console.log(cont);
    cont++
  } catch (error) {
    console.error(`Error parsing file ${file}: ${error}`);
  }
});
