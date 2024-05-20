'use client';

import { useRef, useState, useEffect } from 'react';
import { PiFilePdf, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Upload from '@/components/ui/upload';
import SimpleBar from 'simplebar-react';
import { CreateJobInput, createJobSchema } from '@/utils/validators/create-job.schema';
import { useQueryClient } from '@tanstack/react-query';
import { jobQueryKey } from '.';
import { jobPostingSchema } from '@/utils/validators/job-posting.schema';
import { addJob, updateJob } from '../../../../../../services/jobPostingService'


export default function CreateJob({ onClose, jobList }) {
  console.log("job details", jobList)
  // const defaultValues: Omit<
  //   jobPostingSchema,
  //   'job'
  // > & {
  //   job_id: string,
  //   title: string,
  //   description: string,
  //   company: string,
  //   location: string,
  //   salary: string
  // } = {
  //   job_id: '',
  //   title: '',
  //   description: '',
  //   company: '',
  //   location: '',
  //   salary: ''
  // };

  const defaultValues = {
    job_id: jobList?.job_id || '',
    title: jobList?.title || '',
    description: jobList?.description || '',
    company: jobList?.company || undefined,
    location: jobList?.location || '',
    salary: jobList?.salary || undefined,
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

  const generateJobId = () => {
    let data = '#jobId' + (Math.floor(Math.random() * 10) + 1);
    return data;
  }
  const onSubmit: SubmitHandler<jobPostingSchema> = async (data: any) => {
    setLoading(true);
    console.log(data);
    const id = generateJobId();
    const formData = new FormData();
    formData.append('job_id', id);
    formData.append('title', data.title);
    formData.append('company', data.company);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('salary', data.salary);
    if (jobList) {
      try {
        const response = await updateJob(jobList.id, formData);
        if (response) {
          setLoading(false);
          console.log("update job", response)
          closeModal();
          onClose();
        }

      } catch (error) {

      }
    }
    else {
      try {
        const response = await addJob(formData);
        if (response) {
          setLoading(false);
          console.log("add job", response)
          closeModal();
          onClose();
        }

      } catch (error) {
        setLoading(false);
        console.log("error", error)
      }
    }


  };
  return (
    <Form<jobPostingSchema>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={jobPostingSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {jobList ? 'Update Job' : 'Add Job'}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            {/* <Input
              label="Job Id"
              placeholder="Enter Job Id"
              {...register('jobName')}
              className="col-span-full"
              error={errors.jobName?.message}
            /> */}
            <Input
              label="Job Title"
              placeholder="Enter Job Title"
              {...register('title')}
              defaultValue={defaultValues.title}
              className="col-span-full"
              error={errors.title?.message}
            />

            <Input
              label="Company"
              placeholder="Enter Company Name"
              {...register('company')}
              defaultValue={defaultValues.company}
              className="col-span-full"
              error={errors.company?.message}
            />


            <Input
              label="Salary"
              placeholder="Enter Company Name"
              {...register('salary')}
              defaultValue={defaultValues.salary}
              className="col-span-full"
              error={errors.salary?.message}
            />

            <Input
              label="Location"
              placeholder="Enter Location"
              className="col-span-full"
              {...register('location')}
              defaultValue={defaultValues.location}
              error={errors.location?.message}
            />

            <Input
              label="Job Description"
              className="col-span-full "
              type="text"
              id="textbox"
              {...register('description')}
              defaultValue={defaultValues.description}
              placeholder="Description Type here..."
              style={{ height: '100px' }} // Set the height here
            />
            {/* <Controller
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
            /> */}

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
                {jobList ? 'Update Job' : 'Add Job'}
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
