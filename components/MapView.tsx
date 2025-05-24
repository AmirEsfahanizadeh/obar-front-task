'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import '../leaflet/LeafletIcon.ts';
import Image from 'next/image';
import { useSubmission } from '@/stores/auth/store';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch } from '@/config/apiConfig';
import { redirect } from 'next/navigation';

const center = {
  lat: 35.6892,
  lng: 51.3890,
};

function DraggableMarker() {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const { 
    setCoards
   } = useSubmission();

   useEffect(() => {
    setCoards([center.lat, center.lng])
   },[])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          setCoards([newPos.lat, newPos.lng]);
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

export default function MapView() {
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm();

  const { 
    coards,
    first_name, 
    last_name,
    coordinate_mobile,
    coordinate_phone_number,
    address,
    region,
    lat,
    lng,
    gender
   } = useSubmission();

   useEffect(() => {
    useSubmission.setState({
      lat: coards[0],
      lng: coards[1]
    })
   },[coards])

  const onSubmit = async () => {
    await new Promise((res) => setTimeout(res, 1000));
    console.log('مختصات ارسال شد');
    console.log(
      first_name, 
      last_name,
      coordinate_mobile,
      coordinate_phone_number,
      address,
      region,
      lat,
      lng,
      gender
    )
    await apiFetch('', {
      method: 'POST',
      body: {
        first_name, 
        last_name,
        coordinate_mobile,
        coordinate_phone_number,
        address,
        region,
        lat,
        lng,
        gender
      },
    });
    redirect('/confirmation')
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Map Display */}
      <div className="h-auto w-full flex flex-col items-center justify-center gap-4">
        <div dir='rtl' className='w-[85%] flex justify-start items-center gap-1'>
          <div className='relative'>
            <Image
              className="object-cover"
              src={`/images/back.svg`}
              alt="back"
              width={20}
              height={20}
            />
          </div>
          <p className='font-vazir font-medium text-sm text-[#37474F]'>انتخاب آدرس</p>
        </div>
        <MapContainer center={center} zoom={13} style={{ height: '300px', width: '85%', zIndex: '-1' }}>
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker />
          <div className="w-auto h-auto absolute bottom-8 right-12 z-[999]">
            <Image
              className="object-cover"
              src={`/images/findLocation.svg`}
              alt="location_icon"
              width={50}
              height={50}
            />
          </div>
        </MapContainer>
      </div>

      {/* Submit Button */}
      <div className="bg-white w-full flex justify-center items-center absolute right-0 -bottom-[60px] py-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.97 }}
          className="w-11/12 md:w-1/2 lg:w-1/4 flex justify-center items-center gap-2 px-4 py-4 rounded-lg transition-all bg-[#00BFA5] text-white hover:shadow"
        >
          {isSubmitting && (
            <motion.svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
                className="opacity-75"
              />
            </motion.svg>
          )}
          {isSubmitting ? 'در حال ارسال...' : 'ارسال اطلاعات'}
        </motion.button>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitSuccessful && (
          <motion.p
            className="text-green-600 text-center text-sm mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            مشخصات با موفقیت ارسال شد!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
