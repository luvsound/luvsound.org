export default {
    format(seconds) {
        let minutes = parseInt(seconds / 60);
        let hours = parseInt(minutes / 60);
        let secs = parseInt(seconds - ((minutes * 60) + (hours * 60 * 60)));

        if(hours < 10) { hours = '0' + hours; }
        if(minutes < 10) { minutes = '0' + minutes; }
        if(secs < 10) { secs = '0' + secs; }

        if(seconds > 60 * 60) {
            return `${ hours }:${ minutes }:${ secs }`;
        } else if(seconds > 60) {
            return `${ minutes }:${ secs }`;
        } else {
            return `00:${ secs }`;
        }

        return seconds;
    }
}
