import {sns} from "../../config/aws.js";

export function generateOTP() {
    const otpLength = 6; // Length of the OTP
    let otp = '';

    // Generate random digits for the OTP
    for (let i = 0; i < otpLength; i++) {
        const digit = Math.floor(Math.random() * 10);
        otp += digit.toString();
    }

    return otp;
}


export async function sendOTP(phoneNumber, otp) {
    try {
        // Construct the message
        const message = `Your OTP is: ${otp}`;

        // Send the OTP via SMS using Amazon SNS
        const params = {
            Message: message,
            PhoneNumber: phoneNumber,
        };

        const result = await sns.publish(params).promise();

        console.log(`OTP sent successfully. Message ID: ${result.MessageId}`);
        return true;
    } catch (error) {
        console.error('Failed to send OTP:', error);
        return false;
    }
}