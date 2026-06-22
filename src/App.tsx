import { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Toolbar } from './components/Toolbar';
import { TeacherList } from './components/TeacherList';
import { ScheduleGrid } from './components/ScheduleGrid';
import { ConflictModal } from './components/ConflictModal';
import { DragOverlay } from './components/DragOverlay';
import { useSchedule } from './hooks/useSchedule';
import { teachers } from './data/mockData';

function App() {
  const {
    schedule,
    weekOffset,
    setWeekOffset,
    selectedCourseId,
    setSelectedCourseId,
    conflictInfo,
    addSchedule,
    removeSchedule,
    resolveConflict,
    getTeacherWeeklyHours,
  } = useSchedule();

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);

      const { active, over } = event;
      if (!over) return;

      const activeId = active.id as string;
      const overData = over.data.current;

      if (!activeId.startsWith('teacher-') || !overData || overData.type !== 'grid-cell') {
        return;
      }

      const teacherId = activeId.replace('teacher-', '');
      const teacher = teachers.find((t) => t.id === teacherId);
      if (!teacher) return;

      const { cell, weekOffset: entryWeekOffset } = overData as {
        cell: { dayOfWeek: number; timeSlotId: string };
        weekOffset: number;
      };

      addSchedule(
        teacherId,
        teacher.courses[0],
        cell,
        entryWeekOffset
      );
    },
    [addSchedule]
  );

  const getWeeklyHours = useCallback(
    (teacherId: string) => getTeacherWeeklyHours(teacherId, weekOffset),
    [getTeacherWeeklyHours, weekOffset]
  );

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-gray-100">
        <Toolbar
          weekOffset={weekOffset}
          onWeekChange={setWeekOffset}
          selectedCourseId={selectedCourseId}
          onCourseSelect={setSelectedCourseId}
        />

        <div className="flex-1 flex overflow-hidden">
          <TeacherList teachers={teachers} getWeeklyHours={getWeeklyHours} />
          <ScheduleGrid
            weekOffset={weekOffset}
            schedule={schedule}
            selectedCourseId={selectedCourseId}
            onRemoveEntry={removeSchedule}
          />
        </div>

        <DragOverlay activeId={activeId} />

        {conflictInfo && (
          <ConflictModal conflictInfo={conflictInfo} onResolve={resolveConflict} />
        )}
      </div>
    </DndContext>
  );
}

export default App;
