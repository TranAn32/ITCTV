export interface ServiceItem {
  id: string;
  numberCode: string; // e.g. "01 / 08"
  title: string;
  summary: string;
  benefits: string[];
  techApplied: string[];
  steps: { title: string; desc: string }[];
  image_path?: string;
}

export interface PartnerItem {
  name: string;
  group: 'gov' | 'finance' | 'media';
  logo?: string;
  logoPlaceholder?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'gov' | 'maritime' | 'health' | 'tech' | 'province';
  scope: string; // ITC đảm nhận...
  techStack?: string[];
  value?: string;          // Giá trị hợp đồng thực hiện / Giá trị thực hiện
  packageValue?: string;   // Giá trị dự toán gói thầu (nếu có)
  details?: string[];     // Danh sách nội dung công việc chi tiết
  image_path?: string;
}

export interface TestimonialItem {
  id: string;
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  image_path: string;
  caption: string | null;
  created_at: string;
}

export interface RecruitmentItem {
  id: number;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string;
  salary_range: string | null;
  experience: string | null;
  deadline: string | null;
  description: string;
  requirements: string | null;
  benefits: string | null;
  created_at: string;
  updated_at: string;
}

export type ActivePage = 'home' | 'services' | 'projects' | 'gallery' | 'news' | 'news-detail' | 'recruitment' | 'contact';
