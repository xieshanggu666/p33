import { DragOverlay as DndDragOverlay } from '@dnd-kit/core';
import { Teacher } from '../types';
import { teachers, courses } from '../data/mockData';

interface DraggingTeacherCardProps {
  teacher: Teacher;
}

function DraggingTeacherCard({ teacher }: DraggingTeacherCardProps) {
  const teacherCourses = teacher.courses
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean);

  return (
    <div className="p-4 rounded-xl border-2 border-blue-500 bg-white shadow-2xl w-64 opacity-90">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{teacher.avatar}</div>
        <div className="flex-1">
          <div className="font-semibold text-gray-800">{teacher.name}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {teacherCourses.map((course) => (
              <span
                key={course?.id}
                className="text-xs px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: course?.color }}
              >
                {course?.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DragOverlayProps {
  activeId: string | null;
}

export function DragOverlay({ activeId }: DragOverlayProps) {
  if (!activeId || !activeId.startsWith('teacher-')) return null;

  const teacherId = activeId.replace('teacher-', '');
  const teacher = teachers.find((t) => t.id === teacherId);

  if (!teacher) return null;

  return (
    <DndDragOverlay>
      <DraggingTeacherCard teacher={teacher} />
    </DndDragOverlay>
  );
}
