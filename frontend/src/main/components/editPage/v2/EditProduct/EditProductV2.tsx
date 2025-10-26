import React, { useState } from 'react'
import styles from './EditProductV2.module.scss'
import { ProductModal } from './modals/CreateProductModal'
import Wrapper from '@/main/common/Wrapper'
import Typography from '@/main/common/Typography'
import Button from '@/main/common/Button'
import SearchBox from '@/main/common/SearchBox'
import Separator from '@/main/common/Separator'


type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description?: string;
  productUrl?: string;
};

export default function EditProductV2() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'クラシックバーガークラシックバーガークラシックバーガークラシックバーガークラシックバーガークラシックバーガークラシックバーガークラシックバーガー',
      category: 'ハンバーガー',
      price: 980,
      imageUrl: '/images/burger.jpg'
    },
    {
      id: '2',
      name: 'チーズバーガー',
      category: 'ハンバーガー',
      price: 1080,
      imageUrl: '/images/cheese-burger.jpg'
    },
    {
      id: '3',
      name: 'フライドポテト',
      category: 'サイドメニュー',
      price: 480,
      imageUrl: '/images/fries.jpg'
    },
    {
      id: '4',
      name: 'コーラ',
      category: 'ドリンク',
      price: 380,
      imageUrl: '/images/cola.jpg'
    },
    {
      id: '5',
      name: 'チキンナゲット',
      category: 'サイドメニュー',
      price: 580,
      imageUrl: '/images/nuggets.jpg'
    },
    {
      id: '6',
      name: 'アイスティー',
      category: 'ドリンク',
      price: 380,
      imageUrl: '/images/ice-tea.jpg'
    },
    {
      id: '7',
      name: 'ダブルバーガー',
      category: 'ハンバーガー',
      price: 1280,
      imageUrl: '/images/double-burger.jpg'
    },
    {
      id: '8',
      name: 'オニオンリング',
      category: 'サイドメニュー',
      price: 480,
      imageUrl: '/images/onion-rings.jpg'
    },
    {
      id: '9',
      name: 'レモネード',
      category: 'ドリンク',
      price: 480,
      imageUrl: '/images/lemonade.jpg'
    },
    {
      id: '10',
      name: 'チキンバーガー',
      category: 'ハンバーガー',
      price: 880,
      imageUrl: '/images/chicken-burger.jpg'
    }
  ])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSubmitProduct = async (data: {
    name: string;
    category: string;
    price: string;
    description?: string;
    productUrl?: string;
  }) => {
    if (selectedProduct) {
      // TODO: 商品更新の処理を実装
      console.log('Updated product:', { ...selectedProduct, ...data })
    } else {
      // TODO: 商品作成の処理を実装
      console.log('Created product:', data)
    }
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      // TODO: 商品削除の処理を実装
      console.log('Deleted product:', selectedProduct)
    }
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Wrapper direction="col" gap="2rem" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
      <Wrapper direction="col" gap="2rem">
        <Typography content="商品を編集" color="primary" size="medium" />
        <Wrapper justify="justify-between" align="align-center">
          <Wrapper gap="4rem" align="align-center">
            <Wrapper
              align="align-center"
              gap="8px"
            >
              <SearchBox
                value={searchQuery}
                onChange={handleSearch}
                placeholder="ジャンルを検索"
                width="100%"
              />
            </Wrapper>
            <Button
              bgColor="primary"
              padding="0.7rem 1.8rem"
              onClick={handleAddProduct}
            >
              <Typography content="商品を追加" color="primary" size="normal" weight="normal" />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <Separator width="100%" borderWidth='2px' />

      <Wrapper className={styles.product_container} gap="24px">
        {filteredProducts.map((product) => (
          <Wrapper
            key={product.id}
            direction="col"
            className={styles.product_card}
            gap="12px"
            padding="12px"
            onClick={() => handleEditProduct(product)}
          >
            <Wrapper
              className={styles.genre_tag}
              padding="4px 8px"
              justify="justify-center"
              direction="col"
              gap="10px"
            >
              <Typography content={product.category} color="black" size="xsmall" weight="normal" />
              <Wrapper
                className={styles.product_image}
                justify="justify-center"
                align="align-center"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.image}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper direction="col" gap="4px">
              <Typography
                content={product.name}
                color="black"
                size="normal"
                weight="normal"
                className={styles.product_name}
              />
              <Typography
                content={`¥${product.price.toLocaleString()}`}
                color="gray"
                size="normal"
                weight="normal"
                className={styles.product_price}
              />
            </Wrapper>
          </Wrapper>
        ))}
      </Wrapper>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
        onSubmit={handleSubmitProduct}
        onDelete={selectedProduct ? handleDeleteProduct : undefined}
        mode={selectedProduct ? 'edit' : 'create'}
        initialValues={selectedProduct ? {
          name: selectedProduct.name,
          category: selectedProduct.category,
          price: selectedProduct.price.toString(),
          description: selectedProduct.description,
          productUrl: selectedProduct.productUrl,
          imageUrl: selectedProduct.imageUrl
        } : undefined}
      />
    </Wrapper>
  )
}
