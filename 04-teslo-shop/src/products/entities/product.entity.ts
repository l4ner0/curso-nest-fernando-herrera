import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '07576c85-fb6a-493c-b1cf-7a6fcc34db92',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: "Men's Turbine Short Sleeve Tee",
    description: 'Product title',
    uniqueItems:  true
  })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({
    example: 40,
    description: 'Product price'
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
    description: 'Product description',
    default: null
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 'men_turbine_short_sleeve_tee',
    description: 'Product SLUG - for SEO',
    uniqueItems:  true
  })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({
    example: 50,
    description: 'Product stock',
    default:  0
  })
  @Column('int')
  stock: number;

  @ApiProperty({
    example: ["M","L","XL","XXL"],
    description: 'Product sizes',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    {eager: true}
  )
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
