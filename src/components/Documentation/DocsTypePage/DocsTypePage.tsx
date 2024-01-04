import { useActions } from 'hooks/redux-hooks';

import { GraphQLSchema } from 'models/GraphQLSchema.interface';

import style from '../Documentation.module.scss';

interface DocsTypePageProps {
  schema: GraphQLSchema;
  page: string;
}

function DocsTypePage(props: DocsTypePageProps) {
  const { schema, page } = props;
  const { setDocsPage } = useActions();
  const backText = '<<< return';
  const handleReturn = () => {
    setDocsPage('index');
  };

  return (
    <>
      <button
        type="button"
        onClick={handleReturn}
        className={style.docs__returnBtn}
      >
        {backText}
      </button>
      <p>Page: {page}</p>
      <p>Element: {schema.data.__schema.queryType?.name}</p>
    </>
  );
}

export default DocsTypePage;
// ТУДУ
// РЕЮзабл компонент на ссылку на тип
