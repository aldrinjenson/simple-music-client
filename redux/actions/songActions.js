import { apiDispatch, hanleError } from "../../global/utils";
import ytdl from "react-native-ytdl";
import {
  GET_SONGS_DETAILS,
  GET_SONGS_DETAILS_SUCCESS,
  UPDATE_PLAY_INDEX,
  SET_SOUND_OBJECT,
  TOGGLE_PAUSE,
} from "../constants";

const getSongUrlAndThumb = async (videoID) => {
  console.log({ videoID });
  let info = await ytdl.getInfo(videoID);
  let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
  const {
    videoDetails: { thumbnails },
  } = info;
  console.log("getting song url");
  return {
    url: audioFormats[0]?.url,
    thumbnail: thumbnails[thumbnails.length - 2].url,
  };
};

export const getSongDetails = (song) => {
  return (dispatch) => {
    dispatch(apiDispatch(GET_SONGS_DETAILS, song));
    const id = song.videoId;
    getSongUrlAndThumb(id)
      .then((res) => dispatch(apiDispatch(GET_SONGS_DETAILS_SUCCESS, res)))
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
