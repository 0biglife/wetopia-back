"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const seeder_service_1 = require("./seeder.service");
const typeorm_1 = require("@nestjs/typeorm");
const stock_entity_1 = require("../stocks/entities/stock.entity");
const twelve_data_service_1 = require("../external/twelve-data.service");
const axios_1 = require("@nestjs/axios");
const logger_module_1 = require("../common/logger/logger.module");
const stocks_module_1 = require("../stocks/stocks.module");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([stock_entity_1.Stock]),
            axios_1.HttpModule,
            logger_module_1.LoggerModule,
            stocks_module_1.StocksModule,
        ],
        providers: [seeder_service_1.SeederService, twelve_data_service_1.TwelveDataService],
        exports: [seeder_service_1.SeederService],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map