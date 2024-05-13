'use client';

import { useRef, useState } from 'react';
import { PiFilePdf, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Upload from '@/components/ui/upload';
import SimpleBar from 'simplebar-react';
import { CreateJobInput, createJobSchema } from '@/utils/validators/create-job.schema';
import { useQueryClient } from '@tanstack/react-query';
import { jobQueryKey} from '.';
export default function CreateJob() {
  const defaultValues: Omit<
    CreateJobInput,
    'meetingSchedule' | 'dob'
  > & {
    meetingSchedule: Date | undefined;
    dob: Date | undefined;
  } = {
    jdFiles: [],
    jobName: '',
    meetingSchedule: undefined,
    dob: undefined,
    location: '',
  };
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);
  const uploadJobData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('jobId', 'job_id');
      formData.append('jobName', 'job_name');
      // formData.append('job', 'job_title');
      formData.append('location', 'location');
      formData.append('jdFiles', 'job_description_file');
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        }
        // Include any necessary headers and body data
      });
      if (response.ok) {
        // Handle successful response
        console.log('Candidate added successfully');
      } else {
        // Handle error response
        console.error('Failed to add candidate');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
    }
    setLoading(false);
  };

  // Function to handle button click
  const handleAddCandidateClick = () => {
    uploadJobData();
  };
  const onSubmit: SubmitHandler<CreateJobInput> = async (data: any) => {
    setLoading(true);
    // set timeout ony required to display loading state of the create category button
    const formattedData = {
      ...data,
      createdAt: new Date(),
    };

    console.log(data);
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === 'jdFiles' && data[key]) {
          formData.append('jdFiles', data.jdFiles[0]);
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    let uploadedFilePath = '';

    console.log(formData);

    // try {
    //   const uploadJdData = new FormData();
    //   uploadJdData.set('file', data.jdFiles[0]);

    //   const res = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: uploadJdData,
    //   });
    //   const result = await res.json();
    //   if (typeof result === 'object' && result !== null && 'path' in result) {
    //     uploadedFilePath = result.path as string;
    //   }
    //   // handle the error
    //   if (!res.ok) throw new Error(await res.text());
    // } catch (e: any) {
    //   // Handle errors here
    //   console.error(e);
    // }
    formData.append('jdFiles', uploadedFilePath);
    fetch('http://127.0.0.1:5000/upload_job_data', {
      method: 'POST',
      body: formData,
      headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        queryClient.invalidateQueries({ queryKey: [jobQueryKey] });
        setLoading(false);
        setReset({
          ...defaultValues,
        });
        closeModal();
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
    setLoading(true);
    setTimeout(() => {
      console.log('formattedData', formattedData);
      setLoading(false);
      setReset({
        ...defaultValues,
      });
      closeModal();
    }, 600);
  };
  return (
    <Form<CreateJobInput>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createJobSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add Job
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              label="Job Name"
              placeholder="Enter Job name"
              {...register('jobName')}
              className="col-span-full"
              error={errors.jobName?.message}
            />

            <Input
              label="Location"
              placeholder="Enter Location"
              className="col-span-full"
              {...register('location')}
              error={errors.location?.message}
            />
            <Controller
              name="jdFiles"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <div className="col-span-full">
                  <Upload
                    label={'Upload JD'}
                    ref={imageRef}
                    accept={'pdf'}
                    multiple={false}
                    onChange={(event) => {
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
                Add Job
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
