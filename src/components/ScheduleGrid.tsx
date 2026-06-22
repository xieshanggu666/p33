import { useDroppable } from '@dnd-kit/core';
import { useMemo } from 'react';
import { ScheduleEntry, GridCell } from '../types';
import { daysOfWeek, timeSlots, teachers, courses } from '../data/mockData';
import { getWeekDateRange, formatDate, getDateForDayOfWeek } from '../utils/dateUtils';

interface ScheduleGridProps {
  weekOffset: number;
  schedule: ScheduleEntry[];
  selectedCourseId: string | null;
  onRemoveEntry: (entryId: string) => void;
}

function GridCellComponent({
  cell,
  weekOffset,
  entry,
  selectedCourseId,
  onRemoveEntry,
}: {
  cell: GridCell;
  weekOffset: number;
  entry?: ScheduleEntry;
  selectedCourseId: string | null;
  onRemoveEntry: (entryId: string) => void;
}) {
  const cellId = `cell-${cell.dayOfWeek}-${cell.timeSlotId}-${weekOffset >= 0 ? weekOffset : `n${Math.abs(weekOffset)}`}`;
  const { isOver, setNodeRef } = useDroppable({
    id: cellId,
    data: {
      type: 'grid-cell',
      cell,
      weekOffset,
    },
  });

  const teacher = entry ? teachers.find((t) => t.id === entry.teacherId) : undefined;
  const course = entry ? courses.find((c) => c.id === entry.courseId) : undefined;

  const isHighlighted = useMemo(() => {
    if (!selectedCourseId || !entry) return true;
    return entry.courseId === selectedCourseId;
  }, [selectedCourseId, entry]);

  const isToday = useMemo(() => {
    const weekInfo = getWeekDateRange(weekOffset);
    const cellDate = getDateForDayOfWeek(weekInfo.start, cell.dayOfWeek);
    const today = new Date();
    return (
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear()
    );
  }, [cell.dayOfWeek, weekOffset]);

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[120px] p-2 border border-gray-200 transition-all duration-200
        ${entry ? 'bg-white' : 'bg-gray-50 hover:bg-blue-50'}
        ${isOver ? 'ring-2 ring-blue-500 ring-inset bg-blue-100' : ''}
        ${isToday ? 'border-blue-400' : ''}
        ${selectedCourseId && entry && !isHighlighted ? 'opacity-30' : ''}
        ${selectedCourseId && entry && isHighlighted ? 'ring-2 ring-yellow-400 ring-inset' : ''}
      `}
    >
      {entry && teacher && course ? (
        <div
          className="h-full rounded-lg p-3 text-white cursor-pointer hover:shadow-lg transition-shadow relative group"
          style={{ backgroundColor: course.color }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('确定要删除这节课吗？')) {
                onRemoveEntry(entry.id);
              }
            }}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
          >
            ×
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">{teacher.avatar}</span>
            <div>
              <div className="font-semibold">{teacher.name}</div>
              <div className="text-sm opacity-90">{course.name}</div>
            </div>
          </div>
          <div className="mt-2 text-xs opacity-80">
            {daysOfWeek.find((d) => d.id === cell.dayOfWeek)?.name}{' '}
            {timeSlots.find((t) => t.id === cell.timeSlotId)?.name}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
          空闲
        </div>
      )}
    </div>
  );
}

export function ScheduleGrid({
  weekOffset,
  schedule,
  selectedCourseId,
  onRemoveEntry,
}: ScheduleGridProps) {
  const weekInfo = useMemo(() => getWeekDateRange(weekOffset), [weekOffset]);

  const getEntryForCell = (cell: GridCell): ScheduleEntry | undefined => {
    return schedule.find(
      (entry) =>
        entry.dayOfWeek === cell.dayOfWeek &&
        entry.timeSlotId === cell.timeSlotId &&
        entry.weekOffset === weekOffset
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
      <div className="flex-1 overflow-auto p-4">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-0 mb-2">
            <div className="p-3 text-center font-semibold text-gray-600 bg-gray-100 rounded-tl-lg border border-gray-200">
              时间段
            </div>
            {daysOfWeek.map((day) => {
              const date = getDateForDayOfWeek(weekInfo.start, day.id);
              const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear();
              return (
                <div
                  key={day.id}
                  className={`p-3 text-center font-semibold border border-gray-200 ${
                    isToday
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  } ${day.id === 7 ? 'rounded-tr-lg' : ''}`}
                >
                  <div>{day.shortName}</div>
                  <div className="text-xs font-normal">{formatDate(date)}</div>
                </div>
              );
            })}
          </div>

          {timeSlots.map((slot, slotIndex) => (
            <div key={slot.id} className="grid grid-cols-8 gap-0">
              <div
                className={`p-3 flex flex-col items-center justify-center bg-gray-50 border border-gray-200 font-medium text-gray-700 ${
                  slotIndex === timeSlots.length - 1 ? 'rounded-bl-lg' : ''
                }`}
              >
                <span className="text-lg">{slot.name}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {slot.startTime}-{slot.endTime}
                </span>
              </div>
              {daysOfWeek.map((day, dayIndex) => {
                const cell: GridCell = {
                  dayOfWeek: day.id,
                  timeSlotId: slot.id,
                };
                const entry = getEntryForCell(cell);
                const isLastCell =
                  slotIndex === timeSlots.length - 1 && dayIndex === daysOfWeek.length - 1;
                return (
                  <GridCellComponent
                    key={`${day.id}-${slot.id}`}
                    cell={cell}
                    weekOffset={weekOffset}
                    entry={entry}
                    selectedCourseId={selectedCourseId}
                    onRemoveEntry={onRemoveEntry}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded" />
            <span className="text-gray-600">空闲</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span className="text-gray-600">已排课</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded" />
            <span className="text-gray-600">今天</span>
          </div>
          {selectedCourseId && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-200 ring-2 ring-yellow-400 rounded" />
              <span className="text-gray-600">筛选高亮</span>
            </div>
          )}
        </div>
        <div className="text-gray-500">
          共 {schedule.filter((s) => s.weekOffset === weekOffset).length} 节课
        </div>
      </div>
    </div>
  );
}
