import {Inject, Injectable, Logger} from "@nestjs/common";
import {Pool, QueryResult} from "pg";

@Injectable()
export class DatabaseService {
    private readonly logger= new Logger(DatabaseService.name);

    constructor(@Inject('DATABASE_POOL') private  pool:Pool) {}

    letGiveShot(){
        return this.pool;
    }
    executeQuery(queryText: string, values: any[] = []):Promise<any[]>{
        this.logger.debug(`Executing query: ${queryText} (${values})`);
        return this.pool.query(queryText, values).then((result: QueryResult) => {
            this.logger.debug(`Executed query, result size ${result.rows}`);
            return result.rows;
        });
    }
}