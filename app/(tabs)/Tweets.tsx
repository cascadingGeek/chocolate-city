import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import AllTweets from "@/utils/types";
import {
  fetchTweets,
  deleteTweet,
  postTweet,
  updateTweet,
} from "@/utils/fetchAction";
import cover from "../../constants/index";
import Dialog from "react-native-dialog";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const Tweets = () => {
  const [tweets, setTweets] = useState<AllTweets[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTweetId, setSelectedTweetId] = useState<number | null>(null);
  const [dialogDeleteVisible, setDialogDeleteVisible] =
    useState<boolean>(false);
  const [dialogCreateVisible, setDialogCreateVisible] =
    useState<boolean>(false);
  const [dialogUpdateVisible, setDialogUpdateVisible] =
    useState<boolean>(false);
  const [newTweet, setNewTweet] = useState({
    postId: "",
    id: "",
    name: "",
    email: "",
    body: "",
  });
  const [tweetToUpdate, setTweetToUpdate] = useState({
    postId: "",
    id: "",
    name: "",
    email: "",
    body: "",
  });
  const [errors, setErrors] = useState({
    postId: false,
    id: false,
    name: false,
    email: false,
    body: false,
  });

  const handleFetchTweets = async () => {
    setLoading(true);
    try {
      const response = await fetchTweets();
      setTweets(response);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTweet = async () => {
    if (selectedTweetId) {
      setLoading(true);
      try {
        await deleteTweet(selectedTweetId);
        await handleFetchTweets();
      } catch (error) {
        console.error("Error deleting tweet:", error);
      } finally {
        setLoading(false);
        setDialogDeleteVisible(false);
        setSelectedTweetId(null);
      }
    }
  };

  const handleUpdateTweet = async () => {
    if (selectedTweetId) {
      setLoading(true);
      try {
        await updateTweet(selectedTweetId, tweetToUpdate);
        await handleFetchTweets();
      } catch (error) {
        console.error("Error updating tweet:", error);
      } finally {
        setLoading(false);
        setDialogUpdateVisible(false);
        setSelectedTweetId(null);
        setTweetToUpdate({
          postId: "",
          id: "",
          name: "",
          email: "",
          body: "",
        });
      }
    }
  };

  const handleCreateTweet = async () => {
    const { postId, id, name, email, body } = newTweet;
    if (!postId || !id || !name || !email || !body) {
      setErrors({
        postId: !postId,
        id: !id,
        name: !name,
        email: !email,
        body: !body,
      });
      return;
    }

    setLoading(true);
    try {
      await postTweet(newTweet);
      await handleFetchTweets();
    } catch (error) {
      console.error("Error creating tweet:", error);
    } finally {
      setLoading(false);
      setDialogCreateVisible(false);
      setNewTweet({
        postId: "",
        id: "",
        name: "",
        email: "",
        body: "",
      });
      setErrors({
        postId: false,
        id: false,
        name: false,
        email: false,
        body: false,
      });
    }
  };

  const showDeleteDialog = (tweetId: number) => {
    setSelectedTweetId(tweetId);
    setDialogDeleteVisible(true);
  };

  const showUpdateDialog = (tweetId: number, tweet: any) => {
    setSelectedTweetId(tweetId);
    setTweetToUpdate({
      postId: tweet.postId.toString(),
      id: tweet.id.toString(),
      name: tweet.name,
      email: tweet.email,
      body: tweet.body,
    });
    setDialogUpdateVisible(true);
  };

  const hideDeleteDialog = () => {
    setDialogDeleteVisible(false);
    setSelectedTweetId(null);
  };

  const hideUpdateDialog = () => {
    setDialogUpdateVisible(false);
    setSelectedTweetId(null);
    setTweetToUpdate({
      postId: "",
      id: "",
      name: "",
      email: "",
      body: "",
    });
  };

  const showCreateDialog = () => {
    setDialogCreateVisible(true);
  };

  const hideCreateDialog = () => {
    setDialogCreateVisible(false);
    setNewTweet({
      postId: "",
      id: "",
      name: "",
      email: "",
      body: "",
    });
    setErrors({
      postId: false,
      id: false,
      name: false,
      email: false,
      body: false,
    });
  };

  useEffect(() => {
    handleFetchTweets();
  }, []);

  const handleChange = (field: string, value: string) => {
    setNewTweet({ ...newTweet, [field]: value });
    if (!value) {
      setErrors({ ...errors, [field]: true });
    } else {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleUpdateChange = (field: string, value: string) => {
    setTweetToUpdate({ ...tweetToUpdate, [field]: value });
  };

  return (
    <StyledView className="w-full h-full bg-black pt-5">
      {loading ? (
        <StyledView className="flex-1 justify-center items-center gap-3">
          <ActivityIndicator size="large" color="#ffffff" />
          <StyledText className="text-white">
            Kindly wait, Fetching Tweets
          </StyledText>
        </StyledView>
      ) : (
        <>
          <StyledView className="mb-10 relative">
            <StyledText className="text-white font-bold text-lg px-5 mb-5">
              All Tweets
            </StyledText>
            <FlatList
              data={tweets}
              keyExtractor={(data) => data?.id?.toString()}
              renderItem={({ item }) => (
                <StyledView className="w-auto h-auto flex flex-col mb-10 gap-5 relative">
                  <StyledView className="flex flex-row gap-5 items-center">
                    <Image
                      source={cover.user}
                      resizeMode="contain"
                      alt="logo"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 40,
                      }}
                    />
                    <StyledText className="text-gray-500 text-sm">
                      {item?.email}
                    </StyledText>
                  </StyledView>
                  <StyledText className="text-white text-base text-left px-5">
                    {item?.body}
                  </StyledText>
                  <TouchableOpacity
                    style={{ position: "absolute", top: 0, right: 5 }}
                    onPress={() => showDeleteDialog(item.id)}
                  >
                    <StyledText className="text-2xl font-black text-white">
                      {" "}
                      ...{" "}
                    </StyledText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ position: "absolute", top: 0, right: 50 }}
                    onPress={() => showUpdateDialog(item.id, item)}
                  >
                    <StyledText className="text-2xl font-black text-white">
                      {" "}
                      Edit{" "}
                    </StyledText>
                  </TouchableOpacity>
                </StyledView>
              )}
            />

            <Dialog.Container
              visible={dialogDeleteVisible}
              onBackdropPress={hideDeleteDialog}
            >
              <StyledText className="text-center text-base font-bold">
                {" "}
                Delete this tweet?.{" "}
              </StyledText>
              <Dialog.Button label="Close" onPress={hideDeleteDialog} />
              <Dialog.Button label="Delete" onPress={handleDeleteTweet} />
            </Dialog.Container>

            <Dialog.Container
              visible={dialogUpdateVisible}
              onBackdropPress={hideUpdateDialog}
            >
              <StyledText className="text-black font-bold text-lg text-center mb-3">
                {" "}
                Update Tweet{" "}
              </StyledText>
              <StyledTextInput
                placeholder="Post ID"
                value={tweetToUpdate.postId}
                onChangeText={(text) => handleUpdateChange("postId", text)}
                className="border border-gray-500 mb-5 px-3 py-2 rounded-lg"
              />
              <StyledTextInput
                placeholder="ID"
                value={tweetToUpdate.id}
                onChangeText={(text) => handleUpdateChange("id", text)}
                className="border border-gray-500 mb-5 px-3 py-2 rounded-lg"
              />
              <StyledTextInput
                placeholder="Name"
                value={tweetToUpdate.name}
                onChangeText={(text) => handleUpdateChange("name", text)}
                className="border border-gray-500 mb-5 px-3 py-2 rounded-lg"
              />
              <StyledTextInput
                placeholder="Email"
                value={tweetToUpdate.email}
                onChangeText={(text) => handleUpdateChange("email", text)}
                className="border border-gray-500 mb-5 px-3 py-2 rounded-lg"
              />
              <StyledTextInput
                placeholder="Body"
                value={tweetToUpdate.body}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => handleUpdateChange("body", text)}
                className="border border-gray-500 mb-5 px-3 py-2 rounded-lg"
                style={{ textAlignVertical: "top" }}
              />
              <Dialog.Button label="Cancel" onPress={hideUpdateDialog} />
              <Dialog.Button label="Update" onPress={handleUpdateTweet} />
            </Dialog.Container>
          </StyledView>

          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 30,
              right: 30,
              backgroundColor: "white",
              borderRadius: 50,
              padding: 10,
            }}
            onPress={showCreateDialog}
          >
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>

          <Dialog.Container
            visible={dialogCreateVisible}
            onBackdropPress={hideCreateDialog}
          >
            <StyledText className="text-black font-bold text-lg text-center mb-3">
              {" "}
              Create Tweet{" "}
            </StyledText>
            <StyledTextInput
              placeholder="Post ID"
              value={newTweet.postId}
              onChangeText={(text) => handleChange("postId", text)}
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } border mb-5 px-3 py-2 rounded-lg`}
            />
            <StyledTextInput
              placeholder="ID"
              value={newTweet.id}
              onChangeText={(text) => handleChange("id", text)}
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } border mb-5 px-3 py-2 rounded-lg`}
            />
            <StyledTextInput
              placeholder="Name"
              value={newTweet.name}
              onChangeText={(text) => handleChange("name", text)}
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } border mb-5 px-3 py-2 rounded-lg`}
            />
            <StyledTextInput
              placeholder="Email"
              value={newTweet.email}
              onChangeText={(text) => handleChange("email", text)}
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } border mb-5 px-3 py-2 rounded-lg`}
            />
            <StyledTextInput
              placeholder="Body"
              value={newTweet.body}
              onChangeText={(text) => handleChange("body", text)}
              multiline={true}
              numberOfLines={4}
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } border mb-5 px-3 py-2 rounded-lg`}
              style={{ textAlignVertical: "top" }}
            />
            <Dialog.Button label="Cancel" onPress={hideCreateDialog} />
            <Dialog.Button label="Send" onPress={handleCreateTweet} />
          </Dialog.Container>
        </>
      )}
    </StyledView>
  );
};

export default Tweets;
