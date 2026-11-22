import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const target=path.join(root,'dist');
fs.mkdirSync(target,{recursive:true});
for(const entry of fs.readdirSync(root,{withFileTypes:true})){
 if(['dist','node_modules','.git','.netlify'].includes(entry.name))continue;
 if(entry.isDirectory() && (entry.name==='assets'||fs.existsSync(path.join(root,entry.name,'index.html'))))fs.cpSync(path.join(root,entry.name),path.join(target,entry.name),{recursive:true});
 else if(entry.isFile() && /\.(html|xml|txt|webmanifest)$/.test(entry.name))fs.copyFileSync(path.join(root,entry.name),path.join(target,entry.name));
}
console.log('Site prêt dans dist/ — pages HTML et ressources publiques uniquement.');
