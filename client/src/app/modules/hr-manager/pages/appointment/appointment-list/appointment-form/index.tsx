'use client';

import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
const StepOne = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/data-time'
    ),
  {
    ssr: false,
  }
);
const StepTwo = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/services'
    ),
  {
    ssr: false,
  }
);
const StepThree = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/patient-information'
    ),
  {
    ssr: false,
  }
);
import { atomWithReset, atomWithStorage, useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type FormDataType = {
  date: Date;
  time: string;
  category: string;
  service: string;
  name: string;
  email: string;
  phone: string | undefined;
};

export const initialFormData = {
  date: new Date(),
  time: '',
  category: '',
  service: '',
  name: '',
  email: '',
  phone: '',
};

export const formDataAtom = atomWithStorage<FormDataType>(
  'appointmentStepFormStore',
  initialFormData
);

enum Step {
  StepOne,
  StepTwo,
  StepThree,
}

const firstStep = Step.StepOne;
export const stepperAtomAppointment = atomWithReset<Step>(firstStep);

export function useStepperAppointment() {
  const [step, setStep] = useAtom(stepperAtomAppointment);
  function gotoNextStep() {
    setStep(step + 1);
  }
  function gotoPrevStep() {
    setStep(step > firstStep ? step - 1 : step);
  }
  function resetStepper() {
    setStep(firstStep);
  }
  return {
    step,
    setStep,
    // gotoStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.StepOne]: StepOne,
  [Step.StepTwo]: StepTwo,
  [Step.StepThree]: StepThree,
};

export const stepAppointmentTotalSteps = Object.keys(
  MAP_STEP_TO_COMPONENT
).length;

export default function CreateUpdateAppointmentForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [step] = useAtom(stepperAtomAppointment);
  const [_, setFormData] = useAtom(formDataAtom);
  const Component = MAP_STEP_TO_COMPONENT[step];
  const resetLocation = useResetAtom(stepperAtomAppointment);
  useEffect(() => {
    resetLocation();
    setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div className="relative flex justify-center md:items-center">
      <div className="w-full">
        <Component />
      </div>
    </div>
  );
}
