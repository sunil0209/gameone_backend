import AWS from 'aws-sdk';

// Configure AWS
AWS.config.update({
    region: process.env.AWS_REGION, // Replace with your AWS region
});


// Create an SNS object
const sns = new AWS.SNS();

export { sns};
