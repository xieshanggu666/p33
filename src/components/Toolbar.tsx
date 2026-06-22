import { useMemo } from 'react';
import { getWeekDateRange, formatDate } from '../utils/dateUtils';
import { courses } from '../data/mockData';

interface ToolbarProps {
  weekOffset: number;
  onWeekChange: (offset: number) => void;
  selectedCourseId: string | null;
  onCourseSelect: (courseId: string | null) => void;
}

export function Toolbar({
  weekOffset,
  onWeekChange,
  selectedCourseId,
  onCourseSelect,
}: ToolbarProps) {
  const weekInfo = useMemo(() => getWeekDateRange(weekOffset), [weekOffset]);

  const getWeekLabel = () => {
    if (weekOffset === 0) return '本周';
    if (weekOffset === 1) return '下周';
    if (weekOffset === -1) return '上周';
    return `${weekOffset > 0 ? '+' : ''}${weekOffset}周`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800">排课管理系统</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onWeekChange(weekOffset - 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
          >
            ← 上一周
          </button>
          <div className="text-center min-w-[200px]">
            <div className="text-sm text-gray-500">
              第 {weekInfo.weekNumber} 周 · {getWeekLabel()}
            </div>
            <div className="text-base font-semibold text-gray-800">
              {formatDate(weekInfo.start)} - {formatDate(weekInfo.end)}
            </div>
          </div>
          <button
            onClick={() => onWeekChange(weekOffset + 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
          >
            下一周 →
          </button>
          {weekOffset !== 0 && (
            <button
              onClick={() => onWeekChange(0)}
              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-sm"
            >
              返回本周
            </button>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">课程筛选：</label>
          <select
            value={selectedCourseId || ''}
            onChange={(e) => onCourseSelect(e.target.value || null)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
          >
            <option value="">全部课程</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
