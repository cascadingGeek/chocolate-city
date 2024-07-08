import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import AllAlbums from "@/utils/types";
import { fetchAlbumPhotos, fetchAlbums } from "@/utils/fetchAction";
import AlbumPhoto from "@/components/AlbumPhoto";
import cover from "../../constants/index";

const Albums = () => {
  const StyledView = styled(View);
  const StyledText = styled(Text);

  const [albums, setAlbums] = useState<AllAlbums[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  const handleFetchAllAlbums = async () => {
    setLoading(true);
    try {
      const response = await fetchAlbums();
      setAlbums(response);

      if (response.length > 0) {
        const albumId = response[0].id;
        await handleFetchAlbumPhotos(albumId);
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAlbumPhotos = async (albumId: number) => {
    setLoading(true);
    try {
      const response = await fetchAlbumPhotos(albumId);
      setPhotos(response);
      setSelectedAlbumId(albumId);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching album photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllAlbums();
  }, []);

  return (
    <StyledView className="w-full h-full bg-black pt-5">
      {loading ? (
        <StyledView className="flex-1 justify-center items-center gap-3">
          <ActivityIndicator size="large" color="#ffffff" />
          <StyledText className="text-white">
            Kindly wait, Fetching Albums
          </StyledText>
        </StyledView>
      ) : (
        <>
          <StyledView className="mb-10">
            <StyledText className="text-white font-bold text-lg px-5 mb-5">
              All Albums
            </StyledText>
            <FlatList<AllAlbums>
              data={albums}
              keyExtractor={(data) => data?.id?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleFetchAlbumPhotos(item.id)}
                >
                  <StyledView className="w-auto h-auto flex flex-row items-center mb-10 gap-5">
                    <Image
                      source={cover.albumcover}
                      resizeMode="contain"
                      alt="logo"
                      style={{
                        width: 80,
                        height: 80,
                      }}
                    />
                    <StyledText className="text-white text-base">
                      {item?.title.slice(0, 30)}
                    </StyledText>
                  </StyledView>
                </TouchableOpacity>
              )}
            />
          </StyledView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <StyledView className="flex-1 justify-center items-center bg-black bg-opacity-75">
              <StyledView className="w-11/12 h-auto bg-black rounded-lg p-5">
                <StyledText className="text-white font-bold text-lg mb-5 mt-10">
                  Album Photos
                </StyledText>
                <AlbumPhoto photos={photos} />
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{ marginTop: 10 }}
                >
                  <StyledText className="text-blue-500">Close</StyledText>
                </TouchableOpacity>
              </StyledView>
            </StyledView>
          </Modal>
        </>
      )}
    </StyledView>
  );
};
export default Albums;
