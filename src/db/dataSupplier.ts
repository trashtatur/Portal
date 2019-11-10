var config = require('../dbauth');



/**
 * @name Data Supplier
 * @description Provides credential data to the connector based on the environment it is in
 * @module module-database
 */
export class DataSupplier {
    private readonly _databaseHost: string;
    private readonly _databaseName: string;
    private readonly _databasePassword: string;
    private readonly _databaseUser: string;


    constructor() {
        this._databaseHost = process.env.WEBSITE_DB_HOST ? process.env.WEBSITE_DB_HOST : config.host;
        this._databaseName = process.env.WEBSITE_DB_NAME ? process.env.WEBSITE_DB_NAME : config.dbName;
        this._databasePassword = process.env.WEBSITE_DB_PASSWORD ? process.env.WEBSITE_DB_PASSWORD : config.dbPassword;
        this._databaseUser = process.env.WEBSITE_DB_USER ? process.env.WEBSITE_DB_USER : config.dbUser;
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
};

