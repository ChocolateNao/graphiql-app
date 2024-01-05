import { useAppSelector } from 'hooks/redux-hooks';

import { GraphQLSchema } from 'models/GraphQLSchema.interface';
import { RootState } from 'shared/store/store';

import DocsMain from './DocsMainPage/DocsMainPage';
import DocsTypePage from './DocsTypePage/DocsTypePage';

import styles from './Documentation.module.scss';

function Documentation() {
  const selectPage = (state: RootState) => state.docs.targetName;
  const selectType = (state: RootState) => state.docs.targetType;
  const selectMethod = (state: RootState) => state.docs.method;
  const selectIsConnected = (state: RootState) => state.endpoint.isConnected;
  const selectTakenSchema = (state: RootState) => state.endpoint.takenSchema;

  const page = useAppSelector(selectPage);
  const type = useAppSelector(selectType);
  const isConnected = useAppSelector(selectIsConnected);
  const schema: GraphQLSchema | null = useAppSelector(selectTakenSchema);
  const method = useAppSelector(selectMethod);

  const isIndexPage = (page: string) => page === 'index';

  return (
    <div className={styles.docs__innerWrapper}>
      <h1 className={styles.docs__title}>Documentation</h1>
      {isConnected && schema && isIndexPage(page) && (
        <DocsMain schema={schema} />
      )}
      {isConnected && schema && !isIndexPage(page) && (
        <DocsTypePage schema={schema} page={page} method={method} type={type} />
      )}
      {!isConnected && (
        <div className={styles.docs__error_wrapper}>
          <div className={styles.docs__error_img} />
          <h2>API is not connected</h2>
        </div>
      )}
    </div>
  );
}

export default Documentation;
