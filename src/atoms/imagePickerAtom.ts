import { atom } from 'jotai';

const imagePickerAtom = atom<ImagePicker>({
	selecting: null,
	picture: '',
	imageData: null,
});

export type ImagePicker = {
	selecting: 'colorA' | 'colorB' | null;
	picture: string;
	imageData: Uint8ClampedArray<ArrayBufferLike> | null;
	fileReader?: FileReader;
	file?: File;
};

export default imagePickerAtom;
