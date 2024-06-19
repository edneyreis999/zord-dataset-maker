import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { AxiosResponse } from '../interface/AxiosResponse';

const dirPath = path.join(__dirname, '..', 'wiki', 'mini-capitulos');
const outputDir = path.join(__dirname, '..', 'wiki', 'cenas');

async function criarMiniArcos() {
  try {
    fs.readdirSync(dirPath).forEach(async (file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Adiciona o prompt ao texto
      const prompt = `Instrução: Em ordem cronologica, aponte as cenas desse capitulo de livro. 
      O objetivo é dividir o capitulo em cenas
      Crie um Array de objetos JSON para cada cena com os seguintes campos:
      name: O nome da cena.
      description: o que acontece na cena?
      start: Qual frase no texto marca o inicio da cena?
      end: Qual frase no texto marco o fim da cena?
      {
      "name":"",
      "description":"",
      "start":"",
      "end":""
      }
      Texto:: ${fileContent}`;

      /*
      Curl para testar se o llama está funcionando:
      ``` curl
        curl -X POST http://localhost:11434/api/generate \
        -H "Content-Type: application/json" \
        -d '{
          "model": "llama3:70b",
          "prompt": "porque o céu é azul?",
          "options": {
            "num_predict": 10000,
            "vocab_only": false,
            "temperature": 0.3,
            "penalize_newline": false,
            "num_thread": 12
          }
        }'
      ```
      */
      const startTime = Date.now();

      // Chama a API LLaMA para processar o texto
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama3:70b',
        stream: false,
        prompt,
        "options": {
          "num_predict": 3000,         // Número de tokens a serem gerados
          "vocab_only": false,        // Mantenha como está para permitir todos os tokens
          "temperature": 0.3,         // Reduza para gerar respostas mais previsíveis
          "penalize_newline": false,   // Mantenha como está para penalizar novas linhas
          "num_thread": 12
        }
      });

      const responseTime = Date.now() - startTime;
      console.log(`Resposta recebida em ${responseTime}ms para o arquivo ${file}`);


      const fullResponse = processModelResponse(response);

      // Salva a resposta em um arquivo na pasta /wiki/cenas
      const outputFile = path.join(outputDir, `${file}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(fullResponse, null, 2));

      console.log(`Resposta salva em ${outputFile}`);

      return;
    });
  } catch (error) {
    console.error(`Erro ao chamar a API LLaMA: ${error}`);
  }
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
