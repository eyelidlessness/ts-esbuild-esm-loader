import del  from 'del';
import fs   from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), './dist');

if (fs.existsSync(distDir)) {
  del([ distDir ]);
}
