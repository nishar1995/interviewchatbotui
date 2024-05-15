'use client';

import { useRef, useState, useEffect } from 'react';
import { PiFilePdf, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Upload from '@/components/ui/upload';
import SimpleBar from 'simplebar-react';

import { useQueryClient } from '@tanstack/react-query';
import { applicationQueryKey } from '.';
import { candidateSchema } from '@/utils/validators/candidate.schema'
import { addCandidate } from '@/services/candidateService';
import { CreateApplicationInput } from '@/utils/validators/create-application.schema';
import { getJobList } from '../../../../../../services/jobPostingService'




export default function CreateApplication({ onClose }) {

  const defaultValues: Omit<
    candidateSchema,
    'candidate'
  > & {
    name: string,
    job_id: string,
    resume: string,
    username: string,
    email: string,
    phone_number: string,
    application_id: string
    // role: string,
  } = {
    name: '',
    job_id: '',
    resume: '',
    username: '',
    email: '',
    phone_number: '',
    application_id: ''
    // role: '1',
  };
  // const queryClient = useQueryClient();
  // const { closeModal } = useModal();
  // const [reset, setReset] = useState(defaultValues);
  // const [isLoading, setLoading] = useState(false);

  // const imageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  useEffect(() => {
    jobList();
  }, []);

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
  const generateApplicationId = () => {
    let data = '#AiInfox' + (Math.floor(Math.random() * 10) + 1);
    return data;
  }
  const onSubmit: SubmitHandler<CreateApplicationInput> = async (data: any) => {
    console.log("add candidate ", data)
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    let id = generateApplicationId();
    data.application_id = id;
    console.log('aPPlication _id.....',data.application_id)
    //formData.append('application_id', id);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === 'resume' && data[key]) {
          formData.append('resume', data.resume[0]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    console.log(formData.get('resume'))
    try {
      const response = await addCandidate(formData);
      console.log("add candidate", response);
      if (response) {
        queryClient.invalidateQueries({ queryKey: [applicationQueryKey] });
        closeModal();
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    };
  };

  const onChangeJob = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("selected job value", event.target.value);
    setSelectedJobId(event.target.value);
    console.log("selected job id", selectedJobId)
  };

  return (
    <Form<CreateApplicationInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={candidateSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add Candidate
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Candidate Name"
              placeholder="Enter Candidate's full name"
              {...register('name')}
              className="col-span-full"
              error={errors.name?.message}
            />

            {/* <Input
              label="Job"
              placeholder="Enter Job id"
              className="col-span-full"
              {...register('job_id')}
              error={errors.job_id?.message}
            /> */}
            <select
              id="job-select"
              className="col-span-full"
              {...register('job_id')}
              onChange={onChangeJob}
            >
              <option value="">Select a job</option>
              {data.map((job: any) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
            <Input
              label="User Name"
              placeholder="Enter username"
              {...register('username')}
              className="col-span-full"
              error={errors.username?.message}
            />

            <Input
              label="Email"
              placeholder="Enter candidate email"
              {...register('email')}
              className="col-span-full"
              error={errors.email?.message}
            />
            <Input
              label="Contact No."
              placeholder="Enter contact no."
              {...register('phone_number')}
              className="col-span-full"
              error={errors.phone_number?.message}
            />

            <Input
              label="Meeting Schedule"
              placeholder="Enter Meeting Schedule"
              className="col-span-full"
              {...register('meetingSchedule')}
              error={errors.meetingSchedule?.message}
            />
            <Controller
              name="resume"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <div className="col-span-full">
                  <Upload
                    label={'Upload Resume'}
                    ref={imageRef}
                    accept={'pdf'}
                    multiple={false}
                    onChange={(event) => {
                      console.log(event)
                      const uploadedFiles = (event.target as HTMLInputElement)
                        .files;
                      const newFiles = Object.entries(uploadedFiles as object)
                        .map((file) => {
                          if (file[1]) return file[1];
                        })
                        .filter((file) => file !== undefined);
                      onChange(newFiles);
                    }}
                    className="mb-6 min-h-[280px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
                  />
                  {value?.length > 1 ? (
                    <Text className="mb-2 text-gray-500">
                      {value?.length} files
                    </Text>
                  ) : null}

                  {value?.length > 0 && (
                    <SimpleBar className="max-h-[280px]">
                      <div className="grid grid-cols-1 gap-4">
                        {value?.map((file: File, index: number) => (
                          <div
                            className="flex min-h-[58px] w-full items-center rounded-xl border border-muted px-3 dark:border-gray-300"
                            key={file.name}
                          >
                            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-muted bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
                              <PiFilePdf className="h-5 w-5" />
                            </div>
                            <div className="truncate px-2.5">{file.name}</div>
                          </div>
                        ))}
                      </div>
                    </SimpleBar>
                  )}
                </div>
              )}
            />

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
                Add Candidate
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
