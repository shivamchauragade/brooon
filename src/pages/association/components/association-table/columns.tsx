import { Checkbox } from '@/components/ui/checkbox';
import { Associations_data } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { BriefcaseBusiness} from 'lucide-react';

export const columns: ColumnDef<Associations_data>[] = [
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
  {
    accessorKey: 'picture',
    header: 'Logo',
    cell: ({ row }) => {
      const profilePicture = row.original.picture;
      return profilePicture ? (
        <img
          src={"https://stagingapi.brooon.com/"+profilePicture}
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center">
        <BriefcaseBusiness className="text-gray-500 w-5 h-5" />
      </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'code',
    header: 'Code'
  },
  {
    accessorKey: 'state',
    header: 'State'
  },
  {
    accessorKey: 'city',
    header: 'City'
  },
  
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
