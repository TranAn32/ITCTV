export interface ServiceItem {
  id: string;
  numberCode: string; // e.g. "01 / 08"
  title: string;
  summary: string;
  benefits: string[];
  techApplied: string[];
  steps: { title: string; desc: string }[];
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
}

export interface TestimonialItem {
  id: string;
  content: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}

export type ActivePage = 'home' | 'services' | 'projects' | 'contact';
