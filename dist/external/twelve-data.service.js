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
exports.TwelveDataService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let TwelveDataService = class TwelveDataService {
    constructor(http) {
        this.http = http;
    }
    async fetch(symbol, interval, range) {
        var _a, _b;
        const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=800&range=${range}&apikey=${process.env.TWELVE_DATA_API_KEY}`;
        const res = await (0, rxjs_1.firstValueFrom)(this.http.get(url));
        if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.status) === 'error') {
            throw new common_1.HttpException(res.data.message || 'TwelveData API Error', 500);
        }
        return ((_b = res.data) === null || _b === void 0 ? void 0 : _b.values) || [];
    }
};
exports.TwelveDataService = TwelveDataService;
exports.TwelveDataService = TwelveDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TwelveDataService);
//# sourceMappingURL=twelve-data.service.js.map