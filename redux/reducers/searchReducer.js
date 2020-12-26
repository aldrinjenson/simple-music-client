import {
  GET_SONGS_LIST,
  GET_SONGS_LIST_SUCCESS,
  GET_DATA_ERROR,
  GET_ALBUM_LIST_SUCCESS,
  GET_SUGGESTED_SONGS_SUCCESS,
  GET_SUGGESTED_SONGS,
} from "../constants";

const initialState = {
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  isSuggestedSongsLoading: false,
  suggestedSongs: [],
  playList: [],
};

const searchReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case GET_SONGS_LIST:
      return { ...state, songs: [], isLoading: true };
    case GET_SONGS_LIST_SUCCESS:
      return { ...state, isLoading: false, songs: payload };

    case GET_ALBUM_LIST_SUCCESS:
      return {
        ...state,
        albums: payload,
      };

    case GET_SUGGESTED_SONGS:
      return {
        ...state,
        suggestedSongs: [],
        isSuggestedSongsLoading: true,
      };
    case GET_SUGGESTED_SONGS_SUCCESS:
      return {
        ...state,
        suggestedSongs: payload,
        playlist: payload,
        isSuggestedSongsLoading: false,
      };

    case GET_DATA_ERROR:
      console.error({ payload });
      return { ...state, songs: [], isLoading: false, error: payload };
    default:
      return state;
  }
};

export default searchReducer;
