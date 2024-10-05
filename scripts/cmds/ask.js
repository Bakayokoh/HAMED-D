const axios = require('axios');

const fonts = {

    mathsans: {
        a: "𝗮", à: "𝗮̀", â: "𝗮̂", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", è: "𝗲̀", é: "𝗲́", ê: "𝗲̂" f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶",
    j: "𝗷", k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿",
    s: "𝘀", t: "𝘁", u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
    J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
    S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",1: "𝟭", 2: "𝟮", 3: "𝟯", 4: "𝟰", 5: "𝟱", 6: "𝟲", 7: "𝟳", 8: "𝟴", 9: "𝟵", 0: "𝟬"
    }
};
const rolePlay = "quand tu répond à cette question ajoutes des emojis convenable :\n\n";

const Prefixes = [
  'optimus',
  'ai',
  'prime',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "Aesther",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
      const prompt = event.body.substring(prefix.length).trim();
api.setMessageReaction("📚", event.messageID, () => {}, true);
      if (!prompt) {
        await message.reply("📚");
        return;
      }
        return;
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(rolePlay + prompt)}`);
      const answer = `[📕] 𝗢𝗣𝗧𝗜𝗠𝗨𝗦 𝗣𝗥𝗜𝗠𝗘\n\n${response.data.answer} \n[📚]········································⬚`;
api.setMessageReaction("📕", event.messageID, () => {}, true);

      //apply const font to each letter in the answer
      let formattedAnswer = "";
      for (let letter of answer) {
        formattedAnswer += letter in fonts.mathsans ? fonts.mathsans[letter] : letter;
      }

      await message.reply(formattedAnswer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
