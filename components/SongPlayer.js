import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";

import { apiDispatch } from "../global/utils";
import { SET_SOUND_OBJECT } from "../redux/constants";
import {
  getSongDetails,
  updatePlayIndex,
  togglePause,
} from "../redux/actions/songActions";
import { getSuggestedSongsList } from "../redux/actions/searchActions";

Audio.setAudioModeAsync({ staysActiveInBackground: true });

const SongPlayer = () => {
  const {
    nowPlaying,
    isUrlLoading,
    songUrl,
    isPaused,
    currentPlayIndex,
    soundObject,
  } = useSelector((state) => state.songReducer);

  const suggestedSongs = useSelector(
    (state) => state.searchReducer.suggestedSongs
  );

  const dispatch = useDispatch();

  const playSound = async (uri) => {
    const { sound: soundObj } = await Audio.Sound.createAsync({
      uri,
    });
    await soundObj.playAsync();
    soundObj.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        console.log("finished loading");
        dispatch(updatePlayIndex(currentPlayIndex + 1));
      }
    });
    dispatch(apiDispatch(SET_SOUND_OBJECT, soundObj));
    dispatch(apiDispatch(togglePause, false));
  };

  const playSong = async (url) => {
    if (soundObject) {
      const playStatus = await soundObject.getStatusAsync();
      if (playStatus.isPlaying) {
        soundObject
          .stopAsync()
          .then(() => soundObject.unloadAsync())
          .then(() => playSound(url));
      } else {
        playSound(url);
      }
    } else {
      playSound(url);
    }
  };

  useEffect(() => {
    const handlePause = async () => {
      if (soundObject) {
        if (isPaused) {
          await soundObject.pauseAsync();
        } else {
          await soundObject.playAsync();
        }
      }
    };
    handlePause();
  }, [isPaused]);

  useEffect(() => {
    if (!isUrlLoading && songUrl) {
      playSong(songUrl);
    }
  }, [isUrlLoading, songUrl]);

  useEffect(() => {
    if (suggestedSongs.length) {
      dispatch(getSongDetails(suggestedSongs[currentPlayIndex]));
    } else {
      nowPlaying && apiDispatch(getSuggestedSongsList(nowPlaying.videoId));
    }
    if (currentPlayIndex === suggestedSongs.length - 1) {
      dispatch(getSuggestedSongsList(nowPlaying.videoId));
    }
  }, [currentPlayIndex]);

  return <View></View>;
};

export default SongPlayer;
