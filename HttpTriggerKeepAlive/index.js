module.exports = async function (context, req2) {
    context.log('JavaScript HTTP trigger function processed a request.');

    ////new stuff

    const https = require('https');
    const HttpsAgent = require('agentkeepalive').HttpsAgent;
    
    const keepaliveAgent = new HttpsAgent();
    
    function doIt() {
        const options = {
            keepAlive: true,
            host: '',
            port: 443,
            path: '/oauth2/v1/userinfo',
            headers: { 
                Authorization: `Bearer fake`
            },
            method: 'GET',
            agent: keepaliveAgent,
        };
        
        const req = https.request(options, res => {
            console.log('STATUS------------------------- ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', chunk => {
                //console.log('BODY: ' + chunk);
            });
        });
        
        req.on('error', e => {
            console.log('problem with request: ' + e.message);
        });
        req.end();
        
        setTimeout(() => {
            //console.log('agent status: %j', keepaliveAgent.getCurrentStatus());
        }, 2000);
    }

    for (let i = 1; i <= 300; i++) {
        doIt();
    }
    ///end new stuff



};