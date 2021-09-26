import React from "react";
import { Posts } from "../../../components";
import { posts } from "../../../utils/mockPosts";

const GeneralFeed = () => {
  return <Posts posts={posts} />;
};

export default GeneralFeed;
