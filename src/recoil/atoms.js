// atoms.js
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();


export const ordersState = atom({
    key: 'ordersState',
    default: [],
    effects_UNSTABLE: [persistAtom],
  });

export const userState = atom({
  key: 'userState',
  default: null, 
});
