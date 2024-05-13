'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ActionIcon,
  AdvancedRadio,
  RadioGroup,
  Text,
  Title,
  FieldError,
} from 'rizzui';
import Footer from './footer';
import ScheduleLightIcon from '@/components/icons/schedule-light';
import Calendar from 'react-calendar';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-list/appointment-form';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import SimpleBar from 'simplebar-react';
import cn from '@/utils/class-names';

export const appointmentDataSchema = z.object({
  date: z.date().refine((value) => value !== null, 'Please select a date'),
  time: z.string().min(1, 'Time is required'),
});

const appointmentTimes = [
  {
    value: '10.00 AM',
    label: '10.00 AM',
  },
  {
    value: '10.30 AM',
    label: '10.30 AM',
  },
  {
    value: '11.00 AM',
    label: '11.00 AM',
  },
  {
    value: '11.30 AM',
    label: '11.30 AM',
  },
  {
    value: '12.00 PM',
    label: '12.00 PM',
  },
  {
    value: '12.30 PM',
    label: '12.30 PM',
  },
  {
    value: '01.00 PM',
    label: '01.00 PM',
  },
  {
    value: '01.30 PM',
    label: '01.30 PM',
  },
  {
    value: '02.00 PM',
    label: '02.00 PM',
  },
  {
    value: '02.30 PM',
    label: '02.30 PM',
  },
  {
    value: '03.00 PM',
    label: '03.00 PM',
  },
  {
    value: '03.30 PM',
    label: '03.30 PM',
  },
  {
    value: '04.00 PM',
    label: '04.00 PM',
  },
  {
    value: '04.30 PM',
    label: '04.30 PM',
  },
  {
    value: '05.00 PM',
    label: '05.00 PM',
  },
  {
    value: '05.30 PM',
    label: '05.30 PM',
  },
  {
    value: '06.00 PM',
    label: '06.00 PM',
  },
  {
    value: '06.30 PM',
    label: '06.30 PM',
  },
  {
    value: '07.00 PM',
    label: '07.00 PM',
  },
];

// generate form types from zod validation schema

const FormSchema = appointmentDataSchema;

type FormSchemaType = z.infer<typeof FormSchema>;

export default function DateTime() {
  const { gotoNextStep } = useStepperAppointment();
  const [formData, setFormData] = useAtom(formDataAtom);
  const { closeModal } = useModal();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: formData.date,
      time: formData.time,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      date: data.date,
      time: data.time,
    }));
    gotoNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <ActionIcon
        size="sm"
        variant="text"
        onClick={() => closeModal()}
        className="absolute end-3.5 top-3.5 p-0 text-gray-500 hover:!text-gray-900 md:end-7 md:top-7"
      >
        <PiXBold className="h-5 w-5" />
      </ActionIcon>
      <div className=" mx-auto flex max-w-md flex-col items-center gap-2.5 px-5 pb-7 pt-8 text-center md:px-7 md:pb-10 md:pt-12">
        <ScheduleLightIcon className="w-12 text-gray-400" />
        <Title
          as="h3"
          className="text-lg font-semibold text-gray-900 md:text-2xl"
        >
          Book an Appointment
        </Title>
        <Text className="leading-relaxed text-gray-500 md:pt-0.5">
          By becoming a part of our platform, you are opening the door to a
          world of incredible opportunities:
        </Text>
      </div>
      <div className="px-5 pb-5 md:px-7 md:pb-7">
        <div className="flex flex-col rounded-lg border border-gray-300 md:flex-row">
          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <Calendar
                onChange={onChange}
                value={value}
                prev2Label={false}
                next2Label={false}
                className="!w-full !border-0 !bg-transparent px-4 pb-4 pt-2.5 !font-inter !text-base md:px-5 md:pb-5"
              />
            )}
          />
          <div className="w-full shrink-0 border-gray-300 md:w-72 md:border-s">
            <Title
              as="h4"
              className="px-5 pb-3 pt-2 text-base font-semibold text-gray-800 md:pt-5"
            >
              Time
            </Title>
            <SimpleBar className="mb-5 h-[280px] px-5">
              <Controller
                control={control}
                name="time"
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    value={value}
                    setValue={onChange}
                    className="space-y-2"
                  >
                    {appointmentTimes.map((item) => (
                      <AdvancedRadio
                        key={item.label}
                        name="time"
                        value={item.value}
                        checked={item.value === value}
                        className="[&_.rizzui-advanced-radio-input:checked+span]:ring-[#2B7F75]"
                        contentClassName={cn(
                          'bg-gray-100 text-gray-900 text-center',
                          item.value === value ? 'bg-[#2B7F75] text-white' : ''
                        )}
                      >
                        {item.label}
                      </AdvancedRadio>
                    ))}
                  </RadioGroup>
                )}
              />
            </SimpleBar>
            {errors.time && (
              <FieldError error={errors.time?.message} className="px-5 pb-5" />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </form>
  );
}
