import PageHero from '@/components/PageHero'
import ProductsSection from '@/components/ProductsSection'

export default function ProductsPage() {
  return (
    <>
      <PageHero page="products" />
      <ProductsSection showHeader={false} />
    </>
  )
}
