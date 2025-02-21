import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123123',
    database: process.env.DB_NAME || 'company_social_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.APP_ENV !== 'production',
    logging: true,
};

export default ormConfig;
