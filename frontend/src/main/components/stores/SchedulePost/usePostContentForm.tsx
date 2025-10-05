import { useState } from 'react'
import PostContentForm, { Form } from './PostContentForm'
import useFileUpload from '@/main/common/FileUpload/useFileUpload'

type Props = {
    selectedStores: string[];
    selectedServices: string[];
    onEditSelectStore: () => void;
    onEditSelectService: () => void;
    onNext: () => void;
};

export default function usePostContentForm({ selectedStores, selectedServices, onEditSelectStore, onEditSelectService, onNext }: Props) {
  const [formState, setFormState] = useState<Form>({
    content: '',
    hashtags: '',
    tagStore: false,
    tagLocation: false,
    schedulePost: false,
    selectedDate: null,
    selectedTime: null
  })

  const { render: renderFileUpload, uploadedPhotoFileList } = useFileUpload({ size: 'regular' })

  const setField = (field: string, value: string | boolean | Date | null) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  const render = () => (
    <PostContentForm
      selectedStores={selectedStores}
      selectedServices={selectedServices}
      onEditSelectStore={onEditSelectStore}
      onEditSelectService={onEditSelectService}
      onNext={onNext}
      formState={formState}
      setField={setField}
      renderFileUpload={renderFileUpload}
    />
  )

  return {
    formState,
    setField,
    render,
    renderFileUpload,
    uploadedPhotoFileList
  }
}
