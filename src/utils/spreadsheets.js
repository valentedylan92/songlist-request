import config from "../config";

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Feuille 1!B4:E",
        valueRenderOption: "UNFORMATTED_VALUE"
      })
      .then(
        response => {
          const data = response.result.values;
					const newData = data.filter(singleData => singleData[0] !== undefined);
				  let rows =
            newData.map(row => ({
              artist: row[0],
              title: row[1],
              movie: row[2],
              link: row[3],
            }
          )) || [];
          callback({
            rows
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}
