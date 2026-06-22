import { ConflictInfo } from '../types';
import { teachers, courses } from '../data/mockData';

interface ConflictModalProps {
  conflictInfo: ConflictInfo;
  onResolve: (overwrite: boolean) => void;
}

export function ConflictModal({ conflictInfo, onResolve }: ConflictModalProps) {
  const existingTeacher = teachers.find((t) => t.id === conflictInfo.existingEntry.teacherId);
  const existingCourse = courses.find((c) => c.id === conflictInfo.existingEntry.courseId);
  const newTeacher = teachers.find((t) => t.id === conflictInfo.newTeacherId);
  const newCourse = courses.find((c) => c.id === conflictInfo.newCourseId);

  const dayNames = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const timeSlotNames: Record<string, string> = {
    morning: '上午',
    afternoon: '下午',
    evening: '晚上',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-red-500 text-white p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="text-lg font-bold">排课冲突</h3>
              <p className="text-sm opacity-90">该时间段已有课程安排</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 text-center text-gray-600">
            <span className="font-semibold text-gray-800">
              {dayNames[conflictInfo.cell.dayOfWeek]}{' '}
              {timeSlotNames[conflictInfo.cell.timeSlotId]}
            </span>{' '}
            的课程安排如下：
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
              <div className="text-sm text-gray-500 font-medium w-16">当前</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{existingTeacher?.avatar}</span>
                <div>
                  <div className="font-semibold text-gray-800">
                    {existingTeacher?.name}
                  </div>
                  <div
                    className="text-sm px-2 py-0.5 rounded-full text-white inline-block mt-1"
                    style={{ backgroundColor: existingCourse?.color }}
                  >
                    {existingCourse?.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-gray-400 text-xl">↓</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="text-sm text-blue-600 font-medium w-16">新排</div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{newTeacher?.avatar}</span>
                <div>
                  <div className="font-semibold text-gray-800">{newTeacher?.name}</div>
                  <div
                    className="text-sm px-2 py-0.5 rounded-full text-white inline-block mt-1"
                    style={{ backgroundColor: newCourse?.color }}
                  >
                    {newCourse?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 text-center">
            是否要覆盖已有的课程安排？
          </p>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-3">
          <button
            onClick={() => onResolve(false)}
            className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => onResolve(true)}
            className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            覆盖原有课程
          </button>
        </div>
      </div>
    </div>
  );
}
