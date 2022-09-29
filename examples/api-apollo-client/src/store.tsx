import { InMemoryCache, makeVar, useReactiveVar, useQuery, gql, ApolloProvider, ApolloClient, QueryHookOptions } from "@apollo/client";
import { useInterval } from "react-use"

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        running: {
          read () {
            return runningVar();
          }
        },
        seconds: {
          read () {
            return secondsVar();
          }
        },
      }
    }
  }
});

const runningVar = makeVar(false);
const secondsVar = makeVar(0);

export const useGetSeconds = () => useReactiveVar(secondsVar);
export const useGetRunning = () => {
  const running = useReactiveVar(runningVar);

  useInterval(
    () => secondsVar(secondsVar() + 0.1),
    running ? 100 : null
  );

  return {
    running,
    onToggle: () => {
      runningVar(!runningVar());
    },
  }
}

const GET_NAMES = gql`
  query GetNames {
    names
  }
`

interface Names {
  names?: string[];
}

const EMPTY_NAMES: Names = { names: undefined }
export const useGetNamesQuery = () => {
  const seconds = useGetSeconds()
  const { data } = useQuery<Names>(GET_NAMES, {
    skip: seconds < 2,
    fetchPolicy: 'cache-first',
  })
  
  return data || EMPTY_NAMES;
}

const client = new ApolloClient({
  uri: 'http://localhost:3022/graphql',
  cache,
  connectToDevTools: false,
});

export const ApplicationContextProvider: React.FunctionComponent = ({
  children,
}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);