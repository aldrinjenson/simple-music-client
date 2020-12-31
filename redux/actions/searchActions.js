import axios from "axios";
import { apiUrl } from "../../env";
import { apiDispatch, convertSongFormat, hanleError } from "../../global/utils";
import {
  GET_SONGS_LIST,
  GET_SONGS_LIST_SUCCESS,
  GET_SUGGESTED_SONGS,
  GET_SUGGESTED_SONGS_SUCCESS,
  REMOVE_SONG_FROM_SUGGESTIONS,
  ADD_SONG_TO_SUGGESTIONS,
} from "../constants";

export const getSongsList = (query) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SONGS_LIST, true));
    axios
      .get(`${apiUrl}/search/${query}`)
      .then((res) => {
        dispatch(apiDispatch(GET_SONGS_LIST_SUCCESS, res.data));
      })
      .catch(hanleError);
  };
};

export const getSuggestedSongsList = (videoId) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SUGGESTED_SONGS, true));
    axios
      .get(`${apiUrl}/suggested/${videoId}`)
      .then((res) => {
        dispatch(
          apiDispatch(GET_SUGGESTED_SONGS_SUCCESS, convertSongFormat(res.data))
        );
      })
      .catch(hanleError);
  };
};

export const removeSongFromSuggestions = (song) => {
  return {
    type: REMOVE_SONG_FROM_SUGGESTIONS,
    payload: song,
  };
};
export const addSongToSuggestions = (song) => {
  return {
    type: ADD_SONG_TO_SUGGESTIONS,
    payload: song,
  };
};
