import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";

import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../store/api/postsApi";

const PostList = () => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const { data: allPosts, isLoading, isError } = useGetPostsQuery({});
  const [deletePost] = useDeletePostMutation();

  if (isLoading) {
    return <Text>Loading posts...</Text>;
  }

  if (isError || !allPosts) {
    return <Text>Failed to load posts.</Text>;
  }

  const publicPosts = allPosts.filter((post) => !post.private);
  const privatePosts = allPosts.filter(
    (post) => post.private && post.createdBy === loggedInAs?.id,
  );

  const handleDelete = (postId) => {
    console.log(`Deleting post with ID: ${postId}, Type: ${typeof postId}`);
    deletePost(postId); // Skicka postId direkt som en sträng
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postText}>{item.text}</Text>
      <Text style={styles.postInfo}>
        Posted by: {item.createdBy} on {item.createdDate}
      </Text>
      {loggedInAs?.id === item.createdBy && (
        <Button title="Delete Post" onPress={() => handleDelete(item.id)} />
      )}
    </View>
  );

  return (
    <View>
      <Text style={styles.sectionTitle}>Public Posts</Text>
      <FlatList
        data={publicPosts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `post-${index}`}
      />

      <Text style={styles.sectionTitle}>Private Posts</Text>
      <FlatList
        data={privatePosts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `private-post-${index}`}
      />
    </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
});

export default PostList;
