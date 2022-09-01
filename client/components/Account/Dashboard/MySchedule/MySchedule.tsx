import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enGB from 'date-fns/locale/en-GB';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface MyScheduleProps {}

const locales = {
  'en-GB': enGB,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const MySchedule: React.FC<MyScheduleProps> = ({}) => {
  // TODO: Possibly add custom styling https://github.com/jquense/react-big-calendar#custom-styling
  // TODO: Possibly add drag & drop capabilities
  // https://github.com/christopher-caldwell/react-big-calendar-demo/blob/master/src/App.tsx
  //  http://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/about-big-calendar--page
  return (
    <div className="col-span-5 flex flex-col ">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-[#2b3042]">My Schedule</h3>
        </div>
        <div>
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            View all
          </button>
        </div>
      </div>
      <div className="shadow mt-5 rounded-lg cursor-pointer pt-4 pr-4 flex-1 justify-center items-center bg-[#fafafa]">
        <Calendar
          localizer={localizer}
          // events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
};
