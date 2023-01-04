import create from 'zustand';

export const useStartUp = create(set => ({
  initialRouteName: null,
  setInitialRouteName: routName => set({initialRouteName: routName}),
}));
