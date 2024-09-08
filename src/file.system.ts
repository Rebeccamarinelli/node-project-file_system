import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import {DateTime} from "luxon";


export function exploreDirectory(workDir: string, prefix: string =''): void {
   
    const entities = fs.readdirSync(workDir, { withFileTypes: true });
   

    for (const entity of entities) {

            const entityTime = fs.statSync(path.join(workDir, entity.name))
            const inThisTime = DateTime.now()
            const lastModify = DateTime.fromMillis(entityTime.mtimeMs)
            const timeFromModify = inThisTime.diff(lastModify, "minutes" )
            
            const minutesAgo = Math.floor(timeFromModify.minutes);
            let timing = ` (${minutesAgo} minuti fa)`;
        
              if (entity.isDirectory()) {
                console.log(chalk.yellow(`${prefix}|--${entity.name}`));
                const newPrefix =`${prefix}|   `;
                const subDir = path.join(workDir, entity.name);   
                exploreDirectory(subDir, newPrefix);    
              }else {

                if(minutesAgo > 5 && minutesAgo < 30){
                  console.log(chalk.magenta(`${prefix}|--${entity.name + timing}`));
                }
                else if(minutesAgo < 2){
                  console.log(chalk.blueBright(`${prefix}|--${entity.name + timing}`));
                }
                else{
                  console.log(`${prefix}|--${entity.name + timing}`); 
                }
                
              }
    }
}

  
 
export function showDirectories(customDir:string): void {
    const startDir = process.cwd();  
    const fullDir = path.join(startDir, customDir)
    exploreDirectory(fullDir); 
  }
  
