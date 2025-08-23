import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './PhotoSelector.module.scss'
import { useGoogleRepository } from '@/main/contexts/GoogleRepositoryContext'
import { GoogleLocationPhotoModel } from '@/main/model/LocationModel'
import { LocationAssociationName } from '@/main/model/LocationAssociationName'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'

type PhotoSelectorProps = {
  onPhotoSelect: (photo: GoogleLocationPhotoModel) => void;
  selectedPhoto?: GoogleLocationPhotoModel;
};

export const PhotoSelector: React.FC<PhotoSelectorProps> = ({
  onPhotoSelect,
  selectedPhoto
}) => {
  const [photoList, setPhotoList] = useState<GoogleLocationPhotoModel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>(LocationAssociationName.CATEGORY_UNSPECIFIED)

  const { accountId, locationId } = useParams()
  const googleRepository = useGoogleRepository()

  useEffect(() => {
    if (accountId && locationId) {
      setLoading(true)
      googleRepository.getLocationPhotos(accountId, locationId)
        .then(photos => {
          setPhotoList(photos)
          setError(null)
        })
        .catch(err => {
          setError('写真の取得に失敗しました')
          console.error(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [accountId, locationId, googleRepository])

  const filteredPhotos = photoList.filter(photo => {
    if (selectedCategory === LocationAssociationName.CATEGORY_UNSPECIFIED) {
      return true
    }
    return photo.locationAssociation?.category === selectedCategory
  })

  const categoryOptions = [
    { value: LocationAssociationName.FOOD_AND_DRINK, label: '食べ物・飲み物' },
    { value: LocationAssociationName.MENU, label: 'メニュー' },
    { value: LocationAssociationName.INTERIOR, label: '店内' },
    { value: LocationAssociationName.EXTERIOR, label: '外観' },
    { value: LocationAssociationName.PRODUCT, label: '商品' },
    { value: LocationAssociationName.CATEGORY_UNSPECIFIED, label: 'すべて' }
  ]

  if (loading) {
    return (
      <Wrapper justify="justify-center" align="align-center" style={{ minHeight: '200px' }}>
        <Typography content="写真を読み込み中..." size="small" color="secondary" />
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper justify="justify-center" align="align-center" style={{ minHeight: '200px' }}>
        <Typography content={error} size="small" color="error" />
      </Wrapper>
    )
  }

  return (
    <Wrapper direction="col" gap="1rem">
      <Wrapper align="align-center" gap="1rem">
        <Typography content="カテゴリー:" size="small" color="secondary" />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.categorySelect}
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Wrapper>

      {filteredPhotos.length === 0 ? (
        <Wrapper justify="justify-center" align="align-center" style={{ minHeight: '200px' }}>
          <Typography content="該当する写真が見つかりません" size="small" color="secondary" />
        </Wrapper>
      ) : (
        <Wrapper className={styles.photoGridContainer}>
          <Wrapper className={styles.photoGrid}>
            {filteredPhotos.map((photo, index) => (
              <Wrapper
                key={index}
                className={`${styles.photoItem} ${
                  selectedPhoto?.googleUrl === photo.googleUrl ? styles.selected : ''
                }`}
                onClick={() => onPhotoSelect(photo)}
              >
                <img
                  src={photo.googleUrl || photo.thumbnailUrl}
                  alt={`写真 ${index + 1}`}
                  className={styles.photoImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    if (target.src === photo.googleUrl && photo.thumbnailUrl) {
                      target.src = photo.thumbnailUrl
                    }
                  }}
                />
                {selectedPhoto?.googleUrl === photo.googleUrl && (
                  <Wrapper className={styles.selectedIndicator}>
                    <Wrapper className={styles.checkmark}>✓</Wrapper>
                  </Wrapper>
                )}
              </Wrapper>
            ))}
          </Wrapper>
        </Wrapper>
      )}
    </Wrapper>
  )
}
