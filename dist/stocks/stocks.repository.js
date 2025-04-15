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
exports.StocksRepository = void 0;
const common_1 = require("@nestjs/common");
const stock_entity_1 = require("./entities/stock.entity");
const typeorm_1 = require("typeorm");
let StocksRepository = class StocksRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(stock_entity_1.Stock, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async findAllStocks() {
        return await this.find({ order: { date: 'DESC' } });
    }
    async findGroupedBySymbol() {
        return await this.dataSource
            .getRepository(stock_entity_1.Stock)
            .createQueryBuilder('stock')
            .select([
            'stock.symbol as symbol',
            `TO_CHAR(stock.date, 'YYYY-MM-DD') as date`,
            'stock.open as open',
            'stock.close as close',
            'stock.high as high',
            'stock.low as low',
        ])
            .orderBy('stock.symbol', 'ASC')
            .addOrderBy('stock.date', 'DESC')
            .getRawMany();
    }
    async findTotalHistoryBySymbol(symbol) {
        return await this.find({ where: { symbol } });
    }
    async upsertStock(entities) {
        return await this.upsert(entities, ['symbol', 'date']);
    }
};
exports.StocksRepository = StocksRepository;
exports.StocksRepository = StocksRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], StocksRepository);
//# sourceMappingURL=stocks.repository.js.map