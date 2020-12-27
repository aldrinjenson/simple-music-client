import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { apiDispatch } from "../global/utils";
import { SET_IS_SONG_PLAYING, SET_SOUND_OBJECT } from "../redux/constants";
import {
  getSongDetails,
  incrementPlayIndex,
} from "../redux/actions/songActions";
import { getSuggestedSongsList } from "../redux/actions/searchActions";

Audio.setAudioModeAsync({ staysActiveInBackground: true });

const SongPlayer = () => {
  const {
    nowPlaying,
    isUrlLoading,
    isSongPlaying,
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
        dispatch(incrementPlayIndex());
      }
    });
    dispatch(apiDispatch(SET_SOUND_OBJECT, soundObj));
    dispatch(apiDispatch(SET_IS_SONG_PLAYING, true));
  };

  const playSong = async (url) => {
    if (soundObject) {
      const playStatus = await soundObject.getStatusAsync();
      if (playStatus.isPlaying) {
        soundObject
          .stopAsync()
          // .then(() => soundObject.unloadAsync())
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
          await soundObject.playAsync();
        } else {
          await soundObject.pauseAsync();
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
  }, [currentPlayIndex]);

  return <View></View>;
};

export default SongPlayer;

const styles = StyleSheet.create({});
