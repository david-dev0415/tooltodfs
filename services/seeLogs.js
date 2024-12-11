import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid'

async function lookLogs() {
    const path = '\\\\Svr01\\c\\Optocontrol\\DFS\\DB';
    try {
        const files = await fs.readdir(path);
        const fileObjects = [];

        for (const file of files) {
          const filePath = `${path}\\${file}`
          const stats = await fs.stat(filePath)
          const sizeInGB = (stats.size / (1024 ** 3)).toFixed(2);
          const sizeInKB = (stats.size / 1024).toFixed(2);
          const fileObject = {
            uid: uuidv4(),
            name: file, 
            sizeKB: `${sizeInKB}`,
            sizeGB: `${sizeInGB}`
          }
          fileObjects.push(fileObject)
          // if (file.includes('mdf')) {
          //   console.log(`Archivo: ${file}, Tamaño: ${sizeInGB} GB` )
          // } else {
          //   console.log(`Archivo: ${file}, Tamaño: ${sizeInKB} KB` )
          // }
          return fileObjects
        }
    } catch (err) {
        console.error(err);
    }
}

export default lookLogs;
