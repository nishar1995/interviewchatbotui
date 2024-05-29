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
import { addMeeting, getMeetingScheduleList, updateMeeting } from '@/services/meetingScheduleService';
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
import moment from 'moment';
import React from 'react';
import { getJobList } from '@/services/jobPostingService';
import { candidateList } from '@/services/candidateService';

// import {DateRangePicker} from "@nextui-org/react";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


// const defaultValues = {
//   //tenant_id: meetingDetails?.tenant_id || '',
//   candidate_id: meetingDetails?.candidate_id || '',
//   job_id: meetingDetails?.job_id || '',
//   start_time: meetingDetails?.start_time ? moment(meetingDetails?.start_time).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : new Date(),
//   end_time: meetingDetails?.end_time ? moment(meetingDetails?.end_time).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : new Date(),
// }
export default function CreateMeeting({ onClose, meetingDetails }: any) {
  console.log("meeting details", meetingDetails)
  const defaultValues: Omit<
    CreateMeetingInput,
    'meetingSchedule'
  > & {

    candidate: string,
    job: string,
    start_time: Date,
    end_time: Date,
    agenda: string,
    topic: string

  } = {

    candidate: meetingDetails?.candidate ?? '', // Pre-fill candidate if available
    job: meetingDetails?.job ?? '',
    start_time: new Date(),
    end_time: new Date(),
    // start_time: meetingDetails?.start_time ? new Date(meetingDetails.start_time) : new Date(),
    // end_time: meetingDetails?.end_time ? new Date(meetingDetails.end_time) : new Date(),
    agenda: meetingDetails?.agenda ?? '',
    topic: meetingDetails?.topic ?? ''
  };

  console.log("start time", defaultValues)
  //console.log("convert start time", dayjs(defaultValues.start_time));
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [candidatedata, setCandidateData] = useState<any>([]);
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>('' || meetingDetails?.candidate);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('' || meetingDetails?.candidate);
  const [shouldShowPicker, setShouldShowPicker] = useState(true);

  const today = dayjs();
  const [errorMessage, setErrorMessage] = useState('');
  var newStartTime: any;
  const [isShowPicker, setIsShowPicker] = useState(true);
  //const [startTime, setValue] = React.useState<Dayjs | null>(dayjs(moment(defaultValues.start_time).toISOString()));
  //const [endTime, setEndValue] = React.useState<Dayjs | null>(dayjs(moment(defaultValues.end_time).toISOString()));
  // const [startTime, setStartTime] = useState<any>(meetingDetails ? new Date(meetingDetails.start_time) : null);
  // const [endTime, setEndTime] = useState<any>(meetingDetails ? new Date(meetingDetails.start_time) : null);


  useEffect(() => {
    jobList();
    fetchCandidateList();
  }, []);

  useEffect(() => {
    if (meetingDetails) {
      setIsShowPicker(false);
      fetchCandidateList();
      setSelectedJobId(meetingDetails.job);
      setSelectedCandidateId(meetingDetails?.candidate);
      // setStartTime(new Date(meetingDetails.start_time));
      // setEndTime(new Date(meetingDetails.end_time));
      console.log("select candidate", selectedCandidateId);
      console.log("select job", selectedJobId);
    }
  }, [meetingDetails]);

  const jobList = async () => {
    try {
      const response = await getJobList()
      console.log("job lis", response.data)
      if (response) {
        setData(response.data)
        console.log("data....", data)
      }
    } catch (error) {
      console.log("error", error)
    }

  }



  const fetchCandidateList = async () => {
    const response = await candidateList();
    console.log("fetch candidate list", response);
    setCandidateData(response.data)
  }


  const onSubmit: SubmitHandler<CreateMeetingInput> = async (data: any) => {
    setLoading(true);
    console.log("data////,data", data);
    console.log("data////,data.........", data)
    // let startMeeting = defaultValues.start_time;
    // let endMeeting = defaultValues.end_time;

    // console.log("default1.........", defaultValues.start_time)
    // console.log("default2.........", defaultValues.end_time)
    // console.log("strat meeting.........", startMeeting)
    // console.log("strat meeting.........", endMeeting)
    data.start_time = moment(newStartTime).format('YYYY-MM-DDTHH:mm');
    //data.end_time = moment(endMeeting).format('YYYY-MM-DDTHH:mm')
    console.log("create meeting", data.start_time);
    const formData = new FormData();
    //formData.append('tenant_id', data.tenant_id);
    formData.append('candidate', data.candidate);
    formData.append('job', data.job);
    formData.append('start_time', data.start_time);
    //formData.append('end_time', data.end_time);
    formData.append('agenda', data.agenda);
    formData.append('topic', data.topic);
    //formData.append('tenant_id', data.tenant_id);
    if (meetingDetails) {
      try {
        const response = await updateMeeting(meetingDetails.id, formData);
        console.log(response);
        if (response) {
          closeModal();
          onClose();
        }
      } catch (error) {
        console.log("errorr.....", error);
        setLoading(true);
      }
    }
    else {
      try {
        const response = await addMeeting(formData);
        console.log(response);
        if (response) {
          closeModal();
          onClose();
        }
      } catch (error) {
        console.log("errorr.....", error);
        setLoading(true);
      }
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
  const handleStartTimeChange = (newValue: any) => {
    console.log("new value", newValue.$d);
    data.start_time = newValue.$d;
    console.log("start", data.start_time);
    defaultValues.start_time = newValue.$d;
    newStartTime = newValue.$d;
    console.log("newStartTime.......", newStartTime)
    //setStartTime(newStartTime);


  };

  const handleEndTimeChange = (newValue: any) => {
    console.log("new value", newValue.$d);
    data.end_time = newValue.$d;
    defaultValues.end_time = newValue.$d;
    console.log("default end time", defaultValues.end_time)
    console.log('end', data.end_time)
    const newEndTime = newValue.$d;
    //setEndTime(newEndTime);


  }

  // const handleEndTimeAccept = (newValue: any) => {
  //   const newEndTime = newValue.$d;
  //   if (startTime && newEndTime < startTime) {
  //     setErrorMessage('Please choose a correct time');
  //   } else {
  //     setErrorMessage('');
  //   }
  // };

  //   const handleEndTimeAccept = (newValue: any) => {
  //     const newEndTime = newValue.$d;
  //     const now = dayjs();

  //     if (newEndTime < now) {
  //         setErrorMessage('End time cannot be in the past');
  //     } else if (startTime && newEndTime < startTime) {
  //         setErrorMessage('End time cannot be earlier than start time');
  //     } else {
  //         setErrorMessage('');
  //     }
  // };

  const onChangeJob = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("selected job value", event.target.value);
    setSelectedJobId(event.target.value);
    filterCandidatesByJobId(selectedJobId);
    console.log("selected job id", selectedJobId)
  };

  const onChangeCandidate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const candidateId = event.target.value;
    console.log("selected candidate value", candidateId);
    setSelectedCandidateId(candidateId); // Set the selected candidate ID
  };


  const filterCandidatesByJobId = (jobId: any) => {
    if (jobId) {
      const filtered = candidatedata.filter((candidate: any) => (candidate.job_id) === String(jobId));
      setFilteredCandidates(filtered);
      console.log("filter data", filtered)
    } else {
      setFilteredCandidates([]);
    }
  };

  useEffect(() => {
    filterCandidatesByJobId(selectedJobId);
  }, [selectedJobId, candidatedata]);

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
                {meetingDetails ? 'Update Meeting' : 'Add Meeting'}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>

            </div>
            <select
              id="job-select"
              className="col-span-full"
              {...register('job')}
              value={selectedJobId}
              onChange={onChangeJob}

            >
              <option value="">Select a job</option>
              {data.map((job: any) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}

            </select>

            <select
              id="candidate-select"
              className="col-span-full"
              {...register('candidate')}
              value={selectedCandidateId}
              onChange={onChangeCandidate}

            >
              <option value="">Select a candidate</option>
              {filteredCandidates.map((candidate: any) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}

            </select>


            <Input
              label="Topic"
              placeholder="Enter topic"
              {...register('topic')}
              defaultValue={defaultValues.topic}
              className="col-span-full"
              error={errors.topic?.message}
            />
            <Input
              label="Agenda"
              placeholder="Enter agenda"
              {...register('agenda')}
              defaultValue={defaultValues.agenda}
              className="col-span-full"
              error={errors.agenda?.message}
            />
            {/* defaultValue={dayjs(defaultValues.start_time)} */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {isShowPicker && (
                <DemoItem label="Start Meeting Date">
                  <MobileDateTimePicker
                    className="col-span-full"
                    onChange={(newValue) => handleStartTimeChange(newValue)}
                    minDate={today}
                  //defaultValue={dayjs(defaultValues?.start_time)}
                  //defaultValue={defaultValues.end_time ? dayjs(defaultValues.end_time) : undefined} 
                  />
                </DemoItem>
              )}
            </LocalizationProvider>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem label="End Meeting Date">
                <MobileDateTimePicker
                  onChange={handleEndTimeChange}
                  minDate={today}
                />
              </DemoItem>
            </LocalizationProvider> */}
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
                {meetingDetails ? 'Update Meeting' : 'Add Meeting'}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
