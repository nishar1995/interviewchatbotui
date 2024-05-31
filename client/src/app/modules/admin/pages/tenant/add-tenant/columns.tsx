'use client';

import { HeaderCell } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { PiCheckCircleBold, PiClockBold } from 'react-icons/pi';
import { Text, Checkbox, Select, Tooltip, ActionIcon } from 'rizzui';
import { deleteTenant, fetchData } from '../../../../../../services/tenantService'
import 'react-datepicker/dist/react-datepicker.css';
import { useModal } from '@/app/shared/modal-views/use-modal';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import CreateApplication from '../../../../admin/pages/tenant/add-tenant/create-application'

import PencilIcon from '@/components/icons/pencil';
import { routes } from '@/config/routes';
let getTenantData: any;
// const parseMeetingSchedule = (scheduleString: string | undefined): Date | null => {
//   // Check if scheduleString is null or undefined
//   if (scheduleString === null || scheduleString === undefined) {
//     return null;
//   }

//   // Split the string by space and comma
//   const parts = scheduleString.split(/[\s,]+/);
//   if (parts.length < 3) {
//     return null; // Ensure there are enough parts to extract day, month, and time
//   }
//   // Extract day, month, year, and time
//   const day = parseInt(parts[0]);
//   const monthName = parts[1];
//   const year = new Date().getFullYear(); // Assuming current year
//   const time = parts[2];
//   // Convert month name to month index (0-indexed)
//   const monthIndex = new Date(Date.parse(monthName + ' 1, 2000')).getMonth();
//   // Extract hour and minute from time
//   const [hour, minute] = time.split(':').map(part => parseInt(part));
//   // Create a new Date object
//   return new Date(year, monthIndex, day, hour, minute);
// };
// const parseMeetingSchedule = (scheduleString: string | undefined): Date | null => {
//   // Check if scheduleString is null or undefined
//   if (scheduleString === null || scheduleString === undefined) {
//     return null;
//   }

//   // Define known date formats to try parsing
//   const dateFormats = [
//     // Add more formats if needed
//     'D MMMM,YY h:mma', // e.g., "11 April,24 6:00PM"
//     'MM/DD/YYYY h:mm A', // e.g., "04/11/2024 6:00 PM"
//     'YYYY-MM-DDTHH:mm:ss', // e.g., "2024-04-11T18:00:00"
//   ];

//   // Attempt to parse the date using each format
//   for (const format of dateFormats) {
//     const parsedDate = parseDateWithFormat(scheduleString, format);
//     if (parsedDate !== null) {
//       return parsedDate;
//     }
//   }

//   // If none of the formats work, return null
//   return null;
// };

// const parseDateWithFormat = (dateString: string, format: string): Date | null => {
//   const parsedDate = new Date(dateString.replace(/,/g, ''));
//   return isNaN(parsedDate.getTime()) ? null : parsedDate;
// };


const statusOptions = [
  { label: 'Waiting', value: 'Waiting' },
  { label: 'Completed', value: ' Completed' },
  { label: 'Scheduled', value: 'Scheduled' },
];
function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.label === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      inPortal={false}
      placeholder="Status"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}
function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Scheduled':
      return (
        <div className="flex items-center">
          <PiClockBold className="shrink-0 fill-green-dark text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-orange text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (applicationId: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  selectedDateRange: [Date, Date];
  // starRangeDate: Date;
  // endRangeDate: Date;

};


export const getColumns = ({
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
  selectedDateRange,
  // starRangeDate, 
  // endRangeDate,
  // meetingScheduleOptions: [
  //   { label: 'Waiting', value: 'waiting' },
  //   { label: 'Scheduled', value: 'scheduled' }
  // ],
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
      title: <HeaderCell title="Application Id" />,
      onHeaderCell: () => onHeaderCellClick('applicationId'),
      dataIndex: 'applicationId',
      key: 'applicationId',
      width: 130,
      render: (applicationId: string) => <Text>#{applicationId}</Text>,
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">username</span>}
        />
      ),
      dataIndex: 'username',
      key: 'username',
      width: 130,
      render: (username: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {username}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="password" />,
      onHeaderCell: () => onHeaderCellClick('passWord'),
      dataIndex: 'password',
      key: 'password',
      width: 150,
      render: (passWord: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {passWord}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Candidate Name" />,
      onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'candidateName',
      key: 'candidateName',
      width: 150,
      render: (candidateName: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {candidateName}
          </Text>
        </div>
      ),
    },

    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Meeting Schedule</span>}
        />
      ),
      dataIndex: 'meetingSchedule',
      key: 'meetingSchedule',
      width: 130,
      render: (meetingSchedule: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {meetingSchedule}
          </Text>
        </div>
      ),
    },


    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
          }
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 260,
      onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: string) => {
        return <StatusSelect selectItem={status} />;
      },
    },
  ];


// const [selectAllChecked, setSelectAllChecked] = useState(true);
// setSelectAllChecked(!selectAllChecked);
export async function handleSelectAll() {
  console.log("handle select all");
  // const data = await fetchData();
  // getTenantData = data.data
  // console.log("fetch data",getTenantData)
}

const TenantTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        console.log(fetchedData)
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


};

export default TenantTable;

// type tenatColumns = {
//   data: any[];
//   onDeleteItem: (id: string) => void;
//   //onHeaderCellClick: (value: string) => void;

// };
export const getColumnsData = ({ handlePopupClose, onDeleteItem }: any) => {

  return [
    {
      title: (
        <div className="ps-3.5">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={true}
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
          // {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    // {
    //   title: <HeaderCell title="Tenant Id" />,
    //   //onHeaderCell: () => onHeaderCellClick('applicationId'),
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 130,
    //   render: (id: string) => <Text>{id}</Text>,
    // },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Tenant Name</span>}
        />
      ),
      dataIndex: 'name',
      key: 'name',
      width: 130,
      render: (name: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {name}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Address Line1" />,
      //onHeaderCell: () => onHeaderCellClick('passWord'),
      dataIndex: 'address_line1',
      key: 'address_line1',
      width: 150,
      render: (address_line1: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {address_line1}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Address Line2" />,
      //onHeaderCell: () => onHeaderCellClick('passWord'),
      dataIndex: 'address_line2',
      key: 'address_line2',
      width: 150,
      render: (
        address_line2: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {address_line2}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="City" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'city',
      key: 'city',
      width: 150,
      render: (city: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {city}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="State" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'state',
      key: 'state',
      width: 150,
      render: (state: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {state}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Country" />,
      //onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'country',
      key: 'country',
      width: 150,
      render: (country: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {country}
          </Text>
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Zip Code</span>}
        />
      ),
      dataIndex: 'zip_code',
      key: 'zip_code',
      width: 130,
      render: (
        zip_code: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {zip_code}
          </Text>
        </div>
      ),
    },

    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: string, id: any) => (
        <RenderAction row={id} onDeleteItem={onDeleteItem} onPopupClose={handlePopupClose} />
      ),
    },

  ];
};


export async function onDeleteItem(id: any) {
  console.log("tenant id", id)
  console.log("delete the tenant......");
  try {
    const response = await deleteTenant(id);
    if (response) {
      console.log("delete the tenant", response);
      //window.location.reload()
      SetOpen()
    }
  } catch (error) {
    console.log("error", error)
  }

}

function SetOpen() {
  useModal().closeModal;

}


function RenderAction({
  row,
  onDeleteItem,
  onPopupClose
}: {
  row: any;
  onDeleteItem: (id: string) => void;
  onPopupClose: () => void;
}) {
  const { openModal, closeModal } = useModal();
  function handleCreateModal(row: any) {
    console.log("row////////", row)
    closeModal(),
      openModal({
        view: <CreateApplication onClose={onPopupClose} tenantDetails={row} />,
        //customSize: '500px',
      });
  }
  // className="w-full @lg:w-auto "
  return (
    <div className="flex items-center justify-end gap-3 pe-3">
      <Tooltip
        size="sm"
        content={'Edit Tenant'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Tenant'}
          // className="hover:!border-gray-900 hover:text-gray-700"
          onClick={() =>
            openModal({
              view: (
                <CreateApplication
                  tenantDetails={row}
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
          {/* <EyeIcon className="h-4 w-4" /> */}
          <PencilIcon className="h-3.5 w-3.5" />

        </ActionIcon>
      </Tooltip>
      <DeletePopover
        title={`Delete the Tenant`}
        description={`Are you sure you want to delete this tenant?`}
        onDelete={() => onDeleteItem && onDeleteItem(row.id)}
      />
    </div>
  );
}







export const getColumns2 = ({
  handleSelectAll,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
  sortConfig,
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
      title: <HeaderCell title="Application Id" />,
      onHeaderCell: () => onHeaderCellClick('applicationId'),
      dataIndex: 'applicationId',
      key: 'applicationId',
      width: 130,
      render: (applicationId: string) => <Text>#{applicationId}</Text>,
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">username</span>}
        />
      ),
      dataIndex: 'username',
      key: 'username',
      width: 130,
      render: (username: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {username}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="password" />,
      onHeaderCell: () => onHeaderCellClick('passWord'),
      dataIndex: 'password',
      key: 'password',
      width: 150,
      render: (passWord: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {passWord}
          </Text>
        </div>
      ),
    },
    {
      title: <HeaderCell title="Candidate Name" />,
      onHeaderCell: () => onHeaderCellClick('candidateName'),
      dataIndex: 'candidateName',
      key: 'candidateName',
      width: 150,
      render: (candidateName: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {candidateName}
          </Text>
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title={<span className="whitespace-nowrap">Meeting Schedule</span>}
        />
      ),
      dataIndex: 'meetingSchedule',
      key: 'meetingSchedule',
      width: 130,
      render: (meetingSchedule: string) => (
        <div>
          <Text className="text-sm font-medium text-gray-900 dark:text-gray-700">
            {meetingSchedule}
          </Text>
        </div>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
          }
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 260,
      onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: string) => {
        return <StatusSelect selectItem={status} />;
      },
    },
  ];
