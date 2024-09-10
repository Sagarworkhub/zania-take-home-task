import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import { cn } from '~/lib/utils';

import { useGetACat } from '~/services/get-a-cat';

import { AspectRatio } from '../ui/aspect-ratio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Spinner } from './spinner';

interface SortableCardProps {
  id: string;
  title: string;
}

export const SortableCard: React.FC<SortableCardProps> = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { data, isFetching } = useGetACat(id);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Dialog>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(isDragging && 'opacity-50')}
      >
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>{title}</CardTitle>
          <div {...attributes} {...listeners} className='cursor-grab'>
            <Grip size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9}>
            <div className='relative flex h-full justify-center'>
              {(isFetching || !isImageLoaded) && <Spinner />}
              {!isFetching && data && (
                <DialogTrigger asChild>
                  <img
                    src={data.url}
                    alt='Cat'
                    className={cn(
                      'size-full cursor-pointer rounded-lg object-cover',
                      !isImageLoaded && 'absolute inset-0',
                    )}
                    onLoad={handleImageLoad}
                  />
                </DialogTrigger>
              )}
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <img src={data?.url} alt='Cat' className='size-full rounded-lg' />
      </DialogContent>
    </Dialog>
  );
};
