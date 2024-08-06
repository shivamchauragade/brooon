import { Checkbox } from '@/components/ui/checkbox';
import { User_data } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<User_data>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  // {
  //   accessorKey: 'id',
  //   header: 'UserId'
  // },
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const { first_name, last_name } = row.original;
      return first_name && last_name ? `${first_name} ${last_name}` : '';
    }
  },
  {
    accessorKey: 'mobile_number',
    header: 'Mobile',
    cell: ({ row }) => row.original.mobile_number || ''
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email || ''
  },
  {
    accessorKey: 'association',
    header: 'Association Name',
    cell: ({ row }) => {
      const { association_info, is_verified } = row.original;
      return (
        <div className="flex items-center">
          {is_verified && <span className="text-green-500 mr-2">✔️</span>}
          <span>{association_info?.name || ''}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => row.original.gender || ''
  },
  // {
  //   accessorKey: 'is_verified',
  //   header: 'Verified',
  //   cell: ({ row }) => (
  //     <div className="flex items-center justify-center h-full">
  //       {row.original.is_verified ? (
  //         <span className="text-green-500">✔️</span>
  //       ) : (
  //         <span className="text-red-500">❌</span>
  //       )}
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'created_at',
    header: 'Join Date',
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      if (!createdAt) return '';
      const date = new Date(createdAt);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      return <span>{formattedDate}</span>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
