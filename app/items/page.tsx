import AddressList from '@/components/addresses'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='w-full h-auto px-4 md:px-40 xl:px-72 py-12 flex flex-col gap-4 relative'>
        <div className="h-auto w-full flex flex-col items-center justify-center gap-4">
          <div dir='rtl' className='w-full flex justify-start items-center gap-1'>
            <p className='font-vazir font-medium text-lg text-[#37474F]'>آدرس ها و مشخصات</p>
          </div>


          <div className='w-full h-auto'>
            <AddressList />
          </div>


        </div>
    </div>
  )
}

export default page