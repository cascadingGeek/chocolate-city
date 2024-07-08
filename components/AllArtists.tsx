import { FlatList, Image, ScrollView, Text, View } from "react-native";
import cover from "../constants/index";
import { styled } from "nativewind";
import Artist from "@/utils/types";
import { FC } from "react";

interface ArtistsProps {
  artists: Artist[];
}

const AllArtists: FC<ArtistsProps> = ({ artists }) => {
  const StyledView = styled(View);
  const StyledText = styled(Text);

  return (
    <FlatList<Artist>
      data={artists}
      keyExtractor={(data) => data?.id?.toString()}
      renderItem={({ item }) => (
        <StyledView className="w-auto h-auto flex flex-col items-center mb-10 gap-5">
          <Image
            source={cover.artistcover}
            resizeMode="contain"
            alt="logo"
            style={{
              width: 300,
              height: 300,
            }}
          />
          <StyledView className="w-full h-auto flex flex-col items-start px-10">
            <StyledView className="w-auto h-auto flex flex-row items-center">
              <StyledText className="text-gray-500 text-sm">Alias: </StyledText>
              <StyledText className="text-white text-base">
                {item?.username}
              </StyledText>
            </StyledView>
            <StyledView className="w-auto h-auto flex flex-row items-center">
              <StyledText className="text-gray-500 text-sm">
                Full Name:{" "}
              </StyledText>
              <StyledText className="text-white text-lg">
                {item?.name}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      )}
    />
  );
};
export default AllArtists;
