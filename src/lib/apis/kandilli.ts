import { load } from "cheerio";
import request from "request";

import TEarthquake from "@/models/earthquake";

export async function GetKandilli(): Promise<TEarthquake[]> {
  const earthquakes: TEarthquake[] = [];

  await new Promise((resolve, reject) => {
    request(
      "http://www.koeri.boun.edu.tr/scripts/lst0.asp",
      (error, response, html) => {
        if (error) {
          reject(error);
          return;
        }
        if (response.statusCode == 200) {
          const loadedHtml = load(html);
          const response = loadedHtml("pre").text();

          let result = response.split("\n");
          result = result.splice(6, result.length + 1);

          result.forEach((element) => {
            const eqString = element.split(" ");
            const eqInfo = [];
            for (let i = 0; i < eqString.length; i++) {
              if (eqString[i].length > 0) {
                eqInfo.push(eqString[i]);
              }
            }

            if (eqInfo[1]) {
              const date = new Date(eqInfo[0]);
              const time = eqInfo[1].split(":");

              const completeDate = new Date(
                Date.UTC(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  parseInt(time[0]),
                  parseInt(time[1]),
                  parseInt(time[2])
                )
              );

              const latitude = parseFloat(eqInfo[2]);
              const longitude = parseFloat(eqInfo[3]);
              const depth = parseFloat(eqInfo[4]);
              const magnitude = parseFloat(eqInfo[6]);
              const location = eqInfo[8];
              const city = eqInfo[9];

              const earthquake = new TEarthquake(
                completeDate,
                latitude,
                longitude,
                depth,
                magnitude,
                location,
                city
              );

              if (magnitude >= 2 && magnitude < 4) {
                earthquake.priority = "normal";
                earthquake.zIndexOffset = 10;
              } else if (magnitude >= 4 && magnitude < 6) {
                earthquake.priority = "high";
                earthquake.zIndexOffset = 100;
              } else if (magnitude >= 6) {
                earthquake.priority = "critical";
                earthquake.zIndexOffset = 1000;
              }

              earthquakes.push(earthquake);
            } else {
              console.error("");
            }
          });
          resolve(earthquakes);
        } else {
          reject(new Error(`Status code: ${response.statusCode}`));
        }
      }
    );
  });

  return earthquakes;
}
