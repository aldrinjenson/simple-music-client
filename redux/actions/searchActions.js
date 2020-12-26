import axios from "axios";
import { apiUrl } from "../../env";
import { apiDispatch, convertSongFormat } from "../../global/utils";
import {
  GET_SONGS_LIST,
  GET_DATA_ERROR,
  GET_SONGS_LIST_SUCCESS,
  GET_ALBUM_LIST_SUCCESS,
  GET_SUGGESTED_SONGS,
  GET_SUGGESTED_SONGS_SUCCESS,
} from "../constants";

export const getSongsList = (query) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SONGS_LIST, true));
    axios
      .get(`${apiUrl}/search?key=${query}`)
      .then((res) => {
        dispatch(apiDispatch(GET_SONGS_LIST_SUCCESS, res.data));
      })
      .catch((err) => dispatch(apiDispatch(GET_DATA_ERROR, err)));
  };
};

export const getSuggestedSongsList = (videoId) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SUGGESTED_SONGS, true));
    axios
      .get(`${apiUrl}/suggested?videoId=${videoId}`)
      .then((res) => {
        dispatch(
          apiDispatch(GET_SUGGESTED_SONGS_SUCCESS, convertSongFormat(res.data))
        );
      })
      .catch((err) => dispatch(apiDispatch(GET_DATA_ERROR, err)));
  };
};
