import { useState } from 'react'
import SelectPhoto from './SelectPhoto'

type Props = {
    onNextClick: () => void;
    onBackClick: () => void;
};

export default function useSelectPhoto({ onNextClick, onBackClick }: Props) {
  const [selectedPhotoIndices, setSelectedPhotoIndices] = useState<number[]>([])

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndices(prevSelected =>
      prevSelected.includes(index)
        ? prevSelected.filter(i => i !== index)
        : [...prevSelected, index]
    )
  }

  const render = () => (
    <SelectPhoto
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      selectedPhotoIndices={selectedPhotoIndices}
      handlePhotoClick={handlePhotoClick}
    />
  )

  return {
    render,
    selectedPhotoIndices,
    handlePhotoClick
  }
}
