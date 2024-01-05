export const useActionsMock = jest.fn();

export const useAppSelectorMock = jest.fn();

useActionsMock.mockReturnValue({
  setVariables: jest.fn(),
  setHeaders: jest.fn(),
});

export { useActionsMock as useActions, useAppSelectorMock as useAppSelector };
