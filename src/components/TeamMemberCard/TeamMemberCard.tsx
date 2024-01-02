import { Props } from 'models/Member.interfaces';

import styles from './TeamMemberCard.module.scss';

function TeamMemberCard({ member }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <img src={member.photo} alt={member.name} />
      </div>
      <div className={styles.card_body}>
        <p className={styles.card_title}>{member.name}</p>
        <p className={styles.card_team_member_subtitle}>{member.role}</p>
        <p className={styles.card_team_member_bio}>{member.bio}</p>
        <ul className={styles.contributions_list}>
          {member.contributions.map((contribution) => (
            <li key={contribution} className={styles.contribution_item}>
              {contribution}
            </li>
          ))}
        </ul>
        <a
          className={styles.btn}
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        />
      </div>
    </div>
  );
}

export default TeamMemberCard;
