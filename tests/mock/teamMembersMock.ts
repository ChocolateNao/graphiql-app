import { TeamMember } from 'models/TeamMember.interface';

const teamMembersMock: TeamMember[] = [
  {
    id: 1,
    name: 'Vasya Pupkin',
    role: 'The God',
    bio: "He's just a god",
    photo: 'mock_url',
    contributions: ['Existing', 'Something else'],
    github: 'https://github.com/VasyaPupkin',
  },
];

export default teamMembersMock;
