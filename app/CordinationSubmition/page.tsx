'use client'
import React from 'react'

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

type Props = {}

const page = (props: Props) => {
  return (
    <div className='w-full h-auto px-4 md:px-40 xl:px-72 py-12 flex flex-col gap-4 relative'>
        <MapView />
    </div>
  )
}

export default page