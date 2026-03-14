import makeWASocket, { 
DisconnectReason,
useMultiFileAuthState,
fetchLatestBaileysVersion 
} from "@whiskeysockets/baileys"

import pino from "pino"
import config from "./config.js"

async function startBot() {

const { state, saveCreds } = await useMultiFileAuthState(config.sessionName)

const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: pino({ level: "silent" }),
auth: state,
printQRInTerminal: true
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", (update) => {

const { connection, lastDisconnect } = update

if (connection === "close") {

const shouldReconnect =
lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

if (shouldReconnect) {
startBot()
}

} else if (connection === "open") {

console.log("✅ AKAZA BOT CONNECTED")

}

})

sock.ev.on("messages.upsert", async ({ messages }) => {

const m = messages[0]
if (!m.message) return

const text =
m.message.conversation ||
m.message.extendedTextMessage?.text

if (!text) return

if (text.startsWith(config.prefix)) {

const command = text.slice(1).split(" ")[0]

if (command === "ping") {

await sock.sendMessage(
m.key.remoteJid,
{ text: "🏓 Pong! Bot is working." }
)

}

}

})

}

startBot()
