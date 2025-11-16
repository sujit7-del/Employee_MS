const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

console.log(generateOTP());

export default generateOTP;