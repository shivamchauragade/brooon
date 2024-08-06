import DataTable from '@/components/shared/data-table';
import { columns } from './columns'
import UsersTableAction from './user-table-action'

type TUsersTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function UserTable({
  users,
  pageCount
}: TUsersTableProps) {
  return (
    <>
      <UsersTableAction />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
