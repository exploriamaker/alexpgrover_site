import { cp, rm, readdir } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'web', 'dist');

async function publish() {
  const entries = await readdir(distDir, { withFileTypes: true });

  await rm(path.join(rootDir, 'index.html'), { force: true });
  await rm(path.join(rootDir, 'assets'), { recursive: true, force: true });
  await rm(path.join(rootDir, 'images'), { recursive: true, force: true });

  for (const entry of entries) {
    const sourcePath = path.join(distDir, entry.name);
    const targetPath = path.join(rootDir, entry.name);
    await cp(sourcePath, targetPath, { recursive: true });
  }
}

publish().catch((error) => {
  console.error('Failed to publish build output:', error);
  process.exitCode = 1;
});
