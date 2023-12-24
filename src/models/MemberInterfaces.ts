export interface Member {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  contributions: string[];
  github: string;
}

export interface Props {
  member: Member;
}
