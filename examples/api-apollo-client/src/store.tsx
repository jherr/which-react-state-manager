import { InMemoryCache, makeVar, useReactiveVar, useQuery, gql, QueryHookOptions, ApolloProvider, ApolloClient, HttpLink } from "@apollo/client";
import { useInterval } from "react-use"

interface ApplicationState {
  seconds: number;
  running: boolean;
  names?: string[];
  onToggle: () => void;
}

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

const GET_NAMES = gql`
  query GetNames {
    names
  }
`

interface Names {
  names?: string[];
}

// export const useGetNamesQuery = (options?: QueryHookOptions) => {
//   const seconds = useReactiveVar(secondsVar)
//   console.log('seconds', seconds, seconds < 2)
//   return useQuery<Names>(GET_NAMES, {
//     skip: seconds < 2,
//     ...options,
//     onCompleted(data) {
//       console.log('completed', data)
//     }
//   })
// }

export const useApplicationState = (): ApplicationState => {
  const seconds = useReactiveVar(secondsVar);
  const running = useReactiveVar(runningVar);
  // console.log('seconds', seconds, seconds < 2)
  const { data } = useQuery<Names>(GET_NAMES, {
    skip: seconds < 2,
  })
  // console.log('data:', data)

  useInterval(
    () => secondsVar(secondsVar() + 0.1),
    running ? 100 : null
  );

  return {
    seconds,
    running,
    onToggle: () => {
      runningVar(!runningVar())
    },
    names: data?.names,
  };
};

// const link = new HttpLink({
//   uri: 'http://localhost:3022/graphql',
//   fetch,
//   // Use explicit `window.fetch` so tha outgoing requests
//   // are captured and deferred until the Service Worker is ready.
//   // fetch: (...args) => fetch(...args),
// })

export const client = new ApolloClient({
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