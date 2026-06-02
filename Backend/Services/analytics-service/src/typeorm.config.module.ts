import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const TypeOrmConfig =
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,

      autoLoadEntities: true,
      synchronize: false,

      migrations: [
        'dist/migrations/*.js',
      ],
    }),

    dataSourceFactory: async (
      options,
    ) => {
      if (!options) {
        throw new Error(
          'Database config missing',
        );
      }

      const dataSource =
        new DataSource(options);

      await dataSource.initialize();

      console.log(
        '✅ Database connected successfully',
      );

      return dataSource;
    },
  });