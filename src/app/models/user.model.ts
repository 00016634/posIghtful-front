export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  tenant_id: number;
  is_active: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login?: string;
  roles?: Role[];
}

export interface Role {
  id: number;
  name: 'AGENT' | 'MANAGER' | 'FINANCE' | 'ADMIN';
  description?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tenant_id?: number;
}
