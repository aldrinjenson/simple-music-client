import {
  GET_SONGS_DETAILS,
  GET_SONGS_DETAILS_SUCCESS,
  SET_CURRENT_SONG,
  SET_IS_SONG_PLAYING,
  SET_SOUND_OBJECT,
  TOGGLE_PAUSE,
} from "../constants";

const initialState = {
  nowPlaying: null,
  queue: [],
  quality: "medium",
  isUrlLoading: false,
  songUrl: null,
  isPaused: false,
  soundObject: null,
  isSongPlaying: false,
};

export default (state = initialState, { type, payload }) => {
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
        songUrl: payload,
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
    default:
      return state;
  }
};
