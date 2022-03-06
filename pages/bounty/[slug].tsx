import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useBounty } from "../../state/bounties/hook";
const imageStr =
  "https://superteam.fun/_next/image?url=https%3A%2F%2Fsuper-static-assets.s3.amazonaws.com%2F75e99297-73de-4946-ba6b-0ac603638793%2Fimages%2F1b3b7fef-bdd1-4b92-993e-c9f0676a995d.png&w=1920&q=80";

const Bounty = () => {
  const router = useRouter();
  const { slug } = router.query;
  const bounty = useBounty(slug as string);

  return (
    <div>
      <img
        src={bounty ? bounty?.image : imageStr}
        className="object-cover w-full h-56"
      />
      <div className="mx-4 mt-3.5 md:mx-16 lg:mx-32 lg:mt-7">
        <div className="flex flex-col">
          <h1 className={"text-2xl font-bold text-primary-500 mb"}>
            {bounty?.title}
          </h1>
          <p className={"text-sm text-black-500"}>
            Deadline: Feb 10th 11:00pm IST{" "}
          </p>
          <p
            className={
              "text-lg text-black-500 mt-5 underline underline-offset-2 cursor-pointer"
            }
          >
            Submit Your Bounty Here
          </p>
        </div>
        <div
          className="flex flex-col mt-3.5 md:mt-7
"
        >
          <h1 className={"text-xl font-bold text-primary-500 mb"}>
            About the Bounty
          </h1>
          <p className={"text-sm text-black-500"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            nisi euismod, consectetur nisi eget, congue nunc. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Donec a nisi euismod,
            consectetur nisi eget, congue nunc. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Donec a nisi euismod, consectetur nisi
            eget, congue nunc. consectetur nisi eget, congue nunc. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Donec a nisi euismod,
            consectetur nisi eget, congue nunc. consectetur nisi eget, congue
            nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            a nisi euismod, consectetur nisi eget, congue nunc. consectetur nisi
            eget, congue nunc. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Donec a nisi euismod, consectetur nisi eget, congue
            nunc.
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
            nisi euismod, consectetur nisi eget, congue nunc. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Donec a nisi euismod,
            consectetur nisi eget, congue nunc. Lorem ipsum dolor sit amet,
          </p>
        </div>

        <div
          className="flex flex-col mt-3.5 md:mt-7
"
        >
          <h1 className={"text-xl font-bold text-primary-500 mb"}>
            Your Mission
          </h1>
          <p className={"text-lg font-semibold text-black-500"}>
            Become an expert on UXD and summarize your findings in a written
            essay.
          </p>

          <ul className={"text-sm text-black-500"}>
            <li>
              ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec a
            </li>
            <li>
              ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec a
            </li>
            <li>
              ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec a
            </li>
          </ul>
        </div>
        <div className="flex flex-col mt-3.5 md:mt-7">
          <h1 className={"text-xl font-bold text-primary-500 mb"}>
            Your Rewards
          </h1>
          <div className="mt-4">
            <p className={"text-lg font-semibold text-black-500"}>
              First Rewards
            </p>

            <ul className={"text-sm text-black-500"}>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className={"text-lg font-semibold text-black-500"}>
              First Reward
            </p>

            <ul className={"text-sm text-black-500"}>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className={"text-lg font-semibold text-black-500"}>
              Second Reward
            </p>

            <ul className={"text-sm text-black-500"}>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
              <li>
                ---- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec a
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center mt-3.5 md:mt-7">
          <Button block className="max-w-xs">
            Submit your Bounty Here{" "}
          </Button>
        </div>
      </div>

      <div className="mx-4 my-16 sm:my-32 sm:mx-10 md:mx-20">
        <div className="flex flex-col">
          <h1 className={"text-xl font-bold text-primary-500 mb"}>
            Similar Bounties
          </h1>
        </div>
        {/* <div className="grid grid-cols-1 gap-y-3 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 mt-7">
          <BountyCard />
          <BountyCard />
          <BountyCard />
          <BountyCard />
        </div> */}
      </div>
    </div>
  );
};

export default Bounty;
