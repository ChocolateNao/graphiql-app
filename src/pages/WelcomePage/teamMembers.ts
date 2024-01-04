import { TeamMember } from 'models/TeamMember.interface';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'teamMembersCard.andrey.name',
    role: 'teamMembersCard.andrey.role',
    bio: 'teamMembersCard.andrey.bio',
    photo: 'jpg/team/andrey.jpg',
    contributions: [
      'teamMembersCard.andrey.contributions.repo',
      'teamMembersCard.andrey.contributions.vercel',
      'teamMembersCard.andrey.contributions.locales',
      'teamMembersCard.andrey.contributions.tests',
      'teamMembersCard.andrey.contributions.design',
      'teamMembersCard.andrey.contributions.store',
      'teamMembersCard.andrey.contributions.finals',
    ],
    github: 'https://github.com/ChocolateNao',
  },
  {
    id: 2,
    name: 'teamMembersCard.tatiana.name',
    role: 'teamMembersCard.tatiana.role',
    bio: 'teamMembersCard.tatiana.bio',
    photo: 'jpg/team/tatiana.jpg',
    contributions: [
      'teamMembersCard.tatiana.contributions.registration',
      'teamMembersCard.tatiana.contributions.router',
      'teamMembersCard.tatiana.contributions.layout',
      'teamMembersCard.tatiana.contributions.editorsFunctionality',
      'teamMembersCard.tatiana.contributions.queryPrettifying',
      'teamMembersCard.tatiana.contributions.formValidation',
    ],
    github: 'https://github.com/tatsianaSauko',
  },
  {
    id: 3,
    name: 'teamMembersCard.evgeniy.name',
    role: 'teamMembersCard.evgeniy.role',
    bio: 'teamMembersCard.evgeniy.bio',
    photo: 'jpg/team/evgeniy.jpg',
    contributions: [
      'teamMembersCard.evgeniy.contributions.editor',
      'teamMembersCard.evgeniy.contributions.reqHandler',
      'teamMembersCard.evgeniy.contributions.apiInput',
      'teamMembersCard.evgeniy.contributions.store',
      'teamMembersCard.evgeniy.contributions.headersVars',
      'teamMembersCard.evgeniy.contributions.documentation',
    ],
    github: 'https://github.com/sylphur',
  },
];

export default teamMembers;
