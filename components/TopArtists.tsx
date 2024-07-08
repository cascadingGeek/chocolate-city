import { FlatList, Image, ScrollView, Text, View } from "react-native";
import cover from "../constants/index";
import { styled } from "nativewind";
import Artist from "@/utils/types";
import { FC } from "react";

interface ArtistsProps {
  artists: Artist[];
}

const TopArtists: FC<ArtistsProps> = ({ artists }) => {
  const StyledView = styled(View);
  const StyledText = styled(Text);

  const artist = artists?.slice(0, 5);

  return (
    <FlatList<Artist>
      data={artist}
      keyExtractor={(data) => data?.id?.toString()}
      renderItem={({ item }) => (
        <StyledView className="w-auto h-auto flex flex-col items-center gap-5 mr-5">
          <Image
            source={cover.artistcover}
            resizeMode="contain"
            alt="logo"
            style={{
              width: 250,
              height: 250,
            }}
          />
          <StyledView className="w-full h-auto flex flex-col items-start px-5">
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
      horizontal
    />
  );
};
export default TopArtists;
