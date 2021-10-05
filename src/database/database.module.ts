import {Logger, Module,  OnApplicationShutdown} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {Pool} from "pg";
import {DatabaseService} from "./database.service";
import {ModuleRef} from "@nestjs/core";

const databasePool =async ()=>{
    return new Pool({
        user:'postgres',
        host:'localhost',
        database:'PutYourDatabaseName',
        port:5432,
    });
};
@Module({
    providers:[
        {
            provide:'DATABASE_POOL',
            inject:[ConfigService],
            useFactory:databasePool,
        },
        DatabaseService,
    ],
    exports:[DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown{
    private readonly logger = new Logger(DatabaseModule.name);

    constructor(private readonly moduleRef: ModuleRef) {}

    onApplicationShutdown(signal?: string): any {
        this.logger.log(`Shutting down on signal ${signal}`);
        const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
        return pool.end();
    }
}