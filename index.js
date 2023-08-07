const express = require("express");

const { google } = require("googleapis");
const app = express();
const port = 3010;

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));
async function authSheets() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "keys.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  
    const authClient = await auth.getClient();
  
    const sheets = google.sheets({ version: "v4", auth: authClient });
  
    return {
      auth,
      authClient,
      sheets,
    };
  }
  app.get("/", async (req, res) => {
    const { sheets } = await authSheets();
  
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "SHEET-PAGE",
    });
  
    res.send(getRows.data);
  });

  const id = "SHEET-ID";