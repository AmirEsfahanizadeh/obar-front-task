import NewAddressForm from '@/components/NewAddressForm'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='w-full h-auto px-4 md:px-40 xl:px-80 flex flex-col gap-4 py-8 relative'>
        <div className='w-full h-auto flex flex-row justify-end'>
            <p className='font-medium text-[#37474F] text-xl'>ثبت آدرس</p>
        </div>
        <div className='card-container w-full h-auto px-1 py-2 rounded shadow bg-white'>
            <NewAddressForm />
        </div>
    </div>
  )
}

export default page