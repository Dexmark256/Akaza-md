import { cmd } from "../command.js"
import config from "../config.js"

// Register the menu command
cmd({
    pattern: "menu",
    desc: "Show bot commands menu",
    category: "main"
},
async (sock, m) => {
    const message = `
👋 Hello! I am *${config.botName}*

💠 Owner: ${config.ownerName}
💠 Prefix: ${config.prefix}
💠 Mode: ${config.mode}

📜 *Main Commands:*
${config.prefix}ping - Check if bot is alive
${config.prefix}alive - Show bot status
${config.prefix}menu - Show this menu
    `
    await sock.sendMessage(m.key.remoteJid, { text: message })
})
