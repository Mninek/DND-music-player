//ctrl-shift-b to RUN, ctrl-shift-t to open terminal
const Discord = require('discord.js'); //just making sure we have discord.js
const ytdl = require('ytdl-core');
const { prefix, token} = require('./config.json');
const client = new Discord.Client();
var maxRoll = 0;

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', async message => {
  if(message.content.startsWith(`${prefix}reset`)){
    resetBot(message.channel);
  }

  if(message.content.startsWith(`${prefix}join`)) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          message.reply("I'm in here");
        })
        .catch(console.log);
    } else {
      message.reply("You need to join a voice channel first!");
      }
    }

  if(message.content.startsWith(`${prefix}play`)){
    const voiceChannel = message.member.voiceChannel;
    try{
        var connection = await voiceChannel.join();
    } catch(error){
      console.error(`Could not join: ${error}`);
      return message.channel.send("could not join");
    }

    var msg = message.content;
    msg = msg.split(' ');
    msg = msg[1];
    msg.toLowerCase();
    switch(msg){
      case 'sadtown':
        var songs = ["https://www.youtube.com/watch?v=-4Ze9hI0S_c&list=PLS-VFMeLklgJJg65HG682kd6OpPU1DID5" , "https://www.youtube.com/watch?v=6kUZ124kEYg&list=PLS-VFMeLklgJJg65HG682kd6OpPU1DID5&", "https://www.youtube.com/watch?v=nLSP12f-zuQ&list=PLS-VFMeLklgJJg65HG682kd6OpPU1DID5&", "https://www.youtube.com/watch?v=vG9L0Kia2eE&list=PLS-VFMeLklgJJg65HG682kd6OpPU1DID5&", "https://www.youtube.com/watch?v=B_8xjZ8ML_s&list=PLS-VFMeLklgJJg65HG682kd6OpPU1DID5&"];
        break;
      case "town":
        var songs = ["https://www.youtube.com/watch?v=jZPfJzgEQcI&list=PLS-VFMeLklgLzPfLhySTk8FZlWW3sBwUH", "https://www.youtube.com/watch?v=Px16HSjbgN0&list=PLS-VFMeLklgLzPfLhySTk8FZlWW3sBwUH&", "https://www.youtube.com/watch?v=mjcy4Sm61oI&list=PLS-VFMeLklgLzPfLhySTk8FZlWW3sBwUH&", "https://www.youtube.com/watch?v=1jQkaEGcU-I&list=PLS-VFMeLklgLzPfLhySTk8FZlWW3sBwUH&", "https://www.youtube.com/watch?v=QUo5WNqxwME&list=PLS-VFMeLklgLzPfLhySTk8FZlWW3sBwUH&"];
        break;
      case "battle":
        var songs = ["https://www.youtube.com/watch?v=yR2kbCDUKpg&list=PLS-VFMeLklgIIeKNZuBHq1ZMPo08EQj77&", "https://www.youtube.com/watch?v=AUQPRZUQzaY&list=PLS-VFMeLklgIIeKNZuBHq1ZMPo08EQj77&", "https://www.youtube.com/watch?v=wJlqVhYoExM&list=PLS-VFMeLklgIIeKNZuBHq1ZMPo08EQj77&", "https://www.youtube.com/watch?v=Xmem7njweic&list=PLeLCMowJv_utgwoQSfAKRmqATk6BknVTV", "https://www.youtube.com/watch?v=CFtqVJUu8RU&list=PLeLCMowJv_utgwoQSfAKRmqATk6BknVTV&"];
        break;
      case "tavern":
        var songs = ["https://www.youtube.com/watch?v=BNBUVNYOmcA&list=PLS-VFMeLklgK0rABOkOkFBtR-XvxXxRwM&", "https://www.youtube.com/watch?v=-2HppVow0y8&list=PLS-VFMeLklgK0rABOkOkFBtR-XvxXxRwM&", "https://www.youtube.com/watch?v=QuTY4GSQHT8&list=PLS-VFMeLklgK0rABOkOkFBtR-XvxXxRwM&", "https://www.youtube.com/watch?v=b1kUm551sD0&list=PLS-VFMeLklgK0rABOkOkFBtR-XvxXxRwM&", "https://www.youtube.com/watch?v=c5F1zvdqHMI&list=PLS-VFMeLklgK0rABOkOkFBtR-XvxXxRwM&"];
        break;
      case "scary":
        var songs = ["https://www.youtube.com/watch?v=6cToFAZ3cNY&list=PLS-VFMeLklgJi6eoPUx9K0UfuTp2MAQKi", "https://www.youtube.com/watch?v=KqPibIc4Ans&list=PLS-VFMeLklgJi6eoPUx9K0UfuTp2MAQKi&", "https://www.youtube.com/watch?v=49BdA4jhRDQ&list=PLS-VFMeLklgJi6eoPUx9K0UfuTp2MAQKi&", "https://www.youtube.com/watch?v=onoBqqN_p1E&list=PLS-VFMeLklgJi6eoPUx9K0UfuTp2MAQKi&", "https://www.youtube.com/watch?v=5ciYdfOOxQk&list=PLS-VFMeLklgJi6eoPUx9K0UfuTp2MAQKi&"]
        break;
      case "intrigue":
        var songs = ["https://www.youtube.com/watch?v=zp8DGiKp8gM&list=PLS-VFMeLklgKFKmKRDWAAi2zBXT-JSZ6m", "https://www.youtube.com/watch?v=PT1Ld_kOFBo&list=PLS-VFMeLklgKFKmKRDWAAi2zBXT-JSZ6m&", "https://www.youtube.com/watch?v=LAqahHZqV8g&list=PLS-VFMeLklgKFKmKRDWAAi2zBXT-JSZ6m&", "https://www.youtube.com/watch?v=TOP_v-kl3Bw&list=PLS-VFMeLklgKFKmKRDWAAi2zBXT-JSZ6m&", "https://www.youtube.com/watch?v=qvH_LhOS8WY&list=PLS-VFMeLklgKFKmKRDWAAi2zBXT-JSZ6m&"];
        break;
      case "dungeon":
        var songs = ["https://www.youtube.com/watch?v=0NIIRGPuTx8&list=RDQMxFI7sczQ9BU&start_radio=1", ""]
        break;
      case "calm":
        var songs = ["https://www.youtube.com/watch?v=FpqeyO31kSA&list=PLS-VFMeLklgIAVvYMvDAhxoXmkmeuBd9c", "https://www.youtube.com/watch?v=knAo1PD7iJ8&list=PLS-VFMeLklgIAVvYMvDAhxoXmkmeuBd9c&", "https://www.youtube.com/watch?v=d9maMRYMGIY&list=PLS-VFMeLklgIAVvYMvDAhxoXmkmeuBd9c&", "https://www.youtube.com/watch?v=5-HZB_eM_k4&list=PLS-VFMeLklgIAVvYMvDAhxoXmkmeuBd9c&", "https://www.youtube.com/watch?v=Z72vuaTJzY0&list=PLS-VFMeLklgIAVvYMvDAhxoXmkmeuBd9c&"];
        break;
      default:
        songs = ["https://www.youtube.com/watch?v=oHg5SJYRHA0", "https://www.youtube.com/watch?v=oHg5SJYRHA0", "https://www.youtube.com/watch?v=oHg5SJYRHA0", "https://www.youtube.com/watch?v=oHg5SJYRHA0", "https://www.youtube.com/watch?v=oHg5SJYRHA0"];
        break;
    }
    var i = Math.floor(Math.random() * (4));
    const stream = connection.playStream(ytdl(songs[i], {filter: 'audioonly'}));
}


  if(message.content.startsWith(`${prefix}back`)){
    const voiceChannel = message.member.voiceChannel;
    try{
        var connection =await voiceChannel.join();
    } catch(error){
      console.error(`Could not join: ${error}`);
      return message.channel.send("could not join");
    }
    var msg = message.content;
    msg = msg.split(' ');
    msg = msg[1];
    msg.toLowerCase();
    switch(msg){
      case 'storm':
        var song = "https://www.youtube.com/watch?v=2wqf6nvML7Y&t=269s";
        break;
      case 'lvlup':
        var song = 'https://www.youtube.com/watch?v=MO9pW3sfbTY&list=PLG9cJ_WOKqNzZcS22nvRIyTdA18CXfDKE&';
        break;
      case 'bar':
        var song = "https://www.youtube.com/watch?v=FM3Ep3yka44";
        break;
      case 'barbrawl':
        var song = "https://www.youtube.com/watch?v=0p79IBaksXU";
        break;
      case 'got':
        var song = "https://www.youtube.com/watch?v=L9SIS6wBxpI";
        break;
      case 'boss':
        var song = "https://www.youtube.com/watch?v=u34swz1I1hs";
        break;
      default:
        var song = "https://www.youtube.com/watch?v=oHg5SJYRHA0";
        break;
      }

      const stream = connection.playStream(ytdl(song, {filter: 'audioonly'}));
      }
  if(message.content.startsWith(`${prefix}stop`)){
    if(!message.member.voiceChannel) return message.channel.send("You are not in the voice chanell");
    message.member.voiceChannel.leave();
    return undefined;
  }
})

function resetBot(channel) {
    channel.send('Resetting Bot...')
    .then(msg => client.destroy())
    .then(() => client.login(token));
}

client.login(token);
