import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid'; // Necesitarás instalar uuid: npm install uuid
import NodeDiskInfo from 'node-disk-info'

async function viewSpace(__action, __path = '') {
    if (__action == 'diskspace') {
      return diskSpace(__path)
    } else if (__action == 'filesize') {
      return await fileSize(__path)
    } else {
      throw new Error('Acción no soportada.')
    }
}    

async function diskSpace (unitPath) {
  try { 
    const disks = await NodeDiskInfo.getDiskInfo();
    console.log(disks)
    const selectedDisk = disks.find(disk => disk.mounted === unitPath); 
    if (selectedDisk) { 
      console.log(`Unidad: ${selectedDisk.mounted}`); 
      console.log(`Espacio total: ${(selectedDisk.blocks / (1024 ** 3)).toFixed(2)} GB`); 
      console.log(`Usado: ${(selectedDisk.used / (1024 ** 3)).toFixed(2)} GB`); 
      console.log(`Disponible: ${(selectedDisk.available / (1024 ** 3)).toFixed(2)} GB`); 
      console.log(`Uso: ${selectedDisk.capacity}`); 
    } else { 
      console.log(`No se encontró la unidad con la ruta: ${unitPath}`); 
    } 
  } catch (error) { 
    console.error(`Error obteniendo información del disco: ${error.message}`); 
  }
}

async function fileSize(path) {  
  const files = await fs.readdir(path);
  const fileObjects = [];

  for (const file of files) {
      const filePath = `${path}\\${file}`;
      const stats = await fs.stat(filePath);
      const sizeInGB = (stats.size / (1024 ** 3)).toFixed(2);
      const sizeInKB = (stats.size / 1024).toFixed(2);          
      const fileObject = {
          uid: uuidv4(),
          name: file, 
          sizeKB: `${sizeInKB}`,
          sizeGB: `${sizeInGB}`
      };
      fileObjects.push(fileObject);
    }
    return fileObjects
}

export default viewSpace;
