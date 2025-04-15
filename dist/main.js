"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.enableCors({
        origin: ['http://localhost:3000', 'https://0biglife.com'],
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map