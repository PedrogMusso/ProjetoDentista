import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useEffect } from "react";

const CalendarComponentLib = () => {
    const calendarRef = useRef(null);

    useEffect(() => {
        if (calendarRef.current) {
            const calendar = new Calendar(calendarRef.current, {
                plugins: [timeGridPlugin],
                timeZone: 'local',
                locale: "pt-br",
                initialView: 'timeGridWeek',
                headerToolbar: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'timeGridWeek,timeGridDay'
                },
            });
            calendar.render();
        }
    }, []);

    return (
        <div
            ref={calendarRef}
            style={{ height: "88vh", width: "88vw", display: "flex" }}
        ></div>
    );
};

export default CalendarComponentLib;