/* 
    Club Finder
    - This uses Cheerio.js and NightmareJS to search against the Drexel CampusLabs website
    for club information and photo.
*/

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const Nightmare = require("nightmare");

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  if (message.channel.id === process.env.CLUB_CHANNEL_ID) {
    const query = args[0] + "%20" + args[1] + "%20";
    message.channel.send("Fetching...").then(msg => {msg.delete({ timeout: 5000 });});
    console.log(query)
    
    /*
    async () => {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"]
      });
      const page = await browser.newPage();
      await page.goto(
        process.env.CAMPUSLABS_URL + "/engage/organizations?query=" + query
      );

      */
    const nightmare = Nightmare({ show: false, waitTimeout: 10000 });
    nightmare
      /*.goto(process.env.CAMPUSLABS_URL + "/engage/organizations?query=" + query)
      .wait("#org-search-results")
      .evaluate(() => document.querySelector("#org-search-results").innerHTML)
      .end()
      .then(response => {
        console.log("here");
        console.log(response);
      })*/
    .goto('https://www.google.com/')
    .type("input[title='Search']", 'ScrapingBee')
    .click("input[value='Google Search']")
    .wait('#rso > div:nth-child(1) > div > div > div.r > a')
    .evaluate(
      () =>
        document.querySelector(
          '#rso > div:nth-child(1) > div > div > div.r > a'
        ).href
    )
    .end()
    .then((link) => {
      console.log('Scraping Bee Web Link: ', link)
    })
    .catch(err => {
      console.log(err);
    });
      
/*
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
    };*/
  }
};
