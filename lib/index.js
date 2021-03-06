import { NativeEventEmitter, NativeModules, View } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const { TrackPlayerModule: TrackPlayer } = NativeModules;
const eventEmitter = new NativeEventEmitter(TrackPlayer);

function resolveAsset(uri) {
    if(!uri) return undefined;
    return resolveAssetSource(uri);
}

function resolveUrl(url) {
    if(!url) return undefined;
    return resolveAssetSource(url) || url;
}

function updateOptions(data) {
    // Resolve the asset for each icon
    data.icon = resolveAsset(data.icon);
    data.playIcon = resolveAsset(data.playIcon);
    data.pauseIcon = resolveAsset(data.pauseIcon);
    data.stopIcon = resolveAsset(data.stopIcon);
    data.previousIcon = resolveAsset(data.previousIcon);
    data.nextIcon = resolveAsset(data.nextIcon);

    return TrackPlayer.updateOptions(data);
}

function add(tracks, insertBeforeId) {
    if(!Array.isArray(tracks)) {
        tracks = [tracks];
    }

    // Resolve the URL for each track
    for(let i = 0; i < tracks.length; i++) {
        tracks[i].url = resolveUrl(tracks[i].url);
        tracks[i].artwork = resolveUrl(tracks[i].artwork);
    }

    return TrackPlayer.add(tracks, insertBeforeId);
}

function remove(tracks) {
    if(!Array.isArray(tracks)) {
        tracks = [tracks];
    }

    return TrackPlayer.remove(tracks);
}

// We'll declare each one of the constants and functions manually so IDEs can show a list of them
// We should also add documentation here, but I'll leave this task to another day

// States
module.exports.STATE_NONE = TrackPlayer.STATE_NONE;
module.exports.STATE_PLAYING = TrackPlayer.STATE_PLAYING;
module.exports.STATE_PAUSED = TrackPlayer.STATE_PAUSED;
module.exports.STATE_STOPPED = TrackPlayer.STATE_STOPPED;
module.exports.STATE_BUFFERING = TrackPlayer.STATE_BUFFERING;

// Capabilities
module.exports.CAPABILITY_PLAY = TrackPlayer.CAPABILITY_PLAY;
module.exports.CAPABILITY_PLAY_FROM_ID = TrackPlayer.CAPABILITY_PLAY_FROM_ID;
module.exports.CAPABILITY_PLAY_FROM_SEARCH = TrackPlayer.CAPABILITY_PLAY_FROM_SEARCH;
module.exports.CAPABILITY_PAUSE = TrackPlayer.CAPABILITY_PAUSE;
module.exports.CAPABILITY_STOP = TrackPlayer.CAPABILITY_STOP;
module.exports.CAPABILITY_SEEK_TO = TrackPlayer.CAPABILITY_SEEK_TO;
module.exports.CAPABILITY_SKIP = TrackPlayer.CAPABILITY_SKIP;
module.exports.CAPABILITY_SKIP_TO_NEXT = TrackPlayer.CAPABILITY_SKIP_TO_NEXT;
module.exports.CAPABILITY_SKIP_TO_PREVIOUS = TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS;
module.exports.CAPABILITY_SET_RATING = TrackPlayer.CAPABILITY_SET_RATING;

// Rating Types
module.exports.RATING_HEART = TrackPlayer.RATING_HEART;
module.exports.RATING_THUMBS_UP_DOWN = TrackPlayer.RATING_THUMBS_UP_DOWN;
module.exports.RATING_3_STARS = TrackPlayer.RATING_3_STARS;
module.exports.RATING_4_STARS = TrackPlayer.RATING_4_STARS;
module.exports.RATING_5_STARS = TrackPlayer.RATING_5_STARS;
module.exports.RATING_PERCENTAGE = TrackPlayer.RATING_PERCENTAGE;

// Cast States
module.exports.CAST_NO_DEVICES_AVAILABLE = TrackPlayer.CAST_NO_DEVICES_AVAILABLE;
module.exports.CAST_NOT_CONNECTED = TrackPlayer.CAST_NOT_CONNECTED;
module.exports.CAST_CONNECTING = TrackPlayer.CAST_CONNECTING;
module.exports.CAST_CONNECTED = TrackPlayer.CAST_CONNECTED;

// Player Lifecycle
module.exports.setupPlayer = TrackPlayer.setupPlayer;
module.exports.destroy = TrackPlayer.destroy;

// Player Options
module.exports.updateOptions = updateOptions;

// Player Queue Commands
module.exports.add = add;
module.exports.remove = remove;
module.exports.skip = TrackPlayer.skip;
module.exports.skipToNext = TrackPlayer.skipToNext;
module.exports.skipToPrevious = TrackPlayer.skipToPrevious;

// Player Playback Commands
module.exports.reset = TrackPlayer.reset;
module.exports.play = TrackPlayer.play;
module.exports.pause = TrackPlayer.pause;
module.exports.stop = TrackPlayer.stop;
module.exports.seekTo = TrackPlayer.seekTo;
module.exports.setVolume = TrackPlayer.setVolume;

// Player Getters
module.exports.getTrack = TrackPlayer.getTrack;
module.exports.getCurrentTrack = TrackPlayer.getCurrentTrack;
module.exports.getVolume = TrackPlayer.getVolume;
module.exports.getDuration = TrackPlayer.getDuration;
module.exports.getPosition = TrackPlayer.getPosition;
module.exports.getBufferedPosition = TrackPlayer.getBufferedPosition;
module.exports.getState = TrackPlayer.getState;

// Event Emitter
module.exports.eventEmitter = eventEmitter;

// Cast Getters
module.exports.getCastState = TrackPlayer.getCastState;

// Components
if(TrackPlayer.CAST_SUPPORT_AVAILABLE) {
    module.exports.CastButton = require('./CastButton');
} else {
    module.exports.CastButton = View; // Cast Unavailable
}
