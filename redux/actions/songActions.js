import axios from "axios";
import { apiUrl } from "../../env";
import { apiDispatch } from "../../global/utils";
import {
  GET_SONGS_DETAILS,
  GET_SONGS_DETAILS_SUCCESS,
  SET_CURRENT_SONG,
  SET_SOUND_OBJECT,
} from "../constants";

export const getSongDetails = (song) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SONGS_DETAILS, song));
    const id = song.videoId;
    console.log(id);
    axios
      .get(`${apiUrl}/song?videoId=${id}`)
      .then((res) => {
        const url = res.data;
        dispatch(apiDispatch(GET_SONGS_DETAILS_SUCCESS, url));
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
