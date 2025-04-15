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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const stock_entity_1 = require("./entities/stock.entity");
const twelve_data_service_1 = require("../external/twelve-data.service");
const stocks_repository_1 = require("./stocks.repository");
const class_transformer_1 = require("class-transformer");
const stock_dto_1 = require("./dto/stock.dto");
const lodash_1 = require("lodash");
let StocksService = class StocksService {
    constructor(stockRepo, twelveData) {
        this.stockRepo = stockRepo;
        this.twelveData = twelveData;
    }
    async fetchDashboard() {
        const rows = await this.stockRepo.findGroupedBySymbol();
        const grouped = (0, lodash_1.groupBy)(rows, 'symbol');
        return Object.entries(grouped).map(([symbol, data]) => ({
            symbol,
            history: (0, class_transformer_1.plainToInstance)(stock_dto_1.StockResponseDto, data, {
                excludeExtraneousValues: true,
            }),
        }));
    }
    async fetchAndSave(symbol, interval = '1day', range = '1day') {
        const values = await this.twelveData.fetch(symbol, interval, range);
        const entities = values.map((item) => {
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
        await this.stockRepo.upsertStock(entities);
        return { count: entities.length };
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stocks_repository_1.StocksRepository,
        twelve_data_service_1.TwelveDataService])
], StocksService);
//# sourceMappingURL=stocks.service.js.map