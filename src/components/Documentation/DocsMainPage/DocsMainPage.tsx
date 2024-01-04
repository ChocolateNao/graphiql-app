import { GraphQLSchema } from 'models/GraphQLSchema.interface';

import DocsTypeButton from '../DocsTypeButton/DocsTypeButton';

import styles from '../Documentation.module.scss';

interface DocsMainProps {
  schema: GraphQLSchema;
}

function DocsList(props: DocsMainProps) {
  const { schema } = props;

  const queryEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.queryType?.name
  );
  const mutationEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.mutationType?.name
  );
  const subscriptionEntryObject = schema.data.__schema.types.find(
    (type) => type.name === schema.data.__schema.subscriptionType?.name
  );

  return (
    <div>
      <div className={styles.docs__content}>
        {queryEntryObject && (
          <>
            <h2>Queries</h2>
            <span>{queryEntryObject.description}</span>
            {queryEntryObject.fields.map((field) => (
              <DocsTypeButton field={field} key={field.name} />
            ))}
          </>
        )}
        {mutationEntryObject && (
          <>
            <h2>Queries</h2>
            <span>{mutationEntryObject.description}</span>
          </>
        )}
        {subscriptionEntryObject && (
          <>
            <h2>Queries</h2>
            <span>{subscriptionEntryObject.description}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default DocsList;
