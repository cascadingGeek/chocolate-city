import { ActivityIndicator, Text, View, ScrollView } from "react-native";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import Artist from "@/utils/types";
import TopArtists from "@/components/TopArtists";
import AllArtists from "@/components/AllArtists";
import { fetchArtists } from "@/utils/fetchAction";

const Artists = () => {
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledScrollView = styled(ScrollView);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchArtists = async () => {
    setLoading(true);
    try {
      const response = await fetchArtists();
      setArtists(response);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchArtists();
  }, []);

  return (
    <StyledView className="w-full h-full bg-black pt-5">
      {loading ? (
        <StyledView className="flex-1 justify-center items-center gap-3">
          <ActivityIndicator size="large" color="#ffffff" />
          <StyledText className="text-white">
            Kindly wait, Fetching Artists data
          </StyledText>
        </StyledView>
      ) : (
        <StyledScrollView>
          <StyledView className="mb-10">
            <StyledText className="text-white font-bold text-lg px-5 mb-5">
              Top Artists
            </StyledText>
            <TopArtists artists={artists} />
          </StyledView>

          <StyledView>
            <StyledText className="text-white font-bold text-lg px-5 mb-5">
              All Artists
            </StyledText>
            <AllArtists artists={artists} />
          </StyledView>
        </StyledScrollView>
      )}
    </StyledView>
  );
};

export default Artists;
