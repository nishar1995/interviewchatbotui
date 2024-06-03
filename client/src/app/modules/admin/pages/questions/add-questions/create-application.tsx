'use client';

import { useEffect, useRef, useState } from 'react';
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
import { addQuestion, updateQuestions } from '@/services/tenantQuestionsService';
import { getJobList } from '@/services/jobPostingService';
import { candidateList } from '@/services/candidateService';

// export default function CreateQuestions({ onClose, questionsDetail }: any) {
//   console.log("questions detail", questionsDetail)
//   console.log("question tenat id ", questionsDetail?.tenant_id)
//   const defaultValues: Omit<
//     tenantQuestionsSchema,
//     'questions'
//   > & {
//     question: string;
//     answer: string;
//     candidate_id: string;
//     job_id: string;
//   } = {
//     question: '',
//     answer: '',
//     candidate_id: '',
//     job_id: ''
//   };


//   console.log("default...", defaultValues)
//   const queryClient = useQueryClient();
//   const { closeModal } = useModal();
//   const [reset, setReset] = useState(defaultValues);
//   const [isLoading, setLoading] = useState(false);
//   const [data, setData] = useState<any>([]);
//   const [candidatedata, setCandidateData] = useState<any>([]);
//   const [selectedJobId, setSelectedJobId] = useState<string>('');
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [selectedCandidateId, setSelectedCandidateId] = useState('');

//   const imageRef = useRef<HTMLInputElement>(null);


//   useEffect(() => {
//     jobList();
//     fetchCandidateList();
//     if (questionsDetail) {
//       getQuestionsDetails();
//     }
//   }, []);

//   const getQuestionsDetails = () => {
//     setReset({
//       question: questionsDetail?.question || '',
//       answer: questionsDetail?.answer || '',
//       candidate_id: questionsDetail?.candidate || '',
//       job_id: questionsDetail?.job || ''
//     })
//     setSelectedJobId(questionsDetail?.job);
//     setSelectedCandidateId(questionsDetail?.candidate);
//     console.log("selectedCandidateId", selectedCandidateId)

//   }

//   const jobList = async () => {
//     try {
//       const response = await getJobList()
//       console.log("job lis", response.data)
//       if (response) {
//         setData(response.data)
//         console.log("data....", data)
//       }
//     } catch (error) {
//       console.log("error", error)
//     }

//   }



//   const fetchCandidateList = async () => {
//     const response = await candidateList();
//     console.log("fetch candidate list", response);
//     setCandidateData(response.data)
//     filterCandidatesByJobId(selectedJobId);

//   }

//   const onChangeJob = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     console.log("selected job value", event.target.value);
//     setSelectedJobId(event.target.value);
//     //setSelectedCandidateId('')
//     filterCandidatesByJobId(selectedJobId);
//     console.log("selected job id", selectedJobId)
//   };

//   const onChangeCandidate = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const candidateId = event.target.value;
//     console.log("selected candidate value", candidateId);
//     setSelectedCandidateId(event.target.value);
//     //defaultValues.candidate = candidateId
//     //setValue('candidate', candidateId);

//   };

//   const filterCandidatesByJobId = (jobId: any) => {

//     const filtered = candidatedata.filter((candidate: any) => candidate.job_id === jobId);
//     setFilteredCandidates(filtered);
//     console.log("filter data", filtered)

//   };



//   useEffect(() => {
//     filterCandidatesByJobId(selectedJobId);
//   }, [selectedJobId, candidatedata]);

//   useEffect(() => {
//     if (selectedCandidateId) {
//       const filtered = filteredCandidates.filter((candidate: any) => candidate.id === selectedCandidateId);
//       setFilteredCandidates(filtered);
//     }
//   }, [selectedCandidateId]);
//   const onSubmit: SubmitHandler<tenantQuestionsSchema> = async (data: any) => {
//     setLoading(true);
//     if (questionsDetail) {
//       try {
//         const response = await updateQuestions(questionsDetail.id, data);
//         if (response) {
//           console.log("update", response);
//           setReset({
//             ...defaultValues,
//           });
//           setLoading(false)
//           closeModal();
//           onClose();
//         }
//       } catch (error) {
//         setLoading(false)
//       }
//     }
//     else {
//       try {
//         const response = await addQuestion(data);
//         if (response) {
//           console.log(response);
//           setReset({
//             ...defaultValues,
//           });
//           setLoading(false)
//           closeModal();
//           onClose();
//         }
//       } catch (error) {
//         setLoading(false)
//       }
//     }
//   };

//   return (
//     <Form<tenantQuestionsSchema>
//       resetValues={reset}
//       onSubmit={onSubmit}
//       validationSchema={tenantQuestionsSchema}
//       className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
//     >
//       {({ register, control, watch, formState: { errors } }) => {
//         return (
//           <>
//             <div className="col-span-full flex items-center justify-between">
//               <Title as="h4" className="font-semibold">
//                 {questionsDetail ? 'Update Questions' : 'Add Questions'}
//               </Title>
//               <ActionIcon size="sm" variant="text" onClick={closeModal}>
//                 <PiXBold className="h-auto w-5" />
//               </ActionIcon>
//             </div>

//             <select
//               id="job-select"
//               className="col-span-full"
//               {...register('job_id')}
//               value={selectedJobId}
//               //defaultValue={reset.job_id}
//               onChange={onChangeJob}

//             >
//               <option value="">Select a job</option>
//               {data.map((job: any) => (
//                 <option key={job.id} value={job.id}>
//                   {job.title}
//                 </option>
//               ))}

//             </select>

//             <select
//               id="candidate-select"
//               className="col-span-full"
//               {...register('candidate_id')}
//               value={selectedCandidateId}
//               // value={reset.candidate_id}
//               onChange={onChangeCandidate}
//             >
//               <option value="">Select a candidate</option>
//               {filteredCandidates.map((candidate: any) => (
//                 <option key={candidate.id} value={candidate.id}>
//                   {candidate.name}
//                 </option>
//               ))}

//             </select>

//             <textarea
//               //label="Question"
//               placeholder="Enter Question"
//               className="col-span-full"
//               defaultValue={defaultValues.question}
//               {...register('question')}

//             //error={errors.meetingSchedule?.message}
//             />

//             <Input
//               label="Answer"
//               placeholder="Enter Answer"
//               className="col-span-full"
//               defaultValue={defaultValues.answer}
//               {...register('answer')}
//             //error={errors.meetingSchedule?.message}
//             />
//             <div className="col-span-full flex items-center justify-end gap-4">
//               <Button
//                 variant="outline"
//                 onClick={closeModal}
//                 className="w-full @xl:w-auto"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 isLoading={isLoading}
//                 className="w-full @xl:w-auto"
//               >
//                 {questionsDetail ? 'Update Questions' : 'Add Questions'}
//               </Button>
//             </div>
//           </>
//         );
//       }}
//     </Form>
//   );
// }



export default function CreateQuestions({ onClose, questionsDetail }: any) {
  console.log('questions detail', questionsDetail);

  const defaultValues = {
    question: '',
    answer: '',
    candidate_id: '',
    job_id: ''
  };

  const queryClient = useQueryClient();
  const { closeModal } = useModal();
  const [reset, setReset] = useState(defaultValues);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [candidatedata, setCandidateData] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('' || questionsDetail?.job);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('' || questionsDetail?.candiate);

  const imageRef = useRef(null);

  useEffect(() => {
    jobList();
    fetchCandidateList();
    if (questionsDetail) {
      getQuestionsDetails();
    }
  }, [questionsDetail]);

  // useEffect(() => {
  //   if (selectedJobId) {
  //     let candidateId = questionsDetail?.candidate
  //     console.log("candidate list.....",data)
  //     const candidate = candidatedata.find((c:any) => c.selectedJobId === candidateId);
  //     console.log("candidate........",candidate)
  //     setFilteredCandidates(candidate ? [candidate] : []);
  //   }
  // }, [selectedCandidateId]);

  const getQuestionsDetails = () => {
    setReset({
      question: questionsDetail?.question || '',
      answer: questionsDetail?.answer || '',
      candidate_id: questionsDetail?.candidate || '',
      job_id: questionsDetail?.job || ''

    });
    setSelectedJobId(questionsDetail?.job || '');
    console.log("selected job",selectedJobId)
    setSelectedCandidateId(questionsDetail?.candidate || '');
    console.log("selected candidate",selectedCandidateId);
  };

  const jobList = async () => {
    try {
      const response = await getJobList();
      if (response) {
        setData(response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchCandidateList = async () => {
    try {
      const response = await candidateList();
      setCandidateData(response.data);
      //filterCandidatesByJobId(selectedJobId, response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onChangeJob = (event: any) => {
    const jobId = event.target.value;
    setSelectedJobId(jobId);
    filterCandidatesByJobId(jobId, candidatedata);
  };

  

  const onChangeCandidate = (event: any) => {
    setSelectedCandidateId(event.target.value);
  };

  const filterCandidatesByJobId = (jobId: any, candidateList: any) => {
    const filtered = candidateList.filter((candidate: any) => candidate.job_id === String(jobId));
    setFilteredCandidates(filtered);
  };

  // useEffect(() => {
  //   if (questionsDetail?.job) {
  //     setSelectedCandidateId(questionsDetail?.candidate);
  //     console.log("candidate data",candidatedata)
  //   }
  //   else{
  //     filterCandidatesByJobId(selectedJobId, candidatedata);
  //   }
    
  // }, [selectedJobId, candidatedata]);

  useEffect(() => {
    console.log("hr page...")
    if (questionsDetail?.job) {
      setSelectedCandidateId(questionsDetail?.candidate);
      console.log("candidate data",candidatedata)
      if(candidatedata){
        filterCandidatesByJobId(selectedJobId, candidatedata)

      }
    }
    else{
      filterCandidatesByJobId(selectedJobId, candidatedata);
    }
    
  }, [selectedJobId, candidatedata]);


  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (questionsDetail) {
        const response = await updateQuestions(questionsDetail.id, data);
        if (response) {
          setReset(defaultValues);
          setLoading(false);
          closeModal();
          onClose();
        }
      } else {
        const response = await addQuestion(data);
        if (response) {
          setReset(defaultValues);
          setLoading(false);
          closeModal();
          onClose();
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Form
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={tenantQuestionsSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, control, watch, formState: { errors } }) => (
        <>
          <div className="col-span-full flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              {questionsDetail ? 'Update Questions' : 'Add Questions'}
            </Title>
            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>

          <select
            id="job-select"
            className="col-span-full"
            {...register('job_id')}
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
            {...register('candidate_id')}
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

          <textarea
            placeholder="Enter Question"
            className="col-span-full"
            defaultValue={reset.question}
            {...register('question')}
          />

          <Input
            label="Answer"
            placeholder="Enter Answer"
            className="col-span-full"
            defaultValue={reset.answer}
            {...register('answer')}
          />
          <div className="col-span-full flex items-center justify-end gap-4">
            <Button variant="outline" onClick={closeModal} className="w-full @xl:w-auto">
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="w-full @xl:w-auto">
              {questionsDetail ? 'Update Questions' : 'Add Questions'}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

