import { request } from "graphql-request";
import useSWR from "swr";
import data from "./metadata.json";
const metadata: {
  [key: string]: {
    company: string;
    title: string;
    type: string;
    image: string;
  };
} = data;
const QUERY = `{
  bounties(first: 10) {
    id
    active
    rewards
    uri
    tokenLimit
    deadline
  }
}`;

// @ts-ignore TYPE NEEDS FIXING
const fetcher = (query) =>
  request("https://api.thegraph.com/subgraphs/name/jds-23/bunty", query);

// Returns ratio of bounties
export function useBounties(): {
  id: string;
  reward: number;
  tokenLimit: number;
  deadline: string;
  uri: string;
  company: string;
  title: string;
  type: string;
  image: string;
  active: boolean;
}[] {
  const { data } = useSWR(QUERY, fetcher);
  return data?.bounties?.map(
    (bounty: {
      id: string;
      active: boolean;
      rewards: string[];
      uri: string;
      tokenLimit: string;
      deadline: string;
    }) => {
      const reward = bounty.rewards.reduce(
        (partialSum, a) => partialSum + parseFloat(a),
        0
      );
      return {
        ...metadata[bounty.id],
        id: bounty.id,
        active: bounty.active,
        reward,
        tokenLimit: parseFloat(bounty.tokenLimit),
        deadline: bounty.deadline,
        uri: bounty.uri,
      };
    }
  );
}

export function useBounty(id: string):
  | undefined
  | {
      id: string;
      reward: number;
      tokenLimit: number;
      deadline: string;
      uri: string;
      company: string;
      title: string;
      type: string;
      image: string;
    } {
  const { data } = useSWR(QUERY, fetcher);
  const bounty: {
    id: string;
    active: boolean;
    rewards: string[];
    uri: string;
    tokenLimit: string;
    deadline: string;
  } = data?.bounties?.find(
    (bounty: {
      id: string;
      active: boolean;
      rewards: string[];
      uri: string;
      tokenLimit: string;
      deadline: string;
    }) => bounty.id === id
  );
  if (bounty)
    return {
      ...metadata[bounty.id],
      id: bounty.id,
      reward: 0,
      tokenLimit: parseFloat(bounty.tokenLimit),
      deadline: bounty.deadline,
      uri: bounty.uri,
    };
  return undefined;
}
