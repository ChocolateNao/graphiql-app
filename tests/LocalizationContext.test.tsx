import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LanguageSelect from 'components/LanguageSelect';
import LocalizationProvider, {
  useLocalization,
} from 'shared/context/LocalizationContext';

function AppWrapper() {
  const { t, setLocale } = useLocalization();
  setLocale('en_US');
  return (
    <LocalizationProvider>
      <LanguageSelect />
      <h1>{t('loading')}</h1>
      <div>{t('nested.firstNested')}</div>
    </LocalizationProvider>
  );
}

describe('Localization Context Component', () => {
  it('translates the content properly', async () => {
    render(<AppWrapper />);

    await waitFor(() => {
      expect(screen.getAllByText('loading'));
    });

    const selectEn = screen.getByText('en') as HTMLOptionElement;
    const selectRu = screen.getByText('ru') as HTMLOptionElement;

    fireEvent.click(selectEn);

    expect(selectRu).toBeInTheDocument();
  });
});
