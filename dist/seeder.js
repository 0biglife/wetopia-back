"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const seeder_service_1 = require("./seeder/seeder.service");
const symbols_1 = require("./constants/symbols");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seeder = app.get(seeder_service_1.SeederService);
    await seeder.seedAllSymbols(symbols_1.STOCK_SYMBOLS);
    await app.close();
}
bootstrap();
//# sourceMappingURL=seeder.js.map