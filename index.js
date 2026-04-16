require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');

// Memberikan bot "mata dan telinga" untuk melihat server, pesan, dan member
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Saat bot baru pertama kali menyala
client.once('ready', async () => {
    console.log(`=================================`);
    console.log(`✅ BOT ONLINE: ${client.user.tag}`);
    console.log(`=================================`);

    // Menghubungkan bot ke Database MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ KONEKSI DATABASE: Sukses terhubung ke MongoDB!');
    } catch (error) {
        console.error('❌ ERROR DATABASE:', error);
    }
});

// Menyalakan bot menggunakan kunci token
client.login(process.env.DISCORD_TOKEN);

