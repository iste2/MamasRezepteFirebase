export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
} 