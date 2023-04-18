const ERROR_CODE = 500;
const SUCCESS_CODE = 202;

const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || "";
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || "";
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";

const videoStoringPath = "storage";
const driveFolderName = "Procto Vigil";

constants = {
  ERROR_CODE,
  SUCCESS_CODE,
  driveClientId,
  driveClientSecret,
  driveRedirectUri,
  driveRefreshToken,
  videoStoringPath,
  driveFolderName,
};

module.exports = constants;
