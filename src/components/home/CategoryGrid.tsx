import { Container } from '@/components/ui/Container';
import { CategoryCard } from './CategoryCard';
import { categories } from '@/lib/constants';

export function CategoryGrid() {
  return (
    <section className="pb-16" id="categories">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
