"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StockCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCron = void 0;
const promises_1 = require("timers/promises");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const stocks_service_1 = require("../stocks.service");
const custom_logger_service_1 = require("../../common/logger/custom-logger.service");
const symbols_1 = require("../../constants/symbols");
let StockCron = StockCron_1 = class StockCron {
    constructor(stocksService, logger) {
        this.stocksService = stocksService;
        this.logger = logger;
        this.context = StockCron_1.name;
    }
    async syncHourlyPrice() {
        for (const symbol of symbols_1.STOCK_SYMBOLS) {
            try {
                await this.stocksService.fetchAndSave(symbol, '1day', '1day');
                this.logger.logSuccess(`${this.context}/syncHourlyPrice`, `Updated ${symbol} on ${new Date().toISOString()}`);
                await (0, promises_1.setTimeout)(8000);
            }
            catch (err) {
                this.logger.logError(`${this.context}/syncHourlyPrice`, err instanceof Error ? err.message : String(err));
            }
        }
    }
};
exports.StockCron = StockCron;
__decorate([
    (0, schedule_1.Cron)('0 */3 * * 1-5', { timeZone: 'Asia/Seoul' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StockCron.prototype, "syncHourlyPrice", null);
exports.StockCron = StockCron = StockCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stocks_service_1.StocksService,
        custom_logger_service_1.CustomLogger])
], StockCron);
//# sourceMappingURL=stocks.cron.js.map