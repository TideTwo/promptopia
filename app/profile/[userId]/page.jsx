"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import MyProfile from "@components/Profile";

const Profile = () => {
  const router = useRouter();
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("../api/users/" + userId + "/posts");
      const data = await response.json();
      setPosts(data);
      console.log(posts);
    };
    if (userId) {
      fetchPosts();
    }
  }, []);

  if (posts.length > 0) {
    return <MyProfile name={posts[0].creator.username + "'s"} desc={"Prompts posted by by " + posts[0].creator.username + " for you to try yourself!"} data={posts} handleEdit={null} handleDelete={null} />;
  }
};

export default Profile;
