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
            if (minutesAgo < 2) {
                timing = chalk.blueBright(timing); 
              }

              let entityName: string;

              if (entity.isDirectory()) {
                
                entityName = chalk.yellowBright(entity.name);
                console.log(`${prefix}|--${entityName}`);
                const newPrefix =`${prefix}|   `;
                const subDir = path.join(workDir, entity.name);   
                exploreDirectory(subDir, newPrefix);    
              } else {

                entityName = minutesAgo < 2 ? chalk.blueBright(entity.name + timing) : entity.name + timing;
                console.log(`${prefix}|--${entityName}`);
              }

    }
}

  
 
export function showDirectories(customDir:string): void {
    const startDir = process.cwd();  
    const fullDir = path.join(startDir, customDir)
    exploreDirectory(fullDir); 
  }
  
