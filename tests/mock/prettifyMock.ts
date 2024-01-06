export const initialQueryMock = `query {characters(page: 2,filter:  {name: "rick"}) {info {count}results {name}}location(id: 1){id}episodesByIds(ids: [1,2]) {id}}`;

export const prettifiedQueryMock = `query {
  characters(page: 2, filter:  {
    name: "rick"
  }
  ) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [ 1, 2]) {
    id
  }
}
`;

export const brokenQueryMock = `query {characters(page: 2,filter:  {name: "rick"}) {info {count}results {name}}location(id: 1){id}episodesByIds(ids: [1,2]) {id}`;
