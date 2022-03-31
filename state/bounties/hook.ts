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
    admin
    winners{
      id
      hunter{
        id
      }
    }
  }
}`;

// @ts-ignore TYPE NEEDS FIXING
const fetcher = (query) =>
  request("https://api.thegraph.com/subgraphs/name/jds-23/bounty-maker", query);

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
  admin: string;
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
      admin: string;
    }) => {
      const reward = bounty.rewards.reduce(
        (partialSum, a) => partialSum + parseFloat(a),
        0
      );
      return {
        ...metadata[bounty.admin],
        id: bounty.id,
        active: bounty.active,
        admin: bounty.admin,
        reward,
        tokenLimit: parseFloat(bounty.tokenLimit),
        deadline: bounty.deadline,
        uri: bounty.uri,
      };
    }
  );
}

export function useAdminBounties(account: string | undefined | null): {
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
  admin: string;
}[] {
  const bounties = useBounties();
  return account
    ? bounties?.filter(
        (bounty) => bounty.admin.toLowerCase() === account.toLowerCase()
      )
    : [];
}

export function useBounty(id: string):
  | undefined
  | {
      id: string;
      reward: number;
      rewards: number[];
      tokenLimit: number;
      deadline: string;
      uri: string;
      company: string;
      title: string;
      type: string;
      image: string;
      active: boolean;
      admin: string;
    } {
  const { data } = useSWR(QUERY, fetcher);
  const bounty: {
    id: string;
    active: boolean;
    rewards: string[];
    uri: string;
    tokenLimit: string;
    deadline: string;
    admin: string;
  } = data?.bounties?.find(
    (bounty: {
      id: string;
      active: boolean;
      rewards: string[];
      uri: string;
      tokenLimit: string;
      deadline: string;
      admin: string;
    }) => bounty.id === id
  );
  if (bounty) {
    const reward = bounty.rewards.reduce(
      (partialSum, a) => partialSum + parseFloat(a),
      0
    );
    return {
      ...metadata[bounty.admin],
      id: bounty.id,
      reward,
      rewards: bounty.rewards.map((a) => parseFloat(a)),
      tokenLimit: parseFloat(bounty.tokenLimit),
      deadline: bounty.deadline,
      uri: bounty.uri,
      active: bounty.active,
      admin: bounty.admin,
    };
  }
  return undefined;
}
