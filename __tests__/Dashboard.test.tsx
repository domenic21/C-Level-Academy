import React from 'react';
import { render } from '@testing-library/react';
import TimePicker from '@/app/components/TimePicker';
import { getDay, isEqual, isToday } from 'date-fns';
import clsx from 'clsx';

jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  isToday: jest.fn(),
}));

describe('TimePicker Component', () => {
  it('should apply the border class if the day is today', () => {

    (isToday as jest.Mock).mockReturnValue(true);


    const day = new Date();
    const canBook = true;
    const dayIdx = 0;
    const colStartClasses = ['col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];
    const handleDayClick = jest.fn();
    const selectedDay = null;


    const { getByRole } = render(
      <button
        disabled={!canBook}
        onClick={() => handleDayClick(day)}
        className={clsx(
          "uppercase  rounded-full mt-2 h-8 w-8 inline-flex items-center justify-center",
          dayIdx === 0 && colStartClasses[getDay(day)], canBook ? "bg-blue-500 text-white" : " text-gray-400",
          isToday(day) && "border-2 border-red-600 bg-white text-black",
          selectedDay && isEqual(day, selectedDay) ? "bg-green-300 text-black font-bold": ""
        )}
        key={day.toString()}
      />
    );


    const button = getByRole('button');

    expect(button).toHaveClass('border-2 border-red-600');
  });
});