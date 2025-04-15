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
var SeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const stock_entity_1 = require("../stocks/entities/stock.entity");
const twelve_data_service_1 = require("../external/twelve-data.service");
const custom_logger_service_1 = require("../common/logger/custom-logger.service");
const promises_1 = require("timers/promises");
const stocks_repository_1 = require("../stocks/stocks.repository");
let SeederService = SeederService_1 = class SeederService {
    constructor(stockRepo, twelveData, logger) {
        this.stockRepo = stockRepo;
        this.twelveData = twelveData;
        this.logger = logger;
        this.context = SeederService_1.name;
    }
    async seedAllSymbols(symbols) {
        for (const symbol of symbols) {
            const values = await this.twelveData.fetch(symbol, '1day', '1y');
            const stocks = values.map((item) => {
                const s = new stock_entity_1.Stock();
                s.symbol = symbol;
                s.date = new Date(item.datetime);
                s.open = parseFloat(item.open);
                s.close = parseFloat(item.close);
                s.high = parseFloat(item.high);
                s.low = parseFloat(item.low);
                s.volume = parseInt(item.volume);
                return s;
            });
            await this.stockRepo.upsertStock(stocks);
            this.logger.logSuccess(`${this.context}/seedAllSymbols`, `Seeded ${symbol}: ${stocks.length} entries`);
            await (0, promises_1.setTimeout)(8000);
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = SeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stocks_repository_1.StocksRepository,
        twelve_data_service_1.TwelveDataService,
        custom_logger_service_1.CustomLogger])
], SeederService);
//# sourceMappingURL=seeder.service.js.map