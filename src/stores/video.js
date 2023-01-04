import create from 'zustand';

export const useVideoStore = create(set => ({
  url: null,
  thumbnail: null,
  setVideoUrl: url => set({url}),
  removeVideoUrl: () => set({url: null}),
  setThumbnailUrl: thumbnail => set({thumbnail}),
  removeThumbnailUrl: () => set({thumbnail: null}),
}));
