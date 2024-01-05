import processVariables from 'utils/localizationVariables';

describe('Localization Variables Ulilities', () => {
  it('handles variables correctly if provided', () => {
    const mockString = 'Hello %person% from %master%';

    const result = processVariables(mockString, {
      person: 'Amogus',
      master: 'Master',
    });

    expect(result).toBe('Hello Amogus from Master');
  });

  it('logs error when variables are invalid', () => {
    const spy = jest.spyOn(console, 'error');
    const mockString = 'Hello %name%';

    const result = processVariables(mockString, { dsdsdsd: 'Amogus' });

    expect(result).toBe('Hello %name%');
    expect(spy).toHaveBeenCalled();
  });
});
