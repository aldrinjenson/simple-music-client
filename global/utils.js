export const apiDispatch = (actionType = "", data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const milliToTime = (ms) => {
  return new Date(ms).toISOString().slice(14, -5);
};

export const convertSongFormat = (songs) => {
  const newSongList = songs.map((song) => {
    return {
      name: song.title,
      thumbnails: [song.thumbnails[song.thumbnails.length - 1]],
      artist: { name: song.author.name },
      duration: +song.lengthSeconds * 1000,
      videoId: song.videoId,
    };
  });
  return newSongList;
};
