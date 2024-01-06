import { Suspense } from 'react';
import { useAppSelector } from 'hooks/redux-hooks';

import Loader from 'components/Loader';
import { GraphQLSchema } from 'models/GraphQLSchema.interface';
import { useLocalization } from 'shared/context/LocalizationContext';
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

  const { t } = useLocalization();

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.docs__innerWrapper}>
        <h1 className={styles.docs__title}>{t('documentation.title')}</h1>
        {isConnected && schema && page === 'index' && (
          <DocsMain schema={schema} />
        )}
        {isConnected && schema && !isIndexPage(page) && (
          <DocsTypePage
            schema={schema}
            page={page}
            method={method}
            type={type}
          />
        )}
        {!isConnected && (
          <div className={styles.docs__error_wrapper}>
            <div className={styles.docs__error_img} />
            <h2>{t('documentation.errors.not-connected')}</h2>
          </div>
        )}
      </div>
    </Suspense>
  );
}

export default Documentation;
