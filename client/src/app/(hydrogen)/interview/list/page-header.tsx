'use client';

import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { appointmentData } from '@/data/appointment-data';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateUpdateAppointmentForm from '@/app/shared/appointment/appointment-list/appointment-form';

const pageHeader = {
  title: 'Appointment List',
  breadcrumb: [
    {
      href: routes.interview.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Appointment List',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function AppointmentListPageHeader({ className }: HeaderProps) {
  const { closeModal, openModal } = useModal();
  function handleCreateModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm />,
        customSize: '700px',
      });
  }
  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">
        <ExportButton
          data={appointmentData}
          fileName="appointment_data"
          header="ID,Patient,Doctor,Service Type,Date,Status,Payment,Duration"
        />
        <Button className="w-full @lg:w-auto" onClick={handleCreateModal}>
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Create Appointment
        </Button>
      </div>
    </PageHeader>
  );
}
