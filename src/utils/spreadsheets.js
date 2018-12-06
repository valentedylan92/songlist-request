import config from "../config";

function renderImg(img){
    if(img === undefined) {
      return "https://res.cloudinary.com/teepublic/image/private/s--f4FGpzf4--/t_Preview/b_rgb:262c3a,c_limit,f_jpg,h_630,q_90,w_630/v1510382177/production/designs/2044569_1.jpg"
    }
    else{
      return img
    }

}

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Feuille 1!A4:J",
        valueRenderOption: "UNFORMATTED_VALUE"
      })
      .then(
        response => {
          const data = response.result.values;
					const newData = data.filter(singleData => singleData[1] !== undefined);
				  let rows =
            newData.map((row , index) => ({
              artist: row[1],
              title: row[2],
              movie: row[3],
              link: row[4],
              img: renderImg(row[9]),
              id : index,
              subInfos:row[0]
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
