require('dotenv').config();
module.exports = {
    development: {
        logDirectory: process.env.LOG_DIRECTORY || "./logs/app",
        port:process.env.PORT || 6000,
        base_url: process.env.BASE_URL || 'http://localhost:6000',
        googelSecretKeyFilePath: process.env.keyFilePath || "./secrets/keys.json",
        googleSheetId: process.env.sheetId || ""
    },
    test: {
        logDirectory: process.env.LOG_DIRECTORY || "./logs/app",
        port:process.env.PORT || 6000,
        base_url: process.env.BASE_URL || 'http://localhost:6000',
        googelSecretKeyFilePath: process.env.keyFilePath || "./secrets/keys.json",
        googleSheetId: process.env.sheetId || ""
    },
    production : {
        logDirectory: process.env.LOG_DIRECTORY || "./logs/app",
        port:process.env.PORT || 6000,
        base_url: process.env.BASE_URL || 'http://localhost:6000',
        googelSecretKeyFilePath: process.env.keyFilePath || "./secrets/keys.json",
        googleSheetId: process.env.sheetId || ""
    }
}