export const voiceService = (() => {
    let commands = {};

    const whenSaid = (trigger, cb) => {
        commands[trigger] = cb;
        return voiceService;
    }

    const start = () => {
        if (!annyang) {
            return console.warn('Voice detection is unavailable');
        }

        annyang.addCallback('start', () => console.debug('voice recognition started'));
        annyang.addCallback('end', () => console.warn('voice recognition ended'));
        annyang.addCommands(commands);
        annyang.start();
    }

    const getTriggers = () => {
        return Object.keys(commands);
    }

    return { whenSaid, start, getTriggers }

})();