import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

const writeToLog = async (msg: string, err?: boolean) => {
  const fileName = err ? 'error.log' : 'info.log';
  const logDir = path.join(process.cwd(), 'logs');
  const logFile = path.join(logDir, fileName);

  await mkdir(logDir, { recursive: true });

  const errorMessage = `[${new Date().toISOString()}] ${msg}\n`;

  await appendFile(logFile, errorMessage);
};

export default writeToLog;
