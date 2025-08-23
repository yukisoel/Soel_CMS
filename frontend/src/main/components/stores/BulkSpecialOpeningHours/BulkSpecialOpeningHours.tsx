import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { useSelectStore } from '../SelectStore/useSelectStore'
import SpecialOpeningHourList from './SpecialOpeningHourList'
import { useSpecialOpeningHoursSettings } from './useSpecialOpeningHoursSettings'
import SpecialOpeningHourConfirm from './SpecialOpeningHourConfirm'


export default function BulkSpecialOpeningHours() {
  const [mode, setMode] = useState<'list' | 'selectStore' | 'selectHours' | 'confirm'>('list')

  const { selectedBranches, selectStoreRender } = useSelectStore({
    onNextClick: () => setMode('selectHours'),
    onBackClick: () => setMode('list')
  })

  const selectedStores = useMemo(() => selectedBranches.map((branch) => branch.name), [selectedBranches])

  const { selectedDate, timeRanges, render: hoursSettingsRender } = useSpecialOpeningHoursSettings({
    selectedStores,
    onNextClick: () => setMode('confirm'),
    onBackClick: () => setMode('selectStore')
  })

  const formattedDate = useMemo(() => {
    return selectedDate ? format(selectedDate, 'yyyy年MM月dd日') : ''
  }, [selectedDate])

  const formattedTimeRanges = useMemo(() => {
    return timeRanges.map(({ start, end }) => {
      const formattedStart = start ? format(start, 'HH:mm') : '未設定'
      const formattedEnd = end ? format(end, 'HH:mm') : '未設定'
      return `${formattedStart} ~ ${formattedEnd}`
    })
  }, [timeRanges])

  return (
    <>
      {mode === 'list' && (
        <SpecialOpeningHourList onNextClick={() => setMode('selectStore')} />
      )}
      {mode === 'selectStore' && selectStoreRender()}
      {mode === 'selectHours' && (
        hoursSettingsRender()
      )}
      {
        mode === 'confirm' && (
          <SpecialOpeningHourConfirm
            selectedStores={selectedStores}
            selectedDate={formattedDate}
            timeRanges={formattedTimeRanges}
            onNextClick={() => {}}
            onBackClick={() => setMode('selectHours')}
            onStoreEditClick={() => setMode('selectStore')}
          />
        )
      }
    </>
  )
}
