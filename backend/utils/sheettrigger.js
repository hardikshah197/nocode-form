const { google } = require('googleapis');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const logger = require('./logger');

const keyFilePath = config.googelSecretKeyFilePath;
const sheetId = config.googleSheetId;

const trigger = async ({ name, email, comment, cheatSheetId, isMailSend = "FALSE" }) => {
    logger.debug('appending data for user ' + name);
    const date = new Date();
    const auth = new google.auth.GoogleAuth({ keyFile: keyFilePath, scopes: "https://www.googleapis.com/auth/spreadsheets" });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const rowData = [`${date}`, `${name}`, `${email}`, `${comment}`, `${cheatSheetId}`, `${isMailSend}`]
    const request = { spreadsheetId: sheetId, range: 'cheatsheet!A2', valueInputOption: 'RAW', resource: { values: [rowData], }, insertDataOption: 'INSERT_ROWS', };
    const response = await sheets.spreadsheets.values.append(request);
    logger.debug('data appened in sheet for user ' + name);
    return response;
}

module.exports = {
    trigger
}