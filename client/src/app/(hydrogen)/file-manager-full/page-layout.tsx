'use client';

import { useSearchParams } from 'next/navigation';
import FileGrid from '../../modules/hr/pages/file/manager/file-grid'
import FileListTable from '../../modules/hr/pages/file/manager/file-list/table';

export default function PageLayout() {
  const searchParams = useSearchParams();
  const layout = searchParams.get('layout');
  const isGridLayout = layout?.toLowerCase() === 'grid';

  return isGridLayout ? <FileGrid /> : <FileListTable />;
}
