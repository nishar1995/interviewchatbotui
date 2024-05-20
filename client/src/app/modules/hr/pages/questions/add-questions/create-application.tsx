'use client';

import { useRef, useState } from 'react';
import { PiFilePdf, PiXBold } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title, Select, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import Upload from '@/components/ui/upload';
import SimpleBar from 'simplebar-react';
import {
  CreateApplicationInput,
  createApplicationSchema,
} from '@/utils/validators/create-application.schema';
import { useQueryClient } from '@tanstack/react-query';

import { questionsQueryKey } from '.';
import { tenantQuestionsSchema } from '@/utils/validators/tenantQuestions.schema'
import { addQuestion } from '@/services/tenantQuestionsService';

export default function CreateQuestions({ onClose }:any) {
  const defaultValues: Omit<
    tenantQuestionsSchema,
    'questions'
  > & {
    question: string;
    answer: string;
    tenant_id: string;
    job_id: string;
  } = {
    question: '',
    answer: '',
    tenant_id: '',
    job_id: ''
  };
  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<tenantQuestionsSchema> = async (data: any) => {
    setLoading(true);
    try {
      const response = await addQuestion(data);
      if (response) {
        console.log(response);
        setReset({
          ...defaultValues,
        });
        closeModal();
        onClose();
      }
    } catch (error) {

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
    //     queryClient.invalidateQueries({ queryKey: [questionsQueryKey] });
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

  return (
    <Form<tenantQuestionsSchema>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={tenantQuestionsSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add Questions
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
              label="Question"
              placeholder="Enter Question"
              className="col-span-full"
              {...register('question')}
            //error={errors.meetingSchedule?.message}
            />

            <Input
              label="Answer"
              placeholder="Enter Answer"
              className="col-span-full"
              {...register('answer')}
            //error={errors.meetingSchedule?.message}
            />


            {/* <Controller
              name="candidateFiles"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <div className="col-span-full">
                  <Upload
                    label={'Upload Resume'}
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
                Add Questions
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
