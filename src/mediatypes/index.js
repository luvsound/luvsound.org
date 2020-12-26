export default {
    track_metadata(track) {
        let sources = [];
        if(track.flac) {
            sources.push(this.metadata(track.flac, 'flac'));
        }

        if(track.mp3) {
            sources.push(this.metadata(track.mp3, 'mp3'));
        }

        if(track.ogg) {
            sources.push(this.metadata(track.ogg, 'ogg'));
        }

        if(track.wav) {
            sources.push(this.metadata(track.wav, 'wav'));
        }

        if(track.aif) {
            sources.push(this.metadata(track.aif, 'aif'));
        }


        return sources;
    },

    metadata(src, type) {
        if(type === 'wav') {
            return {
                name: 'WAV', 
                ext: 'wav',
                type: 'audio/wav', 
                src: src, 
            }
        }
        if(type === 'ogg') {
            return {
                name: 'OGG', 
                ext: 'ogg',
                type: 'audio/ogg', 
                src: src, 
            }
        }
        if(type === 'mp3') {
            return {
                name: 'MP3', 
                ext: 'mp3',
                type: 'audio/mp3', 
                src: src, 
            }
        }

        if(type === 'flac') {
            return {
                name: 'FLAC', 
                ext: 'flac',
                type: 'audio/flac', 
                src: src, 

            }
        }

        if(type === 'aif') {
            return {
                name: 'AIFF', 
                ext: 'aif',
                type: 'audio/aiff', 
                src: src, 
            }
        }


    }
}
