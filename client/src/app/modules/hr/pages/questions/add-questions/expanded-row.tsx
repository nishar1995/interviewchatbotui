import DeletePopover from '@/app/shared/delete-popover';
import { useModal } from '@/app/shared/modal-views/use-modal';
import PencilIcon from '@/components/icons/pencil';
import Image from 'next/image';
import React from 'react';
import { PiXBold } from 'react-icons/pi';
import { Title, Text, Tooltip, ActionIcon } from 'rizzui';
import CreateApplication from '../../../../hr/pages/questions/add-questions/create-application';
import { deleteQuestion } from '@/services/tenantQuestionsService';

export default function ExpandedOrderRow({ data }: any, {handlePopupClose , onDeleteItem}:any) {
  console.log("data.....", data)
  if (data?.questions?.length === 0) {
    return <Text>No Questions available</Text>;
  }
  return (

    <div className="grid grid-cols-1 divide-y bg-gray-0 px-3.5 dark:bg-gray-50">
      {/* Heading Row */}
      <div className="flex items-center justify-between py-6 first-of-type:pt-2.5 last-of-type:pb-2.5">
        <Text as="span" className="font-semibold text-gray-900 dark:text-gray-700">Serial No.</Text>
        <Text as="span" className="font-semibold text-gray-900 dark:text-gray-700">Question</Text>
        <Text as="span" className="font-semibold text-gray-900 dark:text-gray-700">Actions</Text>
      </div>

      {/* Question Rows */}
      {data?.questions?.map((question: any, index: number) => (
        <article key={question.id} className="flex items-center justify-between py-6 first-of-type:pt-2.5 last-of-type:pb-2.5">
          {/* Serial Number */}
          <Text as="span" className="text-gray-900 dark:text-gray-700">{index + 1}</Text>

          {/* Question */}
          <div className="flex w-full max-w-xs items-center justify-between gap-4">
            <Text as="span" className="font-medium text-gray-900 dark:text-gray-700">{question.question}</Text>
          </div>

          {/* Actions */}
          <RenderAction key={question.id} row={question} onDeleteItem={onDeleteItem} onPopupClose={handlePopupClose}
           />
        </article>
      ))}
    </div>
  );

}

export async function onDeleteItem(id: any) {
  debugger
  console.log("onclick dele")
  try {
    const response = await deleteQuestion(id);
    if (response) {
      console.log("delete the questions", response);
    }
  } catch (error) {
    console.log("error", error)
  }

}


function RenderAction({
  row,
  onDeleteItem,
  onPopupClose
}: {
  row: any;
  onDeleteItem: (id: string) => void;
  onPopupClose:()=>void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal(row: any) {
    console.log("row////////", row)
    closeModal(),
      openModal({
        view: <CreateApplication onClose={onPopupClose} questionsDetail={row} />,
        //customSize: '500px',
      });
  }
  // className="w-full @lg:w-auto "
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'Edit Questions'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Questions'}
          // className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <CreateApplication
                  questionsDetail={row}
                  data={row}
                  //onDelete={() => onDeleteItem(row.id)}
                  onEdit={handleCreateModal(row)
                  }
                  onClose={onPopupClose}
                />
              ),
              customSize: '900px',
            })
          }
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <DeletePopover
        title={`Delete the Questions`}
        description={`Are you sure you want to delete this  questions?`}
        onDelete={() => onDeleteItem && onDeleteItem(row.id)}
      />
    </div>
  );
}















