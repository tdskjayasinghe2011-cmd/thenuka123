import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon'};

const server = createServer(async (req,res)=>{
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if(requestPath === '/manus-routes.json') {
    try {
      const manifest = await readFile(join(root,'public','manus-routes.json'));
      res.writeHead(200, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-cache'});
      res.end(manifest);
    } catch {
      res.writeHead(500, {'Content-Type':'application/json; charset=utf-8'});
      res.end(JSON.stringify({routes:[]}));
    }
    return;
  }
  const safePath = normalize(requestPath).replace(/^([.][.][\\/])+/, '');
  const filePath = join(root, safePath === '/' ? 'index.html' : safePath.replace(/^\//,''));
  try {
    const info = await stat(filePath);
    if(!info.isFile()) throw new Error('not a file');
    res.writeHead(200, {'Content-Type':types[extname(filePath)] || 'application/octet-stream','Cache-Control':requestPath.startsWith('/manus-storage/')?'public, max-age=3600':'no-cache'});
    createReadStream(filePath).pipe(res);
  } catch {
    if(requestPath === '/manus-routes.json') { res.writeHead(404,{'Content-Type':'application/json'});res.end(JSON.stringify({routes:[]}));return; }
    try { const html=await readFile(join(root,'index.html'));res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html); }
    catch { res.writeHead(404);res.end('Not found'); }
  }
});
server.listen(port,'0.0.0.0',()=>console.log(`THENUKA SRI LANKA preview listening on 0.0.0.0:${port}`));
