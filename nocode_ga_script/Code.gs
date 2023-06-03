const cheatSheets = [
  "https://drive.google.com/file/d/1ZTDfIrEJCS6hrq0oYFF9hNhc06ADQrua/view?usp=drive_link",
  "https://drive.google.com/file/d/1fSdg0e-hmkr4McycvNU-j8H_Jhvox1bg/view?usp=drive_link",
  "https://drive.google.com/file/d/1nVPhjheZclgcZ1IGYb8cH7yzniLVYpxg/view?usp=drive_link"
];

function onChange(e) {
  PickValues();
}

function SendEmail({ name, email, comment, cheatSheetId }) {
  const subject = 'CheatSheet form Submission';
  const message = `Hi, ${name}\n We appreciate for your valuable suggestion as "${comment}".\nPlease see the attached file for your cheatsheet: ${cheatSheets[cheatSheetId]}`;
  
  Logger.log("sending mail to: "+name);
  var recipient = email;
  var html = HtmlService.createTemplateFromFile("main");
  html.name = name;
  // html.content = JSON.stringify({ message });
  // var htmlContent = html.evaluate().getContent();
  var options = {
    name: "Hardik Sharma",
    from: "hardikshah.hs2015@gmail.com",
    // attachments: [file.getAs(MimeType.PDF)],
  };
  GmailApp.sendEmail(recipient, subject, message, options);
}

function PickValues() {
  Logger.log("picking up values from sheet");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("cheatsheet");
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const range = sheet.getRange(2, 1, lastRow - 1, lastColumn); // Retrieve data from all rows except header row
  const rows = range.getValues();
  
  for (var i = 0; i < rows.length; i++) {
    const rowData = rows[i];
    const sentColumn = headerRow.indexOf("isMailSent"); // Change "isMailSent" to the name of your "sent" column
    const sentValue = sentColumn >= 0 ? rowData[sentColumn].toString() : "";
    
    if (sentValue !== "true") { // Check if the "isMailSent" column is not set to "TRUE" for this row
      const email = rowData[headerRow.indexOf("Email")];
      const name = rowData[headerRow.indexOf("Name")];
      const comment = rowData[headerRow.indexOf("Comment")];
      const cheatSheetId = rowData[headerRow.indexOf("CheatSheetId")];

      Logger.log("requested cheatsheetId: " + cheatSheetId);
      SendEmail({ email, name, comment, cheatSheetId });
      
      // Set the "Sent" column to "TRUE" for this row
      if (sentColumn >= 0) { // Make sure the "Sent" column exists
        sheet.getRange(i + 2, sentColumn + 1).setValue("true"); // Add 2 to the row index to account for header row and 0-based indexing
      }
    }
  }
}
