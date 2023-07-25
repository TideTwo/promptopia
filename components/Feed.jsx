"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
  const router = useRouter();

  const handleNameClick = (userId) => {
    router.push("/profile/" + userId);
  };

  return (
    <div className="mt-16 prompt_layout columns-1">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {
              handleTagClick(post.tag);
            }}
            handleNameClick={() => {
              handleNameClick(post.creator._id);
            }}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText.startsWith("#")) {
      setFilteredPosts(
        posts.filter((post) => {
          return post.tag.includes(searchText);
        })
      );
    } else if (searchText.startsWith("@")) {
      setFilteredPosts(
        posts.filter((post) => {
          return post.creator.username.includes(searchText.substring(1));
        })
      );
    } else if (searchText != "") {
      setFilteredPosts(
        posts.filter((post) => {
          return post.prompt.includes(searchText);
        })
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search tag prompt or username"
          value={searchText}
          onChange={(e) => {
            handleSearchChange(e);
          }}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick}></PromptCardList>
    </section>
  );
};

export default Feed;
