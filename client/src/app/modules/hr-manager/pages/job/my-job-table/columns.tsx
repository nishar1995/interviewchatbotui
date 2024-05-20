'use client';

import CreateApplication from '@/app/modules/hr-manager/pages/job/my-job-table/create-job';
import DeletePopover from '@/app/shared/delete-popover';
import { useModal } from '@/app/shared/modal-views/use-modal';
import EyeIcon from '@/components/icons/eye';
import { HeaderCell } from '@/components/ui/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select } from 'rizzui';
import { deleteJob } from '@/services/jobPostingService';
import PencilIcon from '@/components/icons/pencil';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (jobId: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
}: Columns) => [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            aria-label={'ID'}
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="Tenant Id" />,
      onHeaderCell: () => onHeaderCellClick('TenantId'),
      dataIndex: 'tenantId',
      key: 'tenantId',
      width: 130,
      render: (tenantId: string) => <Text>#{tenantId}</Text>,
    },
    {
      title: <HeaderCell title="Tenant Name" />,
      onHeaderCell: () => onHeaderCellClick('tenantName'),
      dataIndex: 'tenantName',
      key: 'tenantName',
      width: 130,
      render: (tenantName: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {tenantName}
          </Text>
        </div>
      ),
    },
    // {
    //   title: (
    //     <HeaderCell
    //       title={<span className="whitespace-nowrap">Date of Birth</span>}
    //     />
    //   ),
    //   dataIndex: 'dob',
    //   key: 'dob',
    //   width: 250,
    //   render: (dob: Date) => <DateCell date={dob} />,
    // },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Location</span>}
        />
      ),
      dataIndex: 'location',
      key: 'location',
      width: 130,
      render: (location: string) => (
        // <DateCell date={new Date(location)} />
        <span className="whitespace-nowrap">{location}</span>
      ),
    },
  ];


export const getColumnsData = () => {
  return [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            //checked={true}
            //onChange={handleSelectAll}
            //checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-3.5">
          <Checkbox
            aria-label={'ID'}
            className="cursor-pointer"

          //checked={checkedItems.includes(row.id)}
          //{...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="Job Id" />,
      //onHeaderCell: () => onHeaderCellClick('jobId'),
      dataIndex: 'job_id',
      key: 'job_id',
      width: 130,
      render: (job_id: string) => <Text>{job_id}</Text>,
    },
    {
      title: <HeaderCell title="Job Name" />,
      //onHeaderCell: () => onHeaderCellClick('jobName'),
      dataIndex: 'title',
      key: 'title',
      width: 130,
      render: (title: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {title}
          </Text>
        </div>
      ),
    },

    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Location</span>}
        />
      ),
      dataIndex: 'location',
      key: 'location',
      width: 130,
      render: (location: string) => (
        // <DateCell date={new Date(location)} />
        <span className="whitespace-nowrap">{location}</span>
      ),
    },

    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, id: any) => (
        <RenderAction row={id} onDeleteItem={onDeleteItem} />
      ),
    },

  ];
};



const handlePopupClose = () => {
  console.log("close update popup");

}

export async function onDeleteItem(id: any) {
  console.log("candidate id", id)
  console.log("delete the candidate......");
  try {
    const response = await deleteJob(id);
    if (response) {
      console.log("delete the candidate", response);
      setOpen()
    }
  } catch (error) {
    console.log("error", error)
  }

}

function setOpen() {
  useModal().closeModal
}
function RenderAction({
  row,
  onDeleteItem,
}: {
  row: any;
  onDeleteItem: (id: string) => void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal(row: any) {
    console.log("row////////", row)
    closeModal(),
      openModal({
        view: <CreateApplication onClose={handlePopupClose} jobList={row} />,
        //customSize: '500px',
      });
  }
  // className="w-full @lg:w-auto "
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'Edit Job'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Job'}
          // className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <CreateApplication
                  jobList={row}
                  data={row}
                  onDelete={() => onDeleteItem(row.id)}
                  onEdit={handleCreateModal(row)
                  }
                  onClose={handlePopupClose}
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
        title={`Delete the Job`}
        description={`Are you sure you want to delete this #${row.id} Job?`}
        onDelete={() => onDeleteItem(row.id)}
      />
    </div>
  );
}
