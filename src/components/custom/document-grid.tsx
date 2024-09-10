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
import { useCallback } from 'react';

import { useGetDocuments } from '~/services/get-documents';
import { useReorderDocuments } from '~/services/reorder-documents';

import { SortableCard } from './sortable-card';
import { Spinner } from './spinner';

// export interface DocumentGridProps {
//   data: Array<IDocument>;
// }

export const DocumentGrid: React.FC = () => {
  // const [documents, setDocuments] = useState<Array<IDocument>>(data);

  const { data = [], isFetching, isError, error } = useGetDocuments();

  const mu = useReorderDocuments();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = data.findIndex((item) => item.position === active.id);
        const newIndex = data.findIndex((item) => item.position === over?.id);
        mu.mutate(arrayMove(data, oldIndex, newIndex));
      }
    },
    [data, mu],
  );

  if (isError) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        Oops something went wrong.
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (isFetching) {
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
          items={data.map((d) => d.position)}
          strategy={rectSortingStrategy}
        >
          <div className='grid grid-cols-3 gap-4'>
            {data.map((doc) => (
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
