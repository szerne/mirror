const compliments = [
    'Confidence Looks Sexy On You.',
    'Muy Caliente!',
    'You\'re absolutely gorgeous, and that\'s the least interesting thing about you',
    'Looking Great, Gorgeous!',
    'You Are Beyonce Always.',
    'You Look Incredible',
    'Stunning!',
    'Dayuuum!'
];

export const greetingService = (() => {
    let index = 0;

    const randIx = () => {
        let newIndex = Math.floor(Math.random() * compliments.length);
        if (newIndex === index) {
            randIx();
        } else {
            index = newIndex;
            return index;
        }
    }
    const getCompliment = () => {
        return compliments[randIx()];
    }

    return { getCompliment }

})();

