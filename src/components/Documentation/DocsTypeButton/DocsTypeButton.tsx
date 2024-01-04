import { useActions } from 'hooks/redux-hooks';

import { SchemaField } from 'models/GraphQLSchema.interface';

import styles from './DocsTypeButton.module.scss';

interface DocsButtonProps {
  field: SchemaField;
}

function DocsTypeButton(props: DocsButtonProps) {
  const { field } = props;
  const { setDocsPage } = useActions();

  const handleClick = () => {
    setDocsPage(field.name);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.docs__typeBtn}
    >
      <span>{field.name}:</span>
      {field.type?.kind === 'OBJECT' && <span>{field.type.name}</span>}
      {field.type?.kind === 'LIST' && field.type?.ofType.kind === 'OBJECT' && (
        <span>[{field.type?.ofType.name}]</span>
      )}
      {field.type?.kind === 'LIST' && field.type?.ofType.kind === 'LIST' && (
        <span>[[{field.type?.ofType.ofType.name}]]</span>
      )}
    </button>
  );
}

export default DocsTypeButton;
