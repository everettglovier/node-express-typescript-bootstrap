import {Http} from "./Http";

const http = require('http');
export class Movie {
    static async getMovieById( id ) {
        const data: any  = Http.execute({
            host: '192.168.1.241',
            port: '7878',
            path: '/api/v3/movie/lookup?term=snow%20dogs&apikey=6f1b81dac9324394a05f7002d1c08d2f'
        });
        return data;
        //http://192.168.1.241:7878/api/v3/movie/lookup?term=snow%20dogs&apikey=
    }
    static async searchForMovie( search ) {
        const data: any  = Http.execute({
            host: '192.168.1.241',
            port: '7878',
            path: '/api/v3/movie/lookup?term=snow%20dogs&apikey=6f1b81dac9324394a05f7002d1c08d2f'
        });
        return data;
        //http://192.168.1.241:7878/api/v3/movie/lookup?term=snow%20dogs&apikey=
    }
    static async addMovie( movie ) {

    }
}
