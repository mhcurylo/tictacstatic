import { createAI } from "./ai-generator";
import { createPvP } from "./pvp-generator";
import { createIndex } from "./index";

const [baseUrl = "http://localhost:9000", directory = "./dist"] =
  process.argv.slice(2);

createIndex(baseUrl, directory);
createAI(baseUrl, directory);
createPvP(baseUrl, directory);
