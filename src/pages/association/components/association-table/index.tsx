import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import AssociationTableAction from './association-table-action';

type TAssociationTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function UserTable({
  users,
  pageCount
}: TAssociationTableProps) {
  return (
    <>
      <AssociationTableAction />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
