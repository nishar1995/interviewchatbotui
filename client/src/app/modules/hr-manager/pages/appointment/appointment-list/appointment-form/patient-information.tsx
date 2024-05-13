'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActionIcon, Input, Text, Title } from 'rizzui';
import Footer from './footer';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-list/appointment-form';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import {  useState } from 'react';

export const appointmentPatientInfoSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  email: z.string({ required_error: 'This email is required' }).email(),
  phone: z.string().optional(),
});

// generate form types from zod validation schema
export type PropertyTypeSchema = z.infer<typeof appointmentPatientInfoSchema>;

const FormSchema = appointmentPatientInfoSchema;

type FormSchemaType = z.infer<typeof FormSchema>;

export default function PatientInformation() {
  const [_, setLoading] = useState(false);

  const { setStep } = useStepperAppointment();
  const { closeModal } = useModal();
  const [formData, setFormData] = useAtom(formDataAtom);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log('data', data);
    setTimeout(() => {
      setLoading(true);
      setFormData((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
        phone: data.phone,
      }));
      toast.success(
        // <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
        <Text as="b">Appointment successfully created</Text>
      );
      setStep(0);
    }, 600);
    console.log('FormData', formData);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between border-b border-gray-200 p-5 md:p-7">
        <Title as="h2" className="font-lexend text-lg font-semibold">
          Book an appointment
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <Input
          type="text"
          labelClassName="font-medium text-gray-1000 dark:text-white"
          label="Your Name"
          placeholder="Enter your name"
          className="col-span-2"
          {...register('name')}
          error={errors.name?.message as string}
        />
        <Input
          type="email"
          labelClassName="font-medium text-gray-1000 dark:text-white"
          label="Email"
          placeholder="Enter your email"
          className="col-span-2"
          {...register('email')}
          error={errors.email?.message as string}
        />
        <Input
          type="text"
          labelClassName="font-medium text-gray-1000 dark:text-white"
          label="Phone"
          placeholder="Enter your number"
          className="col-span-2"
          {...register('phone')}
          error={errors.phone?.message as string}
        />
      </div>
      <Footer />
    </form>
  );
}
