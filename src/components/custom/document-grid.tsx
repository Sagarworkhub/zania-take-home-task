import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { useCallback, useEffect, useState } from 'react';

import useDebounce from '~/lib/hooks/use-debounce';

import { useGetDocuments } from '~/services/get-documents';
import { useReorderDocuments } from '~/services/reorder-documents';
import { type IDocument } from '~/services/types';

import { SortableCard } from './sortable-card';
import { Spinner } from './spinner';

export const DocumentGrid: React.FC = () => {
  const { data = [], isError, isFetching, error } = useGetDocuments();

  const [documents, setDocuments] = useState<Array<IDocument>>(data);

  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = useReorderDocuments();

  const debouncedDocuments = useDebounce(documents, 5000);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setDocuments((currentItems) => {
        const oldIndex = currentItems.findIndex(
          (item) => item.position === active.id,
        );
        const newIndex = currentItems.findIndex(
          (item) => item.position === over?.id,
        );

        const newItems = arrayMove(currentItems, oldIndex, newIndex);
        return newItems;
      });
    }
  }, []);

  useEffect(() => {
    if (!documents.length) {
      setDocuments(data);
    }
  }, [data, documents.length]);

  useEffect(() => {
    if (debouncedDocuments.length > 0) {
      mutate(debouncedDocuments);
    }
  }, [debouncedDocuments, mutate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFetching) {
      setIsLoading(true);
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isFetching]);

  if (isError) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        Oops something went wrong.
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        Oops no data found.
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={documents.map((d) => d.position)}
          strategy={rectSortingStrategy}
        >
          <div className='grid grid-cols-3 gap-4'>
            {documents.map((doc) => (
              <SortableCard
                key={doc.position}
                id={doc.position}
                title={doc.title}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
