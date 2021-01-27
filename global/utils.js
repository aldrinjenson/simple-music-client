export const apiDispatch = (actionType = "", data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const milliToTime = (ms) => {
  return new Date(ms).toISOString().slice(14, -5);
};

export const convertSongFormat = (songs = []) => {
  const newSongList = songs.map((song) => ({
    name: song.title,
    thumbnails: song.thumbnails,
    artist: { name: song.author?.name.slice(0, -7) },
    duration: +song.lengthSeconds * 1000,
    videoId: song.videoId,
  }));
  return newSongList;
};

export const hanleError = (err) => {
  console.log("error in response");
  console.error(err);
};
