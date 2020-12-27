import {
  GET_SONGS_LIST,
  GET_SONGS_LIST_SUCCESS,
  GET_DATA_ERROR,
  GET_ALBUM_LIST_SUCCESS,
  GET_SUGGESTED_SONGS_SUCCESS,
  GET_SUGGESTED_SONGS,
} from "../constants";

const initialState = {
  searchResults: [],
  albums: [],
  isLoading: false,
  error: null,
  isSuggestedSongsLoading: false,
  suggestedSongs: [],
};

const searchReducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case GET_SONGS_LIST:
      return { ...state, searchResults: [], isLoading: true };
    case GET_SONGS_LIST_SUCCESS:
      return { ...state, isLoading: false, searchResults: payload };
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
      return { ...state, searchResults: [], isLoading: false, error: payload };

    default:
      return state;
  }
};

export default searchReducer;
