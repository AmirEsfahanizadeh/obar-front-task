import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='w-full h-auto px-4 md:px-40 xl:px-72 py-40 flex flex-col gap-4 relative'>
        <div className='w-full h-auto flex flex-col items-center gap-4'>
            <div className='relative flex flex-col gap-2 items-center'>
                <Image
                  className="object-cover"
                  src={`/images/confirm.svg`}
                  alt="confirm"
                  width={70}
                  height={70}
                />
                <p className='font-vazir font-bold text-sm text-[#37474F]'>اطلاعات شما با موفقیت ثبت شد</p>
            </div>

            <Link href={`/items`}>
              <div className='w-[340px] h-[48px] rounded-[5px] border-[1.5px] border-[#00BFA5] bg-white flex items-center justify-center cursor-pointer'>
                <p className='font-vazir font-bold text-sm text-[#00BFA5]'>مشاهده اطلاعات</p>
              </div>
            </Link>
        </div>
    </div>
  )
}

export default page