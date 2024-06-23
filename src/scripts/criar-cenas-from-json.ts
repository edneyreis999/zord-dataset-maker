import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { AxiosResponse } from '../interface/axiosResponse';
import { Cenas, Cena } from '../interface/preformatCenas';

const dirPathPreFormated = path.join(__dirname, '..', 'wiki', 'cenas');
const dirPathChapters = path.join(__dirname, '..', 'wiki', 'chapters');
const outputDir = path.join(__dirname, '..', 'wiki', 'fumiga');

async function criarMiniArcos() {
  try {
    const fileContentTexto: string[] = [];
    // Extract Txt from chapter files
    fs.readdirSync(dirPathChapters).forEach(async (file, index) => {
      const filePath = path.join(dirPathChapters, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      fileContentTexto.push(fileContent)
    })

    let totalScenes = 0;
    fs.readdirSync(dirPathPreFormated).forEach((file, index) => {
      const filePath = path.join(dirPathPreFormated, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const jsonData: Cenas = JSON.parse(fileContent);
      totalScenes += Object.keys(jsonData).length;
    })

    let processedScenes = 0;

    const files = fs.readdirSync(dirPathPreFormated);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(dirPathPreFormated, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const jsonData: Cenas = JSON.parse(fileContent);
      let sceneCount = 0;
      for (const element of jsonData) {
        const preFormatedScene: Cena = element
        const startTime = Date.now();
        const prompt = formatPromptToModel(preFormatedScene, fileContentTexto[i])
        console.log(`Progresso: ${(processedScenes / totalScenes) * 100}%`);
        console.log(`start running ollama for scene '${preFormatedScene.description}'`)
        // Chama a API LLaMA para processar o texto
        const response = await axios.post('http://localhost:11434/api/generate', {
          model: 'llama3:70b',
          stream: false,
          prompt,
          "options": {
            "num_predict": 1000,         // Número de tokens a serem gerados
            "vocab_only": false,        // Mantenha como está para permitir todos os tokens
            "temperature": 0.3,         // Reduza para gerar respostas mais previsíveis
            "penalize_newline": false,   // Mantenha como está para penalizar novas linhas
            "num_thread": 12
          }
        });

        const responseTime = Date.now() - startTime;
        console.log(`Resposta recebida em ${responseTime}ms para o arquivo ${file}`);

        const fullResponse = processModelResponse(response);

        // troca espaços por _ para evitar problemas com o nome do arquivo
        const fileName = `${file.replace('.json', '')}-${sceneCount}-${preFormatedScene.name.replace(/ /g, '_')}.json`;

        // Salva a resposta em um arquivo na pasta /wiki/cenas
        const outputFile = path.join(outputDir, `${fileName}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(fullResponse, null, 2));

        console.log(`Resposta salva em ${outputFile}`);

        processedScenes++;
        sceneCount++;
        console.log(`Progresso: ${(processedScenes / totalScenes) * 100}%`);
      }
    }
  } catch (error) {
    console.error(`Erro ao chamar a API LLaMA: ${error}`);
  }
}


function formatPromptToModel(preFormatedScene: Cena, sceneText: string) {
  // Adiciona o prompt ao texto
  const prompt = `Por favor, extraia a cena do texto que começa com: ’${preFormatedScene.start}’ 
  até o final da parte que termina com: ’${preFormatedScene.end}’ .
  O resultado final deve um JSON seguindo este formato:
        {
        "name":${preFormatedScene.name},
        "description":${preFormatedScene.description},
        "scene":""
        }
        Texto:: ${sceneText}`;

  return prompt;
}

/**
 * 
 */
function processModelResponse(response: any) {
  // Processa a resposta da API LLaMA
  const parsedResponse = new AxiosResponse(response)
  console.log(parsedResponse.data.response)

  return parsedResponse.data.response
}

criarMiniArcos();
