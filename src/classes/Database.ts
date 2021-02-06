const Datastore = require('nedb-promises');

export class Database {
    static db: any = {};
    static ready = false;
    static async init() {
        if( !this.ready ) {
            this.db.config = await Datastore.create('./database/config.db');
            this.db.movies = await Datastore.create('./database/movies.db');
            this.db.shows = await Datastore.create('./database/shows.db');
            this.db.users = await Datastore.create('./database/users.db');
            this.ready = true;
        }
        return true;
    }
    static async collection( key ) {
        await this.init();
        return this.db[key];
    }
    static async updateConfig( config ) {
        await this.init();
        return await this.db.config.insert({
            test: 1,
            nested: [{ yup: true }]
        });
    }
}
