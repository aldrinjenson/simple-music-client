import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { apiDispatch } from "../global/utils";
import { SET_IS_SONG_PLAYING, SET_SOUND_OBJECT } from "../redux/constants";
import { getSongDetails } from "../redux/actions/songActions";

Audio.setAudioModeAsync({ staysActiveInBackground: true });

const SongPlayer = () => {
  const {
    nowPlaying,
    isUrlLoading,
    isSongPlaying,
    songUrl,
    isPaused,
    soundObject,
  } = useSelector((state) => state.songReducer);

  const dispatch = useDispatch();

  const playSound = async (uri) => {
    const { sound: soundObj } = await Audio.Sound.createAsync({
      uri,
    });
    await soundObj.playAsync();
    dispatch(apiDispatch(SET_SOUND_OBJECT, soundObj));
    dispatch(apiDispatch(SET_IS_SONG_PLAYING, true));
  };

  const playSong = (url) => {
    if (isSongPlaying) {
      soundObject.stopAsync().then(() => playSound(url));
      dispatch(apiDispatch(SET_IS_SONG_PLAYING, false));
    } else {
      playSound(url);
    }
  };

  useEffect(() => {
    if (!isUrlLoading && songUrl) {
      playSong(songUrl);
    }
  }, [isUrlLoading, songUrl]);

  return <View>{/* <Button title="button" onPress={handleStop} /> */}</View>;
};

export default SongPlayer;

const styles = StyleSheet.create({});
