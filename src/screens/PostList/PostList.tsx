import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { useGetPostsQuery } from "../../store/api/postsApi"; // Antag att detta är din API-hook för att häämta posts

const PostList = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery({});

  if (isLoading) {
    return <Text>Loading posts...</Text>;
  }

  if (isError || !posts) {
    return <Text>Failed to load posts.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postText}>{item.text}</Text>
      <Text style={styles.postInfo}>
        Posted by: {item.createdBy} on {item.createdDate}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item, index) => `post-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postText: {
    fontSize: 16,
  },
  postInfo: {
    fontSize: 12,
    color: "grey",
    marginTop: 5,
  },
});

export default PostList;
