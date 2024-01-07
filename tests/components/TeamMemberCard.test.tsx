import { render, screen } from '@testing-library/react';

import TeamMemberCard from 'components/TeamMemberCard';

import teamMembersMock from '../mock/teamMembersMock';

describe('TeamMemberCard Component', () => {
  it('renders the correct card info', () => {
    render(
      <div>
        {teamMembersMock.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    );

    const element = screen.getByText(/Vasya Pupkin/i);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'mock_url');
    expect(element).toBeInTheDocument();
  });
});
