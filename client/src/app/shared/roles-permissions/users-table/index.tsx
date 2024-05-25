'use client';

import { useState, useEffect } from 'react';

import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/roles-permissions/users-table/columns';
import { deleteUser, getUsersList } from '@/services/userService';



export default function UsersTable() {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [data, setData] = useState([]);



  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    handlePagination();
  }, [currentPage, pageSize, data]);



  const fetchUserList = async () => {
    const response = await getUsersList();
    console.log("fetch data", response.data);
    setData(response.data);
    console.log("data/////",data)
    setTotalItems(response.data.length);
     setCurrentPage(1);
  };

  const handlePopupClose = () => {
    fetchUserList();
  };


  const onDeleteUser = async (id: any) => {
    console.log("user id", id)
    console.log("delete the tenant......");
    try {
      const response = await deleteUser(id);
      if (response) {
        console.log("delete the tenant", response);
        fetchUserList();
      }
    } catch (error) {
      console.log("error", error)
    }

  }

  const onDeleteItem = (id: any) => {
    console.log("user id", id)
    onDeleteUser(id);
    
  }

  const handlePagination = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(data.slice(startIndex, endIndex));
  };

  const handlePaginate = (page: any) => {
    console.log("pagination", page);
    setCurrentPage(page);
  };

  const columns = getColumns({ handlePopupClose, onDeleteItem });
  const { visibleColumns } = useColumn(columns);
  return (
    <div className="mt-14">
      
      <ControlledTable
        variant="modern"
        data={paginatedData}
        showLoadingText={true}
        // @ts-ignore
       
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: handlePaginate,
        }}
       
      />
    </div>
  );
}
