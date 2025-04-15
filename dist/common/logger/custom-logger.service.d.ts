import { Logger } from '@nestjs/common';
export declare class CustomLogger extends Logger {
    logSuccess(context: string, message: string): void;
    logInfo(context: string, message: string): void;
    logProcess(context: string, message: string): void;
    logError(context: string, error: Error | string): void;
}
