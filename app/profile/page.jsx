"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import MyProfile from "@components/Profile";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/users/" + session?.user.id + "/posts");
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push("/update-prompt?id=" + post._id);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Delete prompt?");
    if (hasConfirmed) {
      try {
        await fetch("api/prompt/" + post._id.toString(), { method: "DELETE" });

        const filteredPosts = posts.filter((p) => {
          return post._id !== p._id;
        });

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return <MyProfile name="My" desc="Welcome to your profile page." data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />;
};

export default Profile;
