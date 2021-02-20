import * as config from '../../config/config.json';

export class DataSupplier {
    private readonly _databaseHost: string;
    private readonly _databaseName: string;
    private readonly _databasePassword: string;
    private readonly _databaseUser: string;
    private readonly _forceDBReset: string|boolean;


    constructor() {
        this._databaseHost = process.env.WEBSITE_DB_HOST ? process.env.WEBSITE_DB_HOST : config.db.host;
        this._databaseName = process.env.WEBSITE_DB_NAME ? process.env.WEBSITE_DB_NAME : config.db.dbName;
        this._databasePassword = process.env.WEBSITE_DB_PASSWORD ? process.env.WEBSITE_DB_PASSWORD : config.db.dbPassword;
        this._databaseUser = process.env.WEBSITE_DB_USER ? process.env.WEBSITE_DB_USER : config.db.dbUser;
        this._forceDBReset = process.env.FORCE_DB_RESET ? process.env.WEBSITE_DB_USER : config.db.forceDBReset;
    }


    get databaseHost(): string {
        return this._databaseHost;
    }

    get databaseName(): string {
        return this._databaseName;
    }

    get databasePassword(): string {
        return this._databasePassword;
    }

    get databaseUser(): string {
        return this._databaseUser;
    }

    get forceDBReset(): boolean {
        return this._forceDBReset as unknown as boolean;
    }
};

