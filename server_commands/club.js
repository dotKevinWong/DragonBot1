/* 
    Club Finder
    - This uses Cheerio.js and NightmareJS to search against the Drexel CampusLabs website
    for club information and photo.
*/

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  if (message.channel.id === process.env.CLUB_CHANNEL_ID) {
    const query = args[0] + "%20" + args[1] + "%20";
    message.channel.send("Fetching...").then(msg => {
      msg.delete(5000);
    });

    async () => {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"]
      });
      const page = await browser.newPage();
      await page.goto(
        process.env.CAMPUSLABS_URL + "/engage/organizations?query=" + query
      );

      /*
    const nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    nightmare
      .goto(config.CAMPUSLABS_URL + "/engage/organizations?query=" + query)
      .wait("#org-search-results")
      .evaluate(() => document.querySelector("#org-search-results").innerHTML)
      .end()
      .then(response => {
        console.log(getData(response));
      })
      .catch(err => {
        console.log(err);
      });
      */

      const html = await page.$eval("#org-search-results", e => e.innerHTML);
      let data = [];
      const $ = cheerio.load(html);
      $("div > div > div > a").each((i, elem) => {
        data.push({
          link: $(elem).attr("href"),
          image: $(elem)
            .find("div > div > div > span > div > div > img")
            .attr("src"),
          name: $(elem)
            .find("div > div > div > span > div > div > div")
            .text(),
          alt: $(elem)
            .find("div > div > div > span > div > div > p")
            .text()
        });
      });
      for (let i = 0; i < 3; i++) {
        const clubEmbed = new discord.RichEmbed()
          .setColor("0099ff")
          .setTitle(data[i].name)
          .setURL(process.env.CAMPUSLABS_URL + data[i].link)
          .setDescription(data[i].alt)
          .setImage(data[i].image)
          .setTimestamp();
        message.channel.send(clubEmbed);
      }
      await browser.close();
    };
  }
};