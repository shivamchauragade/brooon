import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState, useEffect } from 'react';
import { addAssociation, updateAssociation } from '@/lib/api';
import { useRouter } from '@/routes/hooks';
import { Associations_data } from '@/constants/data';
import { X } from 'lucide-react';

const associationFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, { message: 'Name should be at least 1 character' }),
  code: z
    .string({ required_error: 'Code is required' })
    .min(1, { message: 'Code should be at least 1 character' }),
  city: z
    .string({ required_error: 'City is required' })
    .min(1, { message: 'City should be at least 1 character' }),
  state: z
    .string({ required_error: 'State is required' })
    .min(1, { message: 'State should be at least 1 character' }),
  image: z.any().optional()
});

type AssociationFormSchemaType = z.infer<typeof associationFormSchema>;

interface AssociationFormProps {
  modalClose: () => void;
  associationToEdit?: Associations_data | null; 
}

const AssociationCreateForm = ({ modalClose, associationToEdit }: AssociationFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<AssociationFormSchemaType>({
    resolver: zodResolver(associationFormSchema),
    defaultValues: associationToEdit || {}
  });

  useEffect(() => {
    if (associationToEdit) {
      form.reset(associationToEdit);
      const image = `https://stagingapi.brooon.com/${associationToEdit.picture}`;
      console.log("Image URL:", image);
      setImagePreview(image || null);
    }
  }, [associationToEdit, form]);

  const onSubmit = async (values: AssociationFormSchemaType) => {
    try {
      if (associationToEdit) {
        await updateAssociation(associationToEdit.id, values);
      } else {
        await addAssociation(values);
      }
      router.reload();
      modalClose();
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        form.setValue('image', file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true
  });

  const handleClearImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setImagePreview(null);
    form.setValue('image', null);
  };

  return (
    <div className="px-2">
      <Heading
        title={associationToEdit ? 'Edit Association' : 'Add New Association'}
        description={''}
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter name here"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter code here"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter city here"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter state here"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`relative border-2 border-dashed ${imagePreview ? 'border-gray-300' : 'border-gray-500'} rounded-md p-4 text-center cursor-pointer`}
                      onClick={open}
                    >
                      <input {...getInputProps()} />
                      {!imagePreview && (isDragActive ? (
                        <p>Drop the image here ...</p>
                      ) : (
                        <p>Click to select an Logo</p>
                      ))}
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-full h-auto max-h-48 mx-auto"
                            onError={(e) => {
                              console.error('Image load failed:', e);
                              setImagePreview(null);
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleClearImage}
                            className="absolute top-0 right-0 mt-2 mr-2"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              size="lg"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" size="lg">
              {associationToEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AssociationCreateForm;
