const config = require('../config')

// ─────────────────────────────────────────
//         AKAZA BOT — HELPER FUNCTIONS
// ─────────────────────────────────────────

/**
 * Check if a JID is the bot owner
 */
const isOwner = (jid) => jid === config.ownerNumber

/**
 * Check if a message is from a group
 */
const isGroup = (jid) => jid.endsWith('@g.us')

/**
 * Extract the sender's JID from a message
 */
const getSender = (msg) => {
  return msg.key.fromMe
    ? config.ownerNumber
    : msg.key.participant || msg.key.remoteJid
}

/**
 * Extract plain text from any message type
 */
const getMessageText = (msg) => {
  const m = msg.message
  if (!m) return ''

  return (
    m.conversation ||
    m.extendedTextMessage?.text ||
    m.imageMessage?.caption ||
    m.videoMessage?.caption ||
    m.buttonsResponseMessage?.selectedButtonId ||
    m.listResponseMessage?.singleSelectReply?.selectedRowId ||
    ''
  )
}

/**
 * Parse a command and its arguments from a message
 * Returns { command, args, fullText } or null if not a command
 */
const parseCommand = (text, prefix) => {
  if (!text.startsWith(prefix)) return null

  const fullText = text.slice(prefix.length).trim()
  const [command, ...args] = fullText.split(' ')

  return {
    command: command.toLowerCase(),
    args,
    fullText,
  }
}

/**
 * Format a WhatsApp JID to a readable phone number
 * e.g. 2348012345678@s.whatsapp.net → +2348012345678
 */
const formatNumber = (jid) => {
  return '+' + jid.replace('@s.whatsapp.net', '').replace('@g.us', '')
}

/**
 * Format milliseconds to a readable uptime string
 * e.g. 3661000 → 1h 1m 1s
 */
const formatUptime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours}h ${minutes}m ${seconds}s`
}

/**
 * Sleep/delay helper
 * e.g. await sleep(2000) — waits 2 seconds
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Get current timestamp as a readable string
 */
const getTimestamp = () => {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Africa/Lagos',
    hour12: true,
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

/**
 * Capitalize first letter of a string
 */
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Check if a string is a valid WhatsApp JID
 */
const isValidJID = (jid) => {
  return typeof jid === 'string' && (jid.endsWith('@s.whatsapp.net') || jid.endsWith('@g.us'))
}

module.exports = {
  isOwner,
  isGroup,
  getSender,
  getMessageText,
  parseCommand,
  formatNumber,
  formatUptime,
  sleep,
  getTimestamp,
  capitalize,
  isValidJID,
      }
      
