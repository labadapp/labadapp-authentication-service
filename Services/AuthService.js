global.fetch = require('node-fetch');
global.navigator = () => null;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const config = require('config');

//aws cognito configuration
const poolData =  {
    UserPoolId: config.get('aws-cognito-config.UserPoolId'),
    ClientId: config.get('aws-cognito-config.ClientId')
};

const poolRegion = config.get('aws-cognito-config.PoolRegion');

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.Register = (body, callback) => {
    var {name, email, password} = body,
        attributes = [];

    attributes.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email
    }));

    userPool.signUp(email, password, attributes, null, function(err, result) {

        if (err) {
            callback(err);
        }

        var cognitoUser = result.user;
        callback(null, cognitoUser);
    });
}
