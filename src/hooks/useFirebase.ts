import { useState, useEffect } from 'react';
import { getProducts, addProduct as addProductLib, updateProduct, deleteProduct } from '../lib/productFirebase';
import { getBlogPosts, addBlogPost as addBlogPostLib, updateBlogPost, deleteBlogPost } from '../lib/blogFirebase';
import { Product } from '../data/products';
import { BlogPost } from '../data/blog';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = getProducts(
      (productsData) => {
        setProducts(productsData);
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      await addProductLib(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateProductData = async (id: string, productData: Partial<Product>) => {
    try {
      await updateProduct(id, productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteProductData = async (id: string) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return { products, loading, error, addProduct, updateProduct: updateProductData, deleteProduct: deleteProductData };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = getBlogPosts(
      (blogsData) => {
        setBlogs(blogsData);
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const addBlog = async (blogData: Omit<BlogPost, 'id' | 'publishDate'>) => {
    try {
      await addBlogPostLib(blogData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateBlog = async (id: string, blogData: Partial<Omit<BlogPost, 'id' | 'publishDate'>>) => {
    try {
      await updateBlogPost(id, blogData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await deleteBlogPost(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return { blogs, loading, error, addBlog, updateBlog, deleteBlog };
};