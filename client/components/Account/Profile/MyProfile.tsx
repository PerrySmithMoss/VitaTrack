import React, { useState } from 'react';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from '../../../graphql/generated/graphql';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { Avatar } from '../../Avatar/Avatar';

interface MyProfileProps {}

const createUserSchema = object({
  password: string(),
  email: string({
    required_error: 'Email is required',
  })
    .email('Not a valid email')
    .min(5, {
      message: 'Email is required',
    })
    .max(256, {
      message: 'Email address must be 256 characters or less.',
    })
    .refine(
      (val) => /^\S+$/.test(val),
      () => ({
        message: `Email must not include white space. Please remove any whitespace.`,
      })
    ),
  username: string({ required_error: 'Username is required' })
    .min(1, {
      message: 'Username too short - should be 1 character minimum',
    })
    .max(100, {
      message: 'Username must be 100 characters or less.',
    }),
  gender: string({ required_error: 'Gender is required' }),
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

export const MyProfile: React.FC<MyProfileProps> = () => {
  const { data, refetch: refetchUser } = useGetCurrentUserQuery();
  const { mutate: updateUser } = useUpdateUserMutation({
    onSuccess: () => {
      refetchUser();
    },
  });
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(values: CreateUserInput) {
    try {
      updateUser(values);

      // if (userRes.errors.length > 0) {
      //   setRegisterError(userJson.errors[0].message);
      // } else {
      //   refetchUser();
      // }
    } catch (e: any) {
      console.log(e);
      setRegisterError(e.message);
    }
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl xs:text-3xl font-bold text-[#2b3042]">
            Edit Profile
          </h2>
        </div>
      </div>
      <div className="flex items-center space-x-10">
        <div className="flex rounded-lg mt-8">
          <div className="relative rounded-full">
            <Avatar
              avatarUrl={data?.getCurrentUser?.data?.profile?.avatar}
              alt="Avatar"
              height={85}
              width={85}
              className={`rounded-full relative`}
            />
            {/* <div
              style={{ transform: 'translate(50%, 0%)' }}
              className=" cursor-pointer top-2 right-1.5 absolute rounded-full"
            >
              <div
                //   onClick={() => setIsUpdateUserAvatarModalOpen(true)}
                aria-label="Update Profile Avatar"
                role="button"
                // className="h-10 w-10 bg-gray-300 hover:bg-gray-400 flex justify-center rounded-full text-center items-center"
                className="h-10 w-10 bg-gray-300 flex justify-center rounded-full text-center items-center"
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  className="block mb-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 487 487"
                  fill="#050505"
                  height={18}
                  width={18}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
			 M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
			v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
			 M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
			 M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"
                      />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3 mb-5 ">
          <label
            htmlFor="name"
            className="text-gray-800 font-medium leading-tight tracking-normal"
          >
            Username
          </label>
          <input
            type="text"
            aria-label="Username"
            autoComplete="new-username"
            autoCorrect="off"
            autoCapitalize="off"
            autoSave="off"
            {...register('username')}
            defaultValue={data?.getCurrentUser?.data?.username}
            className="block w-full mb-1 max-w-[300px]  px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-brand-green focus:ring-brand-green focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Enter your username"
          />
          <p className="text-red-400 font-bold text-sm">
            {errors.username?.message}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-gray-800 font-medium leading-tight tracking-normal"
          >
            Gender
          </label>
          <select
            {...register('gender')}
            autoComplete="new-gender"
            autoCorrect="off"
            autoCapitalize="off"
            autoSave="off"
            defaultValue={data?.getCurrentUser?.data?.gender}
            aria-label="Gender"
            className="block mb-1 w-full max-w-[300px]  px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-brand-green focus:ring-brand-green focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <p className="text-red-400 font-bold text-sm">
            {errors.gender?.message}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-gray-800 font-medium leading-tight tracking-normal"
          >
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            defaultValue={data?.getCurrentUser?.data?.email}
            autoComplete="new-email"
            autoCorrect="off"
            autoCapitalize="off"
            autoSave="off"
            aria-label="Email address"
            className="block mb-1 w-full max-w-[300px]  px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-brand-green focus:ring-brand-green focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Enter your email"
          />
          <p className="text-red-400 font-bold text-sm">
            {errors.email?.message}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-gray-800 font-medium leading-tight tracking-normal"
          >
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            autoSave="off"
            aria-label="Password"
            className="block mb-1 w-full max-w-[300px] px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-brand-green focus:ring-brand-green focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Enter a new password"
          />
          <p className="text-red-400 font-bold text-sm">
            {errors.password?.message}
          </p>
        </div>
        {registerError && (
          <p className="mt-2 text-red-400 font-bold">{registerError}</p>
        )}
        <div className="mt-5">
          <button
            type="submit"
            className="px-12 py-2 tracking-wide text-white transition-colors duration-200 transform bg-brand-green hover:bg-brand-green-hover rounded-md focus:outline-none focus:bg-brand-green-hover focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
