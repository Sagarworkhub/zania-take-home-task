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
import { useCallback, useState } from 'react';

import { SortableCard } from './components/custom/sortable-card';

interface Document {
  position: string;
  type: string;
  title: string;
}

const initialDocuments: Array<Document> = [
  { position: '1', type: 'bank-draft', title: 'Bank Draft' },
  { position: '2', type: 'bill-of-lading', title: 'Bill of Lading' },
  { position: '3', type: 'invoice', title: 'Invoice' },
  { position: '4', type: 'bank-draft-2', title: 'Bank Draft 2' },
  { position: '5', type: 'bill-of-lading-2', title: 'Bill of Lading 2' },
];

export function App() {
  const [documents, setDocuments] = useState(initialDocuments);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setDocuments((items) => {
        const oldIndex = items.findIndex((item) => item.position === active.id);
        const newIndex = items.findIndex((item) => item.position === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

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
}
