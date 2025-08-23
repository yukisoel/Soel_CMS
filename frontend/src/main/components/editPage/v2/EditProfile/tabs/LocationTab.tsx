import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import styles from '../EditProfileLayoutV2.module.scss'
import { EditStorefrontAddressModal } from '../modals/EditStorefrontAddresModal'
import { EditServiceAreaModal } from '../modals/EditServiceAreaModal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import Loading from '@/main/common/Loading'
import { GoogleLocationProfileModel } from '@/types/apiModel.ts'
import { GoogleRepository } from '@/main/repositories/GoogleRepository'
import { useModal } from '@/main/common/Modal/useModal'
import { GoogleLocationStoreFrontAddressRequestAdministrativeArea } from '@/types/api.ts'
type Props = {
    profile: GoogleLocationProfileModel | null;
    fetchProfile: () => Promise<void>;
    googleRepository: GoogleRepository;
    isLoading?: boolean;
};

export default function LocationTab({
  profile,
  fetchProfile,
  googleRepository,
  isLoading = false
}: Props) {
  const { locationId } = useParams()
  const { isOpen: isAddressModal, openModal: openAddressModal, closeModal: closeAddressModal } = useModal()
  const { isOpen: isServiceAreaModal, openModal: openServiceAreaModal, closeModal: closeServiceAreaModal } = useModal()
  const handleAddressSave = async (data: { postalCode: string, prefecture: string, address: string }) => {
    await googleRepository.updateLocationProfileStorefrontAddress(locationId ?? '', {
      postalCode: data.postalCode,
      administrativeArea: data.prefecture as GoogleLocationStoreFrontAddressRequestAdministrativeArea,
      addressLines: data.address.split(' ')
    })
    await fetchProfile()
    closeAddressModal()
  }

  const handleServiceAreaSave = async (data: { serviceArea?: string, placeId?: string }) => {
    await googleRepository.updateLocationProfileServiceArea(locationId ?? '', [data.placeId ?? ''])
    await fetchProfile()
    closeServiceAreaModal()
  }

  const address = useMemo(() => {
    if (!profile) return ''
    const postalCode = profile?.storefrontAddress?.postalCode
    const administrativeArea = profile?.storefrontAddress?.administrativeArea
    const addressLines = profile?.storefrontAddress?.addressLines
    return `${postalCode} ${administrativeArea} ${addressLines?.join(' ')}`
  }, [profile])

  if (isLoading) {
    return <Loading message="所在地情報を更新中..." size="small" minHeight="200px" />
  }

  return (
    <Wrapper direction="col" gap="3rem" className={styles.main_content}>
      {/* 店舗の住所 */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="店舗の住所"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={address}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={openAddressModal}
          >
            <Typography
              content="編集"
              color="primary"
              size="normal"
            />
          </Button>
        </Wrapper>
      </Wrapper>

      {/* サービス提供地域 */}
      <Wrapper direction="col" gap="1rem">
        <Typography
          content="サービス提供地域"
          color="primary"
          size="normal"
        />
        <Wrapper className={styles.field_row}>
          <Wrapper className={styles.field_container}>
            <Typography
              content={profile?.serviceArea?.places?.placeInfos?.map(place => place.placeName).join('、') || ''}
              color="secondary"
              size="normal"
            />
          </Wrapper>
          <Button
            bgColor="primary"
            padding="0.5rem 1.8rem"
            onClick={openServiceAreaModal}
          >
            <Typography
              content="編集"
              color="primary"
              size="normal"
            />
          </Button>
        </Wrapper>
      </Wrapper>

      {/* 編集モーダル */}
      <EditStorefrontAddressModal
        isOpen={isAddressModal}
        onClose={closeAddressModal}
        onSubmit={handleAddressSave}
        initialValues={{
          postalCode: profile?.storefrontAddress?.postalCode ?? '',
          prefecture: profile?.storefrontAddress?.administrativeArea ?? '',
          address: profile?.storefrontAddress?.addressLines?.join(' ') ?? ''
        }}
      />
      <EditServiceAreaModal
        isOpen={isServiceAreaModal}
        onClose={closeServiceAreaModal}
        onSubmit={handleServiceAreaSave}
        initialValues={{
          serviceArea: profile?.serviceArea?.places?.placeInfos?.[0]?.placeName ?? '',
          placeId: profile?.serviceArea?.places?.placeInfos?.[0]?.placeId ?? ''
        }}
        googleRepository={googleRepository}
      />
    </Wrapper>
  )
}
