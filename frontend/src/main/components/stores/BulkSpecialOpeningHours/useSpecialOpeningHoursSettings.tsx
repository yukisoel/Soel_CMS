import { useState } from 'react';
import SpecialOpeningHoursSettings, { TimeRange } from './SpecialOpeningHoursSettings';

type Props = {
    selectedStores: string[];
    onNextClick: () => void;
    onBackClick: () => void;
}

export const useSpecialOpeningHoursSettings = ({onNextClick, onBackClick, selectedStores}: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeRanges, setTimeRanges] = useState<TimeRange[]>([{ start: null, end: null }]);

    const render = () => (
        <SpecialOpeningHoursSettings
            selectedStores={selectedStores}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            timeRanges={timeRanges}
            setTimeRanges={setTimeRanges}
            onNextClick={onNextClick}
            onBackClick={onBackClick}
        />
    )

    return {
        selectedDate,
        timeRanges,
        render
    };
};
