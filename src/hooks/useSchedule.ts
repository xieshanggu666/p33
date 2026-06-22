import { useState, useCallback } from 'react';
import { ScheduleEntry, GridCell, ConflictInfo } from '../types';
import { initialSchedule } from '../data/mockData';

export function useSchedule() {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(initialSchedule);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [conflictInfo, setConflictInfo] = useState<ConflictInfo | null>(null);

  const findEntry = useCallback(
    (cell: GridCell, currentWeekOffset: number): ScheduleEntry | undefined => {
      return schedule.find(
        (entry) =>
          entry.dayOfWeek === cell.dayOfWeek &&
          entry.timeSlotId === cell.timeSlotId &&
          entry.weekOffset === currentWeekOffset
      );
    },
    [schedule]
  );

  const addSchedule = useCallback(
    (
      teacherId: string,
      courseId: string,
      cell: GridCell,
      currentWeekOffset: number,
      overwrite: boolean = false
    ) => {
      const existingEntry = findEntry(cell, currentWeekOffset);
      
      if (existingEntry && !overwrite) {
        setConflictInfo({
          cell,
          existingEntry,
          newTeacherId: teacherId,
          newCourseId: courseId,
        });
        return false;
      }

      setSchedule((prev) => {
        let newSchedule = prev.filter(
          (entry) =>
            !(
              entry.dayOfWeek === cell.dayOfWeek &&
              entry.timeSlotId === cell.timeSlotId &&
              entry.weekOffset === currentWeekOffset
            )
        );

        const newEntry: ScheduleEntry = {
          id: `sched-${Date.now()}`,
          teacherId,
          courseId,
          dayOfWeek: cell.dayOfWeek,
          timeSlotId: cell.timeSlotId,
          weekOffset: currentWeekOffset,
        };

        return [...newSchedule, newEntry];
      });

      return true;
    },
    [findEntry]
  );

  const removeSchedule = useCallback((entryId: string) => {
    setSchedule((prev) => prev.filter((entry) => entry.id !== entryId));
  }, []);

  const resolveConflict = useCallback(
    (overwrite: boolean) => {
      if (!conflictInfo) return;

      if (overwrite) {
        addSchedule(
          conflictInfo.newTeacherId,
          conflictInfo.newCourseId,
          conflictInfo.cell,
          weekOffset,
          true
        );
      }

      setConflictInfo(null);
    },
    [conflictInfo, weekOffset, addSchedule]
  );

  const getTeacherWeeklyHours = useCallback(
    (teacherId: string, currentWeekOffset: number): number => {
      return schedule.filter(
        (entry) => entry.teacherId === teacherId && entry.weekOffset === currentWeekOffset
      ).length;
    },
    [schedule]
  );

  return {
    schedule,
    weekOffset,
    setWeekOffset,
    selectedCourseId,
    setSelectedCourseId,
    conflictInfo,
    setConflictInfo,
    findEntry,
    addSchedule,
    removeSchedule,
    resolveConflict,
    getTeacherWeeklyHours,
  };
}
