import axios from "axios";
import { apiUrl } from "../../env";
import { apiDispatch } from "../../global/utils";
import {
  GET_SONGS_DETAILS,
  GET_SONGS_DETAILS_SUCCESS,
  INCREMENT_PLAY_INDEX,
  SET_CURRENT_SONG,
  SET_SOUND_OBJECT,
} from "../constants";

export const getSongDetails = (song) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SONGS_DETAILS, song));
    const id = song.videoId;
    axios
      .get(`${apiUrl}/song?videoId=${id}`)
      .then((res) => {
        dispatch(apiDispatch(GET_SONGS_DETAILS_SUCCESS, res.data));
        // playSound(res.data);
      })
      .catch((err) => console.log("error" + err));
  };
};

export const setSoundObj = (obj) => {
  return {
    type: SET_SOUND_OBJECT,
    payload: obj,
  };
};
export const setCurrentSong = (obj) => {
  return {
    type: SET_CURRENT_SONG,
    payload: obj,
  };
};
export const incrementPlayIndex = () => {
  return {
    type: INCREMENT_PLAY_INDEX,
    payload: null,
  };
};
export const decrementPlayIndex = () => {
  return {
    type: SET_CURRENT_SONG,
    payload: null,
  };
};
