import {
  DECREMENT_PLAY_INDEX,
  GET_SONGS_DETAILS,
  GET_SONGS_DETAILS_SUCCESS,
  INCREMENT_PLAY_INDEX,
  SET_CURRENT_SONG,
  SET_IS_SONG_PLAYING,
  SET_SOUND_OBJECT,
  TOGGLE_PAUSE,
} from "../constants";

const initialState = {
  nowPlaying: null,
  isUrlLoading: false,
  songUrl: null,
  isPaused: false,
  soundObject: null,
  isSongPlaying: false,
  currentSongThumbnail: null,
  currentPlayIndex: 0,
};

const songReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case GET_SONGS_DETAILS:
      return {
        ...state,
        isUrlLoading: true,
        nowPlaying: payload,
        songUrl: null,
      };

    case GET_SONGS_DETAILS_SUCCESS:
      return {
        ...state,
        isUrlLoading: false,
        isPaused: false,
        songUrl: payload.url,
        currentSongThumbnail: payload.thumbnail,
      };
    case TOGGLE_PAUSE: {
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    }
    case SET_SOUND_OBJECT:
      return {
        ...state,
        soundObject: payload,
      };
    case SET_IS_SONG_PLAYING:
      return {
        ...state,
        isSongPlaying: payload,
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        nowPlaying: payload,
      };
    case INCREMENT_PLAY_INDEX:
      return {
        ...state,
        currentPlayIndex: state.currentPlayIndex + 1,
      };
    case DECREMENT_PLAY_INDEX:
      return {
        ...state,
        currentPlayIndex: state.currentPlayIndex - 1,
      };
    default:
      return state;
  }
};

export default songReducer;
