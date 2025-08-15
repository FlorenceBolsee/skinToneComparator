import { atom } from 'jotai';

const imagePickerAtom = atom<{
	selecting: 'colorA' | 'colorB' | null;
	picture: string;
}>({
	selecting: null,
	picture: '',
});

export default imagePickerAtom;
