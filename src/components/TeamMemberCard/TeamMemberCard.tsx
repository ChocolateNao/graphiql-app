import { TeamMember } from 'models/TeamMember.interface';
import { useLocalization } from 'shared/context/LocalizationContext';

import styles from './TeamMemberCard.module.scss';

export interface TeamMemberCardProps {
  member: TeamMember;
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { t } = useLocalization();

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <img src={member.photo} alt={member.name} />
      </div>
      <div className={styles.card_body}>
        <p className={styles.card_title}>{t(member.name)}</p>
        <p className={styles.card_team_member_subtitle}>{t(member.role)}</p>
        <p className={styles.card_team_member_bio}>{t(member.bio)}</p>
        <ul className={styles.contributions_list}>
          {member.contributions.map((contribution) => (
            <li key={contribution} className={styles.contribution_item}>
              {t(contribution)}
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
