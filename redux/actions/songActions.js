import axios from "axios";
import { apiUrl } from "../../config";
import { apiDispatch, hanleError } from "../../global/utils";
import {
  GET_SONGS_DETAILS,
  GET_SONGS_DETAILS_SUCCESS,
  UPDATE_PLAY_INDEX,
  SET_SOUND_OBJECT,
  TOGGLE_PAUSE,
} from "../constants";

export const getSongDetails = (song) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SONGS_DETAILS, song));
    const id = song.videoId;
    axios
      .get(`${apiUrl}/song/${id}`)
      .then((res) => {
        dispatch(apiDispatch(GET_SONGS_DETAILS_SUCCESS, res.data));
      })
      .catch(hanleError);
  };
};

export const setSoundObj = (obj) => {
  return {
    type: SET_SOUND_OBJECT,
    payload: obj,
  };
};

export const updatePlayIndex = (index) => {
  return {
    type: UPDATE_PLAY_INDEX,
    payload: index,
  };
};

export const togglePause = () => {
  return {
    type: TOGGLE_PAUSE,
    payload: null,
  };
};
