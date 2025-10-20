import * as fs from 'node:fs/promises';
import path from 'node:path';

export async function createFolder(folderName) {
    try {
        await fs.mkdir(folderName, { recursive: true });
    } catch (error) {
        console.error("Error creating folder:", error);
    }
}


export async function createFile(pathName,content='') {
    try {
        await fs.writeFile(pathName, content);
    } catch (error) {
        console.error("Error creating file:", error);
    }
}

export async function writeToFile(pathName, content='') {
    try {
        await fs.appendFile(pathName, content);
    } catch (error) {
        console.error("Error writing to file:", error);
    }  
}

export async function deleteFile(pathName) {
    try {
        await fs.unlink(pathName);
    } catch (error) {
        console.error("Error deleting file:", error);
    }
}

export async function deleteFolder(folderName) {
    try {
        await fs.rm(folderName, { recursive: true }); 
    } catch (error) {
        console.error("Error deleting folder:", error);
    }
}

export async function listItems(folderPath='./') {
    try {
        const items = await fs.readdir(folderPath, { withFileTypes: true });
        return items.map(item => ({
            name: item.name,
            type: item.isDirectory() ? 'folder' : 'file',
            path: path.join(import.meta.dirname, item.name)
        }));
    }
    catch (error) {
        console.error("Error listing items:", error);
        return [];
    }
}