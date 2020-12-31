import {
  GET_SONGS_LIST,
  GET_SONGS_LIST_SUCCESS,
  GET_SUGGESTED_SONGS_SUCCESS,
  GET_SUGGESTED_SONGS,
  REMOVE_SONG_FROM_SUGGESTIONS,
  ADD_SONG_TO_SUGGESTIONS,
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
    case REMOVE_SONG_FROM_SUGGESTIONS:
      return {
        ...state,
        suggestedSongs: state.suggestedSongs.filter(
          (song) => song.videoId !== payload.videoId
        ),
      };

    case ADD_SONG_TO_SUGGESTIONS:
      return {
        ...state,
        suggestedSongs: [...state.suggestedSongs, payload],
      };

    default:
      return state;
  }
};

export default searchReducer;
