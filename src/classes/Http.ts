const http = require('http');
export class Http {
    static execute(params, postData? ) {
        return new Promise(function(resolve, reject) {
            const req = http.request(params, function(res) {
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
                let body: any = [];
                res.on('data', function(chunk) {
                    body.push(chunk);
                });
                res.on('end', function() {
                    try {
                        body = JSON.parse(Buffer.concat(body).toString());
                    } catch(e) {
                        reject(e);
                    }
                    resolve(body);
                });
            });
            req.on('error', function( err ) {
                reject( err );
            });
            if ( postData ) {
                req.write(postData);
            }
            req.end();
        });
    }
}
