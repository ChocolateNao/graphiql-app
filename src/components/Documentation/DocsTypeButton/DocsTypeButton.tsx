import { useActions } from 'hooks/redux-hooks';

import { SchemaField, SchemaInputValue } from 'models/GraphQLSchema.interface';
import GraphQLMethod from 'shared/enums/GraphQLMethod';
import GraphQLType from 'shared/enums/GraphQLType';

import styles from './DocsTypeButton.module.scss';

interface DocsButtonProps {
  field: SchemaField | SchemaInputValue;
  method: GraphQLMethod;
}

function DocsTypeButton(props: DocsButtonProps) {
  const { field, method } = props;
  const { setDocsTargetName, setDocsTargetType, setDocsMethod } = useActions();
  const getTypoTripleDepth = () => {
    return `[${field.type?.ofType.ofType.ofType.name}!]!`;
  };

  const getTypoDoubleDepth = () => {
    if (
      field.type?.ofType.ofType.kind === GraphQLType.List ||
      field.type?.ofType.ofType.kind === GraphQLType.NonNull
    )
      return getTypoTripleDepth();
    if (
      field.type?.kind === GraphQLType.List &&
      field.type?.ofType.kind === GraphQLType.List
    )
      return `[[${field.type.ofType.ofType.name}]]`;
    if (
      field.type?.kind === GraphQLType.List &&
      field.type?.ofType.kind === GraphQLType.NonNull
    )
      return `[${field.type.ofType.ofType.name}!]`;
    if (
      field.type?.kind === GraphQLType.NonNull &&
      field.type?.ofType.kind === GraphQLType.List
    )
      return `[${field.type.ofType.ofType.name}]!`;
    return `[${field.type?.ofType.ofType.name}!]!`;
  };
  const getTypoDepth = () => {
    if (
      field.type?.ofType.kind === GraphQLType.List ||
      field.type?.ofType.kind === GraphQLType.NonNull
    )
      return getTypoDoubleDepth();
    if (field.type?.kind === GraphQLType.List)
      return `[${field.type.ofType.name}]`;
    return `${field.type?.ofType.name}!`;
  };
  const getTypo = () => {
    if (
      field.type?.kind === GraphQLType.List ||
      field.type?.kind === GraphQLType.NonNull
    )
      return getTypoDepth();
    return `${field.type?.name}`;
  };

  const handleClick = () => {
    setDocsTargetName(field.name);
    setDocsTargetType(getTypo()?.replace(/\[|\]|!/g, ''));
    setDocsMethod(method);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.docs__typeBtn}
    >
      <span>{field.name} : </span>
      <span className={styles.docs__typeBtn_type}>{getTypo()}</span>
    </button>
  );
}

export default DocsTypeButton;
