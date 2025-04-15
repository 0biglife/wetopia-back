"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const common_1 = require("@nestjs/common");
let CustomLogger = class CustomLogger extends common_1.Logger {
    logSuccess(context, message) {
        this.log(`✅[${context}] ${message}`);
    }
    logInfo(context, message) {
        this.log(`ℹ️[${context}] ${message}`);
    }
    logProcess(context, message) {
        this.log(`🔍[${context}] ${message}`);
    }
    logError(context, error) {
        const msg = error instanceof Error ? error.message : error;
        this.error(`❌[${context}] ${msg}`);
    }
};
exports.CustomLogger = CustomLogger;
exports.CustomLogger = CustomLogger = __decorate([
    (0, common_1.Injectable)()
], CustomLogger);
//# sourceMappingURL=custom-logger.service.js.map