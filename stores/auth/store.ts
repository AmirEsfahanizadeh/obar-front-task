import { create } from 'zustand';

type Store = {
    coards: Array<number>;
    first_name: string;
    last_name: string;
    coordinate_mobile: string;
    coordinate_phone_number: string;
    address: string
    region: number
    lat: any
    lng: any
    gender: null | 'male' | 'female'
};
type Action = {
    setCoards: (url: Array<number>) => void;
    setData: (data: {
        first_name: string;
        last_name: string;
        coordinate_mobile: string;
        coordinate_phone_number: string;
        address: string
        region: number
        lat: any
        lng: any
        gender: null | 'male' | 'female'
    }) => void;
};

const useSubmission = create<Store & Action>((set) => ({
    coards: [0, 0],
    first_name: '',
    last_name: '',
    coordinate_mobile: '0',
    coordinate_phone_number: '0',
    address: '',
    region: 1,
    lat: 0,
    lng: 0,
    gender: null,


    setCoards: (newCoards) => set((state) => ({coards: newCoards})),
    setData: (data) => set((state) => ({
        first_name: state.first_name,
        last_name: state.last_name,
        coordinate_mobile: state.coordinate_mobile,
        coordinate_phone_number: state.coordinate_phone_number,
        address: state.address,
        lat: state.lat,
        lng: state.lng,
        gender: state.gender
    }))
}));
export { useSubmission };
