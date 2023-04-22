/*
    NOHORNY
    - Idek. Jon wanted it.
*/
const admin = require("firebase-admin");
const config = require("../config.json");
const fs = require('fs')

exports.run = (discord, client, db, message, args, discord_email, code_email_temp, code_discord_temp) => {
  
  let bucket = admin.storage().bucket();
  
  async function listFiles() {
    // Lists files in the bucket
    const [files] = await bucket.getFiles({directory: "horny-images/"});
    
    console.log('Files:');
    files.forEach(file => {
      console.log(file.name);
      if(file === "horny-images/horny1.jpg"){
        file.download({
          destination: '/tmp/image.jpg'
        }, function(err) {}).then(data => {
          message.channel.send({file: '/tmp/image.jpg'})
        });
    }
    });
  }
  
  listFiles().catch(console.error);

  /*message.channel.send({
    files: [
      config.HORNY_ARRAY[Math.floor(Math.random() * config.HORNY_ARRAY.length) ]
    ]
  });*/
};