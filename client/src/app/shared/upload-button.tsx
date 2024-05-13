'use client';

import { PiArrowLineDownBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Button } from 'rizzui';

type ExportButtonProps = {
  modalView: React.ReactNode;
};

export default function UploadButton({ modalView }: ExportButtonProps) {
  const { openModal } = useModal();
  return (
    <Button
      className="mt-4 w-full @lg:mt-0 @lg:w-auto"
      onClick={() =>
        openModal({
          view: modalView,
        })
      }
    >
      <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
      Upload
    </Button>
  );
}
