'use client'

import RoleCard from '@/app/shared/roles-permissions/role-card';
// import { rolesList } from '@/data/roles-permissions';
import { getUsersRoleCount } from '@/services/userService';
import cn from '@/utils/class-names';
import { useEffect, useState } from 'react';


interface RolesGridProps {
  className?: string;
  gridClassName?: string;
}

export default function RolesGrid({
  className,
  gridClassName,
}: RolesGridProps) {

  const [roledata, setData] = useState([]);
  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const response = await getUsersRoleCount();
    console.log("fetch data", response.data);
    setData(response.data);
    console.log("data/////", roledata)
  };
  return (
    <div className={cn('@container', className)}>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 @[36.65rem]:grid-cols-2 @[56rem]:grid-cols-3 @[78.5rem]:grid-cols-4 @[100rem]:grid-cols-5',
          gridClassName
        )}
      >
       {roledata.map((role:any) => (
          <RoleCard key={role.count} roledata={role} {...role} />
        ))}
      </div>
    </div>
  );
}
