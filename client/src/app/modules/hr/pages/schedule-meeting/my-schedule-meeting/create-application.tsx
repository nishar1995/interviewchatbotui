'use client';

import { useRef, useState, useEffect } from 'react';
import { PiFilePdf, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { DatePicker } from '@/components/ui/datepicker';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Upload from '@/components/ui/upload';
import SimpleBar from 'simplebar-react';
import Datepicker from "tailwind-datepicker-react"
import {
  CreateApplicationInput,
  createApplicationSchema,
} from '@/utils/validators/create-application.schema';
import { useQueryClient } from '@tanstack/react-query';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


import { meetingQueryKey } from '.';

import { getUsersList } from '../../../../../../services/userService';
import { CreateMeetingInput, createMeetingSchema } from '@/utils/validators/create-meeting.schema';
import { addMeeting } from '@/services/meetingScheduleService';
import TimePicker from 'react-time-picker';

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

// import {DateRangePicker} from "@nextui-org/react";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


export default function CreateMeeting({onClose}) {
  const defaultValues: Omit<
    CreateMeetingInput,
    'meetingSchedule'
  > & {
    tenant_id: string
    candidate_id: string,
    job_id: string,
    start_time: Date,
    end_time: Date,

  } = {
    tenant_id: '',
    candidate_id: '',
    job_id: '',
    start_time: new Date(),
    end_time: new Date(),
  };
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(defaultValues.end_time));


  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(defaultValues.start_time));

  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<CreateMeetingInput> = async (data: any) => {
    setLoading(true);
    console.log("create meeting", data);
    const formData = new FormData();
    formData.append('tenant_id',data.tenant_id);
    formData.append('candidate_id',data.candidate_id);
    formData.append('job_id',data.job_id);
    formData.append('start_time',data.start_time);
    formData.append('tenant_id',data.tenant_id);
    
    try {
      const response = await addMeeting(data);
      console.log(response);
      if (response) {
        closeModal();
        onClose();
      }
    } catch (error) {
      console.log("errorr.....", error);
      setLoading(true);
    }

    // set timeout ony required to display loading state of the create category button
    // const formattedData = {
    //   ...data,
    //   createdAt: new Date(),
    // };

    // console.log(data);
    // const formData = new FormData();
    // for (const key in data) {
    //   if (data.hasOwnProperty(key)) {
    //     if (key === 'candidateFiles' && data[key]) {
    //       // data[key].forEach((file: any, index: any) => {
    //       //   formData.append(`${key}[${index}]`, file);
    //       // });
    //       formData.append('candidateFiles', data.candidateFiles[0]);
    //     } else {
    //       formData.append(key, data[key]);
    //     }
    //   }
    // }

    // let uploadedFilePath = '';
    // console.log(formData);
    // formData.append('candidateFiles', uploadedFilePath);
    // fetch('http://127.0.0.1:5000/upload_application_data', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     // 'Content-Type': 'application/json',
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result);
    //     queryClient.invalidateQueries({ queryKey: [meetingQueryKey] });
    //     setLoading(false);
    //     setReset({
    //       ...defaultValues,
    //     });
    //     closeModal();
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     setLoading(false);
    //   });
    // setLoading(true);
    // setTimeout(() => {
    //   console.log('formattedData', formattedData);
    //   setLoading(false);
    //   setReset({
    //     ...defaultValues,
    //   });
    //   closeModal();
    //}, 600);
  };
  const handleStartTimeChange = (newValue:any) => {
    setStartTime(newValue);
    data.start_time = newValue.$d
    defaultValues.start_time =  data.start_time
   //console.log("select meeting",startTime);
    console.log("selec......", data.start_time);
    console.log("defaultValues.start_time",defaultValues.start_time)
  };

  const handleEndTimeChange = (newValue:any) => {
    setEndTime(newValue);
    data.end_time = newValue.$d
    defaultValues.end_time =  data.end_time
   //console.log("select meeting",startTime);
    console.log("selec......", data.end_time);
    console.log("defaultValues.start_time",defaultValues.end_time)
  };
  return (
    <Form<CreateMeetingInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createMeetingSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add Meeting
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Tenant Id"
              placeholder="Enter Tenant id"
              {...register('tenant_id')}
              className="col-span-full"
            //error={errors.candidateName?.message}
            />

            <Input
              label="Job Id"
              placeholder="Job Id"
              className="col-span-full"
              {...register('job_id')}
            //error={errors.job?.message}
            />

            <Input
              label="Candidate Id"
              placeholder="candidate id"
              className="col-span-full"
              {...register('candidate_id')}
            //error={errors.meetingSchedule?.message}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="Start Meeting Date">
                <MobileDateTimePicker defaultValue={startTime} onChange={handleStartTimeChange}
                />
              </DemoItem>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="End Meeting Date">
                <MobileDateTimePicker defaultValue={endTime} onChange={handleEndTimeChange}/>
              </DemoItem>
            </LocalizationProvider>
            <div className="col-span-full flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                Add Meeting
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
