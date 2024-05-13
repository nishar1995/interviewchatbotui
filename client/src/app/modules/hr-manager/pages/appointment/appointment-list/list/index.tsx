'use client';

import dynamic from 'next/dynamic';
import { PiTrashDuotone } from 'react-icons/pi';
import { useCallback, useMemo, useState } from 'react';
import { Button, Title } from 'rizzui';
import { GetColumns } from '@/app/shared/appointment/appointment-list/list/columns';
import ControlledTable from '@/components/controlled-table';
import DateFiled from '@/components/controlled-table/date-field';
import { useMedia } from '@/hooks/use-media';
import { useTable } from '@/hooks/use-table';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import StatusField from '@/components/controlled-table/status-field';
import { appointmentData, appointmentTypes } from '@/data/appointment-data';
import { useColumn } from '@/hooks/use-column';
import cn from '@/utils/class-names';

const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  date: [null, null],
  status: '',
  paymentMethod: '',
};

export const appointmentTypesOptions = Object.entries(appointmentTypes).map(
  ([value, label]) => ({ label, value })
);

const statusOptions = [
  {
    value: 'scheduled',
    label: 'Scheduled',
  },
  {
    value: 'waiting',
    label: 'Waiting',
  },
];

export default function AppointmentListTable() {
  const [pageSize, setPageSize] = useState(10);
  const [_, setCheckedItems] = useState<string[]>([]);

  const isMediumScreen = useMedia('(max-width: 1860px)', false);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
    handleReset,
    handleSelectAll,
    handleRowSelect,
    setSelectedRowKeys,
    selectedRowKeys,
  } = useTable(appointmentData, pageSize, filterState);

  const columns = useMemo(
    () =>
      GetColumns({
        data: appointmentData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div
      className={cn(
        '[&_.table-filter>div:first-child]:grow [&_.table-filter>div:first-child]:justify-between',
        !isMediumScreen && '[&_.table-filter>div:first-child]:flex-row-reverse'
      )}
    >
      <ControlledTable
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        scroll={{
          x: 1560,
        }}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        filterElement={
          <div
            className={cn(
              'flex',
              isMediumScreen ? 'flex-col gap-6' : 'flex-row items-center gap-3'
            )}
          >
            {!isMediumScreen && (
              <Title
                as="h3"
                className="rizzui-title-h3 pe-4 text-base font-semibold sm:text-lg"
              >
                All Appointment
              </Title>
            )}

            <DateFiled
              selected={getDateRangeStateValues(filters['date'][0])}
              startDate={getDateRangeStateValues(filters['date'][0])}
              endDate={getDateRangeStateValues(filters['date'][1])}
              className="w-full"
              dateFormat="dd MMM yyyy"
              onChange={(date: any) => {
                updateFilter('date', date);
              }}
              placeholderText="Select created date"
              {...(isMediumScreen && {
                inputProps: {
                  label: 'Created Date',
                  labelClassName: 'font-medium text-gray-700',
                },
              })}
              maxDate={new Date()}
            />
            <StatusField
              dropdownClassName="!z-10"
              className="w-full min-w-[170px] @[35rem]:w-auto"
              placeholder="Select type"
              options={appointmentTypesOptions}
              value={filters['type']}
              onChange={(value: string) => {
                updateFilter('type', value);
              }}
              getOptionValue={(option: { value: any }) => option.value}
              displayValue={(selected: string) =>
                appointmentTypesOptions.find(
                  (option) => option.label === selected
                )?.label ?? ''
              }
              placement="bottom-start"
              {...(isMediumScreen && {
                label: 'Service Type',
                labelClassName: 'font-medium text-gray-700',
              })}
            />
            <StatusField
              dropdownClassName="!z-10"
              className="w-full @[35rem]:w-auto"
              options={statusOptions}
              value={filters['status']}
              onChange={(value: string) => {
                updateFilter('status', value);
              }}
              getOptionValue={(option: { value: any }) => option.value}
              {...(isMediumScreen && {
                label: 'Status',
                labelClassName: 'font-medium text-gray-700',
              })}
            />

            {isFiltered ? (
              <Button
                size="sm"
                onClick={() => {
                  handleReset();
                }}
                className="h-8 bg-gray-200/70"
                variant="flat"
              >
                <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
              </Button>
            ) : null}
          </div>
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Appointments' : 'Appointment'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
