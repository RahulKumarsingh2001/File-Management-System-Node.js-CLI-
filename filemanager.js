#! /usr/bin/env node

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';

import { createFolder, createFile, writeToFile, deleteFile, deleteFolder, listItems    } from './operationModule.js';



const rl = readline.createInterface({
    input: input,
    output: output
});


async function menu() {
    console.clear();
    console.log(chalk.blue.bold('\n📁File Manager Menu:\n'));

    const options = [
        'Create Folder',
        'Create File',
        'Write to File',
        'Delete File',
        'Delete Folder',
        'List Items', 
        'Exit'
    ];
    
    options.forEach((opt, index) => {
        console.log(chalk.yellow(`${index+1}`)+chalk.white(`. ${opt}`));
    })

    const answer = await rl.question(chalk.cyan('\nChoose Option: '));
    
    switch(answer.trim()) {
        case '1':
            const folderPath = await rl.question(chalk.cyan('Enter folder path: '));
            await createFolder(folderPath.trim());
            console.log(chalk.green('✅Folder created'));
            break;

        case '2':
            const filePath = await rl.question(chalk.cyan('Enter file path: ')); 
            
            const initialContent = await rl.question(chalk.cyan('Initial Content: '));
            await createFile(filePath.trim(), initialContent);
            console.log(chalk.green('✅File created'));
            break; 

        case '3':
            const appendFilePath = await rl.question(chalk.cyan('Enter file path: '));
            const appendContent = await rl.question(chalk.cyan('Content: '));
            await writeToFile(appendFilePath.trim(), `\n ${appendContent}`);
            console.log(chalk.green('✅Content added'));
            break;    

        case '4':
            const delFilePath = await rl.question(chalk.cyan('Enter file path to delete: '));    
            await deleteFile(delFilePath.trim());
            console.log(chalk.green('✅File deleted'));
            break;

        case '5':
            const delFolderPath = await rl.question(chalk.cyan('Enter folder path to delete: '));    
            await deleteFolder(delFolderPath.trim());
            console.log(chalk.green('✅Folder deleted'));
            break;     

        case '6':
            const listpath = await rl.question(chalk.cyan('Folder path(Enter for current): '));    
            const items = await listItems(listpath.trim() || './');
            console.log(chalk.blue('\nContents:\n'));
            items.forEach(item => {
                const icon = item.type === 'folder' ? '📁' : '📄';
                console.log(`${icon} ${chalk.yellow(item.name)}`);
            });
            break;


        case '7':
            console.log(chalk.blue('👋Exiting File Manager. Goodbye!'));
            rl.close();
            return;
        
        default:
            console.log(chalk.red('❌Invalid option.'));      
    }

    await rl.question(chalk.gray('\nPress Enter to continue...'));
    menu();
}
menu();