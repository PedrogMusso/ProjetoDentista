// global.d.ts ou react-big-calendar.d.ts na raiz do projeto ou em uma pasta "types"
declare module "react-big-calendar" {
    import { ComponentType } from "react";
    // Declare as partes que você usa da lib (bem genéricas):
    export interface CalendarProps {
      localizer: any;
      events?: any[];
      startAccessor?: string | ((event: any) => Date);
      endAccessor?: string | ((event: any) => Date);
      style?: React.CSSProperties;
      [key: string]: any;
    }
    export const Calendar: ComponentType<CalendarProps>;
    // Declare o que mais precisar, ex: "momentLocalizer", etc.
    export function momentLocalizer(momentInstance: any): any;
  }