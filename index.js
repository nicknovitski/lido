var AWS = require('aws-sdk');
AWS.config.apiVersions = {
  ec2: '2015-04-15'
}

var debugCB = function(err, data) {
  if (err) console.error(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
}

var find = function(ec2, service, cb) {
  ec2.describeVolumes({
    Filters: [
      {
        Name: 'status',
        Values: ['available']
      },
      {
        Name: 'tag:lido:service',
        Values: [service]
      }
    ]
  }, cb)
}

var handler = function(params) {
  var ec2 = new AWS.EC2({
    region: params.region
  });

  find(ec2, params.service, debugCB)
}
