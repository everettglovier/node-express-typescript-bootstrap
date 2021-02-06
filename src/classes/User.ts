import {config} from "../config";
import {Database} from "./Database";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export class User {
    static async hashPassword( password ) {
        return await bcrypt.hash( password, 8);
    }
    static verifyPassword( password, hash ) {
        return new Promise( res => {
            bcrypt.compare( password, hash ).then( isEqual => {
                res( isEqual );
            });
        });
    }
    static async addUser( data: User ) {
        const users = await Database.collection('users');
        const query = await users.find({ username: data.username });
        if( query.length > 0 ) {
            throw TypeError('Username already exists');
        }
        if( data.password ) {
            data.password = await this.hashPassword( data.password );
        }
        const user =  await users.insert( data );
        delete user.password;
        return user;
    }
    static async login( username, password ) {
        const users = await Database.collection('users');
        const query = await users.find({ username });
        if( query.length > 0 && query[0].username === username ) {
            const user = query[0];
            if( await this.verifyPassword( password, user.password ) ) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    username: user.username
                };
                return { token: await this.generateToken( payload ) };
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    static generateToken( payload ) {
        return new Promise( ( res, rej )=> {
            jwt.sign( payload, config.secret, { expiresIn: '1800s' }, ( err, key ) => {
                res( key );
            });
        });
    }
    static verifyToken( token ) {
        return new Promise( ( res, rej )=> {
            jwt.verify(token, config.secret, (err, decoded) => {
                if( err ) {
                    rej( err );
                } else {
                    res(decoded);
                }
            });
        });
    }
}
export interface User {
    username: string,
    name: string,
    _id?: string,
    password?: string
}
