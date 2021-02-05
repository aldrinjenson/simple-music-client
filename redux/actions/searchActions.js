import axios from "axios";
import ytdl from "react-native-ytdl";
import { apiUrl } from "../../config";
import { apiDispatch, convertSongFormat, hanleError } from "../../global/utils";
import {
  GET_SONGS_LIST,
  GET_SONGS_LIST_SUCCESS,
  GET_SUGGESTED_SONGS,
  GET_SUGGESTED_SONGS_SUCCESS,
  REMOVE_SONG_FROM_SUGGESTIONS,
  ADD_SONG_TO_SUGGESTIONS,
} from "../constants";

const getSongFromIds = async (songIds) => {
  let promises = [];
  songIds.forEach((id) => promises.push(ytdl.getBasicInfo(id)));
  let suggestedSongInfos = await Promise.all(promises);
  const videoDetails = suggestedSongInfos.map((info) => info.videoDetails);
  return videoDetails;
};

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
        const songIds = res.data;
        getSongFromIds(songIds).then((songs) =>
          dispatch(
            apiDispatch(GET_SUGGESTED_SONGS_SUCCESS, convertSongFormat(songs))
          )
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
