import fs from "fs";
import path from "path";
import readline from "readline";
import mongoose from "mongoose";
import { data } from "../../models/Data.js";

async function countFileLines(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  let lineCount = 0;

  for await (const line of rl) {
    lineCount++;
  }

  return lineCount;
}

async function dbConnect(host) {
  mongoose.disconnect();

  await mongoose.connect(
    `mongodb://admin:admin@localhost:27017/${host}?authSource=admin&retryWrites=true&w=majority`
  );
  console.log("Conectando ao banco de dados");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Conectado ao banco de dados ${host}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return;
}

async function main() {
  const HOSTS = ["api_1", "api_2", "api_3", "api_4", "api_5"];
  const PAGE_SIZE = 500;
  const TOTAL_IMPORTS = await countFileLines(path.resolve("data.json"));

  let importedTotal = 0;

  for (let skip = 0; skip < TOTAL_IMPORTS; skip += PAGE_SIZE) {
    console.log("Importando de", skip, "até", skip + PAGE_SIZE);
    await dbConnect(
      HOSTS[Math.floor(importedTotal / PAGE_SIZE) % HOSTS.length]
    );

    let countSeed = 0;

    const fileStream = fs.createReadStream(path.resolve("data.json"));

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      try {
        if (countSeed < skip) {
          console.log("Pulando linha:", countSeed);
          countSeed++;
          continue;
        }

        if (countSeed >= skip + PAGE_SIZE) {
          break;
        }

        const jsonData = JSON.parse(line);
        await data.create(jsonData);
        console.log("Linha importada com sucesso:", countSeed);
        countSeed++;
      } catch (error) {
        countSeed++;
        console.error(`Erro ao importar linha ${countSeed}:`, error);
      }
    }
    importedTotal += PAGE_SIZE;
    console.log(`Importados ${importedTotal} de ${TOTAL_IMPORTS}`);
  }

  return;
}

main()
  .then(() => {
    console.log("Importação concluída");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Erro durante a importação:", e);
    process.exit(1);
  });
