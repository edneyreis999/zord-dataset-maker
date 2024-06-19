import * as fs from 'fs';
import * as path from 'path';

// Caminho do diretorio
const dirPath = path.join(__dirname, '..', 'wiki', 'mini-capitulos');

fs.readdirSync(dirPath).forEach((file) => {
  const filePath = path.join(dirPath, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // renomeie os arquivos aqui.
  const newFileName = `resumo-${file}`.replace(' copy', '');
  const newFilePath = path.join(dirPath, newFileName);

  fs.writeFileSync(newFilePath, fileContent);
  fs.unlinkSync(filePath); // remove original file
});
