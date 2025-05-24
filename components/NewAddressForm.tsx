'use client';

import { useForm, useFormState } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSubmission } from '@/stores/auth/store';
import { redirect } from 'next/navigation';

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  homePhone: string;
  address: string;
  gender: 'male' | 'female';
};

export default function PersianForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ mode: 'onChange' });

  const { setData, coards } = useSubmission()

  const { errors, isValid } = useFormState({ control });

  const onSubmit = async (data: FormValues) => {
    console.log('فرم ارسال شد:', data);
    useSubmission.setState({
      first_name: data.firstName,
      last_name: data.lastName,
      coordinate_mobile: data.phone,
      coordinate_phone_number: data.homePhone,
      address: data.address,
      lat: coards[0],
      lng: coards[1],
      gender: data.gender,
      region: 1
    })
    reset();
    redirect('/CordinationSubmition')
  };

  return (
    <motion.form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 mx-auto p-4 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* First Name */}
      <div className='col-span-3 lg:col-span-1 flex flex-col gap-1'>
        <label className="block text-sm font-medium text-gray-700">نام</label>
        <input
          {...register('firstName', { required: 'وارد کردن نام الزامی است' })}
          className="w-full border-gray-300 active:border-black p-2 border rounded-lg bg-white text-black"
        />
        <AnimatePresence>
          {errors.firstName && (
            <motion.p
              className="text-red-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors.firstName.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Last Name */}
      <div className='col-span-3 lg:col-span-1 flex flex-col gap-1'>
        <label className="block text-sm font-medium text-gray-700">نام خانوادگی</label>
        <input
          {...register('lastName', { required: 'وارد کردن نام خانوادگی الزامی است' })}
          className="w-full border-gray-300 active:border-black p-2 border rounded-lg bg-white text-black"
        />
        <AnimatePresence>
          {errors.lastName && (
            <motion.p className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {errors.lastName.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Phone */}
      <div className='col-span-3 lg:col-span-1 flex flex-col gap-1'>
        <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
        <input
          {...register('phone', {
            required: 'شماره موبایل الزامی است',
            pattern: {
              value: /^09\d{9}$/,
              message: 'شماره موبایل معتبر نیست',
            },
          })}
          className="w-full border-gray-300 active:border-black p-2 border rounded-lg bg-white text-black"
        />
        <AnimatePresence>
          {errors.phone && (
            <motion.p className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {errors.phone.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Home Phone */}
      <div className='col-span-3 lg:col-span-1 flex flex-col gap-1'>
        <label className="block text-sm font-medium text-gray-700">تلفن ثابت</label>
        <input
          {...register('homePhone')}
          className="w-full border-gray-300 active:border-black p-2 border rounded-lg bg-white text-black"
        />
      </div>

      {/* Address */}
      <div className='col-span-3 lg:col-span-2 flex flex-col gap-1'>
        <label className="block text-sm font-medium text-gray-700">آدرس</label>
        <input
            {...register('address')}
            className="border-gray-300 active:border-black p-2 border rounded-lg bg-white text-black w-full"
        />
      </div>

      {/* Gender (Radio) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">جنسیت</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="male"
              {...register('gender', { required: 'لطفاً جنسیت را انتخاب کنید' })}
              className="accent-brand"
            />
            <span>مرد</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="female"
              {...register('gender', { required: 'لطفاً جنسیت را انتخاب کنید' })}
              className="accent-brand"
            />
            <span>زن</span>
          </label>
        </div>
        <AnimatePresence>
          {errors.gender && (
            <motion.p className="text-red-500 text-sm mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {errors.gender.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      </div>

      {/* Submit Button */}
      {/* <Link href={`/CordinationSubmition`} onClick={() => onSubmit()}> */}
      <div className='bg-white col-span-3 flex justify-center items-center w-[100vw] absolute right-0 -bottom-20 py-4'>
        <motion.button
          type="submit"
          disabled={!isValid || isSubmitting}
          whileTap={{ scale: 0.97 }}
          className={`w-11/12 md:w-1/2 lg:w-1/4 flex justify-center items-center gap-2 px-4 py-4 rounded-lg transition-all bg-[#00BFA5] text-white hover:shadow
          }`}
        >
          {isSubmitting && (
            <motion.svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
            </motion.svg>
          )}
          {isSubmitting ? 'در حال برسی...' : 'مرحله بعدی'}
        </motion.button>
      </div>
      {/* </Link> */}

      {/* Success Message */}
      <AnimatePresence>
        {isSubmitSuccessful && (
          <motion.p
            className="text-green-600 text-center text-sm mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            مشخصات با موفقیت تکمیل شد!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
