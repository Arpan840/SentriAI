import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const TypeOrmConfig = TypeOrmModule.forRootAsync({
    useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'password',
        database: 'rate_limit',
        autoLoadEntities: true,
        synchronize: false,
        migrations: ['dist/migrations/*.js'],
    }),
    dataSourceFactory: async (options) => {
        const dataSource = new DataSource(
            options || {
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'password',
                database: 'rate_limit',
                synchronize: true,
            },
        );
        await dataSource.initialize();

        console.log('✅ Database connected successfully');

        return dataSource;
    },
});
