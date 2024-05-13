'use client';

import { useState } from 'react';
import { Button, Title, Text, RadioGroup, AdvancedRadio } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  PiCheckCircleFill,
  PiDownloadSimpleBold,
  PiFire,
  PiLightning,
  PiPlusBold,
  PiStackSimple,
} from 'react-icons/pi';
import BillingHistoryTable from '@/app/shared/account-settings/billing-history/table';
import AddBillingCardModalView from '@/app/shared/account-settings/modal/add-billing-card';
import MasterCardIcon from '@/components/icons/mastercard';
import VisaIcon from '@/components/icons/visa';
import ApplePayIcon from '@/components/icons/apple-pay';
import { billingHistoryData } from '@/data/billing-history';
import { exportToCSV } from '@/utils/export-to-csv';

const plansOptions = [
  {
    icon: <PiStackSimple className="h-4 w-4 text-gray-900" />,
    title: 'Basic plan $10/month',
    description:
      'Includes up to 10 users, 20GB individual data and access to all features.',
    value: 'basic',
  },
  {
    icon: <PiFire className="h-4 w-4 text-gray-900" />,
    title: 'Premium plan $20/month',
    description:
      'Includes up to 20 users, 40GB individual data and access to all features.',
    value: 'premium',
  },
  {
    icon: <PiLightning className="h-4 w-4 text-gray-900" />,
    title: 'Enterprise plan $40/month',
    description:
      'Unlimited users, unlimited individual data and access to all features.',
    value: 'enterprise',
  },
];

const cardsOptions = [
  {
    icon: <MasterCardIcon className="" />,
    title: 'Mastercard ending in 2321',
    expiry: '06/24',
    default: true,
    value: 'mastercard',
  },
  {
    icon: <VisaIcon className="" />,
    title: 'Visa ending in 22021',
    expiry: '06/23',
    default: false,
    value: 'visa',
  },
  {
    icon: <ApplePayIcon className="dark:invert" />,
    title: 'ApplePay ending in 2029',
    expiry: '06/24',
    default: false,
    value: 'applepay',
  },
];

export default function BillingSettingsView() {
  function handleExportData() {
    exportToCSV(
      billingHistoryData,
      'Title,Amount,Date,Status,Shared',
      'billing_history'
    );
  }

  return (
    <>
      <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Account Plans"
        titleClassName="text-xl font-semibold"
        description="Pick an account plan that fits your workflow."
      />
      <HorizontalFormBlockWrapper
        title="Current Plan"
        description="We’ll credit your account if you need to downgrade during the billing cycle."
        descriptionClassName="max-w-md"
        childrenWrapperClassName="@3xl:grid-cols-1 max-w-5xl w-full"
      >
        <div>
          <CurrentPlans />
        </div>
      </HorizontalFormBlockWrapper>
      <HorizontalFormBlockWrapper
        title="Card Details"
        description="Update your billing details and address."
        descriptionClassName="max-w-md"
        childrenWrapperClassName="@3xl:grid-cols-1 max-w-5xl w-full"
      >
        <CardDetails />
      </HorizontalFormBlockWrapper>
      <div className="mt-8 xl:mt-10">
        <div className="mb-5 flex items-center justify-between">
          <Title as="h5" className="text-[17px] font-semibold">
            Billing History
          </Title>
          <Button onClick={() => handleExportData()}>
            <PiDownloadSimpleBold className="me-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <BillingHistoryTable data={billingHistoryData} />
      </div>
    </>
  );
}

export function CurrentPlans() {
  const [currentPlan, setCurrentPlan] = useState('basic');

  return (
    <RadioGroup
      value={currentPlan}
      setValue={setCurrentPlan}
      className="flex flex-col gap-5"
    >
      {plansOptions.map((plan, index) => (
        <AdvancedRadio
          key={`plan-${index}`}
          name="current_plans"
          value={plan.value}
          onChange={() => setCurrentPlan(plan.value)}
          checked={plan.value === currentPlan}
          className="flex flex-col rounded-xl text-sm hover:cursor-pointer hover:border-primary"
          inputClassName="[&:checked~span_div>.icon]:block [&~span]:rounded-xl [&:checked~span]:ring-offset-0 [&~span:hover]:border-primary [&:checked~.rizzui-advanced-checkbox]:border-primary [&:checked~.rizzui-advanced-checkbox]:ring-primary [&:checked~.rizzui-advanced-checkbox]:ring-1"
        >
          <div className="flex items-center justify-between gap-3 px-1.5 py-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {plan.icon}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <Title
                  as="h6"
                  className="mb-1 text-sm font-medium text-gray-900"
                >
                  {plan.title}
                </Title>
                <PiCheckCircleFill className="icon hidden h-6 w-6 flex-shrink-0 text-primary" />
              </div>
              <Text className="text-gray-500">{plan.description}</Text>
            </div>
          </div>
        </AdvancedRadio>
      ))}
    </RadioGroup>
  );
}

export function CardDetails() {
  const [paymentMethod, setPaymentMethod] = useState('mastercard');
  const { openModal } = useModal();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {cardsOptions.map((cards, index) => (
          <AdvancedRadio
            key={`cards-${index}`}
            name="card_details"
            onChange={() => setPaymentMethod(cards.value)}
            defaultChecked={cards.value === paymentMethod}
            value={cards.value}
            className="flex gap-3 rounded-xl border border-muted text-sm hover:cursor-pointer hover:border-primary [&_.rizzui-advanced-checkbox]:flex [&_.rizzui-advanced-checkbox]:gap-3 [&_.rizzui-advanced-checkbox]:border-0 [&_.rizzui-advanced-checkbox]:px-5 [&_.rizzui-advanced-checkbox]:py-5 [&_.rizzui-advanced-checkbox]:ring-0"
            inputClassName="[&:checked~span_div>.icon]:block [&~span]:pt-4 [&~span]:w-full [&~span]:rounded-xl [&:checked~span]:ring-offset-0 [&~span:hover]:border-primary [&:checked~.rizzui-advanced-checkbox]:border-primary [&:checked~.rizzui-advanced-checkbox]:ring-primary [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~.rizzui-advanced-checkbox]:w-full"
          >
            <div className="mb-2 flex h-8 w-12 shrink-0 items-center justify-center rounded-md border border-gray-100 px-2 py-1.5">
              {cards.icon}
            </div>
            <div className="block">
              <Title as="h6" className="mb-1 text-sm font-medium">
                {cards.title}
              </Title>
              <Text as="p">
                Expiry in <span className="font-medium">{cards.expiry}</span>
              </Text>
              <div className="mt-2 flex gap-3">
                <Button
                  variant="text"
                  className={cn(
                    'h-auto p-0',
                    cards.default && 'bg-transparent text-gray-500'
                  )}
                  disabled={cards.default}
                >
                  Set as Default
                </Button>
                <Button
                  variant="text"
                  className={cn('h-auto p-0 text-gray-900')}
                >
                  Edit
                </Button>
              </div>
            </div>
            {cards.value === paymentMethod ? (
              <PiCheckCircleFill className="icon ms-auto h-6 w-6 flex-shrink-0 text-primary" />
            ) : (
              <div className="relative ms-auto flex h-6 w-6 items-center justify-center rounded-full border border-muted"></div>
            )}
          </AdvancedRadio>
        ))}
      </div>

      <div>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() =>
            openModal({
              view: <AddBillingCardModalView />,
            })
          }
        >
          <PiPlusBold className="me-2 h-4 w-4" />
          <span>Add new card</span>
        </Button>
      </div>
    </div>
  );
}
