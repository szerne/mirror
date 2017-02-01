export const clock = (() => {
    const init = (cb) => {
        setInterval(() => {
            let dateTime = moment();
            cb({
                date: dateTime.format('dddd, MMMM Do'),
                time: dateTime.format('hh:mm A')
            });
        }, 1000); 
    }

    return { init }

})();