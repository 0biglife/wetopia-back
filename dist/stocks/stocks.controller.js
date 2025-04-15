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
exports.StocksController = void 0;
const common_1 = require("@nestjs/common");
const stocks_service_1 = require("./stocks.service");
const custom_logger_service_1 = require("../common/logger/custom-logger.service");
let StocksController = class StocksController {
    constructor(stockService, logger) {
        this.stockService = stockService;
        this.logger = logger;
    }
    async fetchDashboard() {
        return await this.stockService.fetchDashboard();
    }
};
exports.StocksController = StocksController;
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "fetchDashboard", null);
exports.StocksController = StocksController = __decorate([
    (0, common_1.Controller)('stock'),
    __metadata("design:paramtypes", [stocks_service_1.StocksService,
        custom_logger_service_1.CustomLogger])
], StocksController);
//# sourceMappingURL=stocks.controller.js.map