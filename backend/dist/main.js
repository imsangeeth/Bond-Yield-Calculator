"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const bond_module_1 = require("./bond/bond.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(bond_module_1.BondModule, { logger: ['error', 'warn', 'log'] });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.listen(3000);
}
bootstrap().catch((error) => {
    console.error('Failed to bootstrap application', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map