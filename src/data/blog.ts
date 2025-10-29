export interface BlogPost {
  id: string;
  title: string;
  category: string; // New field for category
  mainImage: string;
  sections: Array<{
    type: 'paragraph' | 'heading' | 'image' | 'video' | 'points';
    content: string; // For paragraph, heading, image URL, YouTube watch URL, or bullet points (each line a point)
  }>;
  publishDate: string;
  author: string;
  shortDescription: string;
  featured?: boolean;
}
