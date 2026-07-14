import fs from "fs";

export default async function globalTeardown(config) {
  const filePath = "data/storageState.json";
  console.log(`globalTeardown: started`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`globalTeardown: storage state deleted`);
  }
  
  console.log(`globalTeardown: completed`);
}
