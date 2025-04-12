import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomLogger extends Logger {
  logSuccess(context: string, message: string) {
    this.log(`✅[${context}] ${message}`);
  }

  logInfo(context: string, message: string) {
    this.log(`ℹ️[${context}] ${message}`);
  }

  logProcess(context: string, message: string) {
    this.log(`🔍[${context}] ${message}`);
  }

  logError(context: string, error: Error | string) {
    const msg = error instanceof Error ? error.message : error;
    this.error(`❌[${context}] ${msg}`);
  }
}
