import create from 'zustand';

export const useLetsConnect = create((set, get) => ({
  success: null,
  setSuccessMessage: message => set({success: message}),
  removeSuccessMessage: () => set({success: null}),

  applyVideoId: null,
  setApplyVideoId: applyVideoId => set({applyVideoId}),
  removeSApplyVideoId: () => set(null),
  getApplyVideoId: () => {
    return {
      reqId: get().applyVideoId,
    };
  },
}));
