'use client'
import { apiFetch } from '@/config/apiConfig'
import React, { useEffect, useState } from 'react'

type Props = {}

type AddressResponse = {
    id: string,
    first_name: string,
    last_name: string,
    coordinate_mobile: string | number,
    coordinate_phone_number: string | number,
    gender: 'male' | 'female',
    address: string,
    address_id: string,
    region: any,
    lat: number,
    lng: number
}

const fakeAddressList: Array<AddressResponse> = [{
    first_name: 'amir',
    last_name: 'Es',
    coordinate_mobile: '09023334455',
    coordinate_phone_number: '02134567890',
    gender: 'male',
    address: 'لورم ایپسوم متن ساختگی با تولید سادگی ',
    id: '',
    address_id: '',
    region: undefined,
    lat: 0,
    lng: 0
},
{
    first_name: 'amir1',
    last_name: 'Es1',
    coordinate_mobile: '09023334455',
    coordinate_phone_number: '02134567890',
    gender: 'male',
    address: 'لورم ایپسوم متن ساختگی با تولید سادگی ',
    id: '',
    address_id: '',
    region: undefined,
    lat: 0,
    lng: 0
}]

const AddressList = (props: Props) => {

  const [addresses, setAddresses] = useState<AddressResponse[]>(fakeAddressList)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    apiFetch<AddressResponse[]>('', {
        method: 'GET'
    }).then((res) => {
        setAddresses(res ? res : fakeAddressList)
        setLoading(false)
    }).finally(() => {
        setLoading(false)
    })
  },[])

  return (
    <div>
        <div className='w-full h-auto flex flex-col gap-4'>

            {((): any => {
                if (loading) {
                    return <h1 className='text-black mx-auto'>Loading ...</h1>
                } 
                return addresses.map((address, index) => {
                    return (
                        <div dir='rtl' key={index} className='w-full h-auto rounded-sm shadow py-4 px-12 bg-white'>
                            <div className='w-full min-h-[200px] grid grid-cols-2 lg:grid-cols-3'>
                                <div className='col-span-1 flex flex-col items-start gap-2'>
                                    <p className='font-vazir font-medium text-sm text-[#9b9ea0]'>نام</p>
                                    <p className='font-vazir font-medium text-sm text-black'>{address.first_name}</p>
                                </div>
                                <div className='col-span-1 flex flex-col items-start gap-2'>
                                    <p className='font-vazir font-medium text-sm text-[#9b9ea0]'>نام خانوادگی</p>
                                    <p className='font-vazir font-medium text-sm text-black'>{address.last_name}</p>
                                </div>
                                <div className='col-span-1 flex flex-col items-start gap-2'>
                                    <p className='font-vazir font-medium text-sm text-[#9b9ea0]'>شماره تلفن همراه</p>
                                    <p className='font-vazir font-medium text-sm text-black'>{address.coordinate_mobile}</p>
                                </div>
                                <div className='col-span-1 flex flex-col items-start gap-2'>
                                    <p className='font-vazir font-medium text-sm text-[#9b9ea0]'>شماره تلفن ثابت</p>
                                    <p className='font-vazir font-medium text-sm text-black'>{address.coordinate_phone_number}</p>
                                </div>
                                <div className='col-span-1 flex flex-col items-start gap-2'>
                                    <p className='font-vazir font-medium text-sm text-[#9b9ea0]'>جنسیت</p>
                                    <p className='font-vazir font-medium text-sm text-black'>{address.gender}</p>
                                </div>
                                <div className='col-span-2 lg:col-span-1 flex flex-col items-start gap-2'>
                                    <p className='font-vazir font-medium text-sm text-[#9b9ea0]'>آدرس</p>
                                    <p className='font-vazir font-medium text-sm text-black'>{address.address}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            })()}

        </div>
    </div>
  )
}

export default AddressList