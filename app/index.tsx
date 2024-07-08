import { Image, ScrollView, Text, View } from "react-native";
import "react-native-reanimated";
import { styled } from "nativewind";
import { Link } from "expo-router";
import image from "../constants/index";

const index = () => {
  const StyledView = styled(View);
  const StyledText = styled(Text);

  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
      }}
    >
      <StyledView className="w-full h-full px-5 flex flex-col justify-center items-center">
        <Image
          source={image.logo}
          resizeMode="contain"
          alt="logo"
          style={{
            width: 150,
            height: 150,
          }}
        />
        <StyledText className="text-base text-oswald mb-5 text-white font-bold">
          {" "}
          Welcome to Chocolate City!!!
        </StyledText>
        <StyledView className="w-auto h-auto rounded-xl mb-10">
          <Image
            source={image.cover}
            resizeMode="contain"
            alt="cover image"
            style={{
              width: 300,
              height: 300,
            }}
          />
        </StyledView>
        <Link href="/Artists">
          <StyledView className="w-auto h-auto px-10 py-3 bg-white rounded-lg">
            <StyledText className="text-base font-bold"> Explore </StyledText>
          </StyledView>
        </Link>
      </StyledView>
    </ScrollView>
  );
};

export default index;
