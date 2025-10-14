import { useContext, useMemo, useState, useEffect } from 'react'
import { useSelectStore } from '../SelectStore/useSelectStore'
import { useSelectService } from '../SelectService/useSelectService'
import PostContentConfirm from './PostContentConfirm'
import usePostContentForm from './usePostContentForm'
import { GoogleLocationLocalPostRequest } from '@/types/apiModel'
import { GoogleAccountsContext } from '@/main/contexts/GoogleAccountsContext'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'


export default function SchedulePost() {
  const googleRepository = useGoogleRepository()
  const { selectedAccount } = useContext(GoogleAccountsContext)
  const [mode, setMode] = useState<'selectStore' | 'selectService' | 'schedulePost' | 'confirmPost'>('selectStore')

  useEffect(() => {
    if (selectedAccount?.accountName) {
      googleRepository.syncGoogleStore(selectedAccount.accountName)
    }
  }, [selectedAccount?.accountName])

  const { selectedBranches, selectStoreRender } = useSelectStore({
    onNextClick: () => setMode('selectService'),
    onBackClick: () => {}
  })

  const selectedStores = useMemo(() => selectedBranches.map((branch) => branch.name), [selectedBranches])

  const { selectedServiceForms, selectServiceRender } = useSelectService({
    selectedStores,
    onNextClick: () => setMode('schedulePost'),
    onBackClick: () => setMode('selectStore')
  })

  const selectedServices = useMemo(() => selectedServiceForms.map(service => {
    const name = service.label
    const option = service.options[0].label
    const languages = service.languages.map(lang => lang.label).join(', ')
    return `${name} | ${option} | ${languages}`
  }), [selectedServiceForms])

  const { formState, render: renderFormContent, uploadedPhotoFileList } = usePostContentForm({
    selectedStores,
    selectedServices,
    onEditSelectStore: () => setMode('selectStore'),
    onEditSelectService: () => setMode('selectService'),
    onNext: () => setMode('confirmPost')
  })

  return (
    <>
      {mode === 'selectStore' && selectStoreRender()}
      {mode === 'selectService' && selectServiceRender()}
      {mode === 'schedulePost' && renderFormContent()}
      {mode === 'confirmPost' && (
        <PostContentConfirm
          selectedStores={selectedStores}
          selectedServices={selectedServices}
          formState={formState}
          uploadedPhotoFileList={uploadedPhotoFileList}
          onEdit={() => setMode('schedulePost')}
          onSubmit={async () => {
            try {
              // 選択された全てのブランチのIDを配列で取得
              const locationIdList = selectedBranches.map(branch => branch.id)

              // 投稿内容を作成（単一のオブジェクト）
              const localPost: GoogleLocationLocalPostRequest = {
                summary: formState.content,
                alertType: 'STANDARD',
                topicType: 'STANDARD'
              }

              const accountId = selectedAccount?.accountName
              if (!accountId) {
                throw new Error('Account ID is required')
              }

              // 一度のAPI呼び出しで全ての店舗に投稿
              await googleRepository.postLocationLocalPostBulk(
                accountId,
                locationIdList,
                localPost,
                uploadedPhotoFileList || new DataTransfer().files
              )

              // 成功時の処理
              alert('投稿が正常に送信されました')

              // TODO: 投稿成功後の画面遷移やリセット処理を追加
              setMode('selectStore')

            } catch (error) {
              console.error('投稿エラー:', error)
              alert('投稿の送信中にエラーが発生しました')
            }
          }}
        />
      )}
    </>
  )
}
