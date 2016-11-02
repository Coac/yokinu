'use strict';

import PlayMusic from 'playmusic';
import Promise from 'bluebird';
import Track from './track';
const pm = new PlayMusic();

Promise.promisifyAll(pm);

export default class Library {
  constructor () {
    this.tracks = [];
    this.artists = new Map();
    this.albums = new Map();
    this.playlists = new Map();
  }

  async init (credentials) {
    await pm.initAsync(credentials);
    return this.refresh();
  }

  async refresh () {
    (await fetchTracks(null, 1)).forEach(gTrack => this.tracks.push(new Track(gTrack)));
    return this.tracks;
  }
}

async function fetchTracks (token, i) {
  if (i === 2) return [];
  var tracksData = await pm.getAllTracksAsync({nextPageToken: token});
  return tracksData.nextPageToken ? tracksData.data.items.concat(fetchTracks(tracksData.nextPageToken)) : tracksData;
}

async function fetchPlayLists () {
  return await pm.getPlayListsAsync();
}

async function fetchPlayListEntries (token, i) {
  if (i === 2) return [];
  var playListEntriesData = await pm.getPlayListEntriesAsync({nextPageToken: token});
  return playListEntriesData.nextPageToken ?
        playListEntriesData.data.items.concat(fetchTracks(playListEntriesData.nextPageToken)) : playListEntriesData;
}
