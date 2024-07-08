import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { FC } from "react";
import { styled } from "nativewind";

interface AlbumPhotoProps {
  photos: any;
}

const AlbumPhoto: FC<AlbumPhotoProps> = ({ photos }) => {
  const StyledView = styled(View);
  const StyledText = styled(Text);

  return (
    <FlatList
      data={photos}
      keyExtractor={(photo) => photo?.id?.toString()}
      renderItem={({ item }) => (
        <StyledView className="flex flex-col gap-3 items-center mb-5">
          <Image
            source={{ uri: item?.url }}
            style={{ width: 150, height: 150 }}
          />
          <StyledText className="text-base text-white text-center px-5">
            {" "}
            {item?.title}{" "}
          </StyledText>
        </StyledView>
      )}
    />
  );
};
export default AlbumPhoto;
