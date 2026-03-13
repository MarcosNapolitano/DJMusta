import { getRandomEmoji, getRandomSong, getRandomMusta, getRandomWine } from './utils.js';
import 'dotenv/config';
import express from 'express';
import { InteractionResponseFlags, InteractionResponseType, InteractionType, MessageComponentTypes, verifyKeyMiddleware, } from 'discord-interactions';
// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env['PORT'] || 3000;
/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env['PUBLIC_KEY']), async function (req, res) {
    // Interaction id, type and data
    const { type, data } = req.body;
    const user = req.body.member.user.username;
    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }
    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;
        if (name === 'salud') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    flags: InteractionResponseFlags.IS_COMPONENTS_V2,
                    components: [
                        {
                            type: MessageComponentTypes.TEXT_DISPLAY,
                            content: `${getRandomEmoji()} Salud ${user}!!!`
                        }
                    ]
                },
            });
        }
        if (name === 'cumbia') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `🎵 Hoy se escucha:\n${getRandomSong()}`
                },
            });
        }
        if (name === 'miau') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    flags: InteractionResponseFlags.IS_COMPONENTS_V2,
                    components: [
                        {
                            type: MessageComponentTypes.TEXT_DISPLAY,
                            content: '### MIAU'
                        },
                        {
                            type: MessageComponentTypes.MEDIA_GALLERY,
                            items: [{ media: { url: getRandomMusta() } }]
                        }
                    ]
                },
            });
        }
        if (name === 'vino') {
            const [vino, url] = getRandomWine();
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    flags: InteractionResponseFlags.IS_COMPONENTS_V2,
                    components: [
                        {
                            type: MessageComponentTypes.TEXT_DISPLAY,
                            content: `🍷 Hoy se toma:\n**${vino}**`
                        },
                        {
                            type: MessageComponentTypes.MEDIA_GALLERY,
                            items: [{ media: { url: url } }]
                        }
                    ]
                },
            });
        }
        console.error(`unknown command: ${name}`);
        return res.status(400).json({ error: 'unknown command' });
    }
    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type' });
});
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
//# sourceMappingURL=index.js.map