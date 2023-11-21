import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { PixabayAPI } from 'API/api';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    selectedImage: null,
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const data = await PixabayAPI.fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ isLoading: false });
    }
  };

  handleSearch = ({ query }) => {
    this.setState({ query: query, page: 1, images: [] });
  };
  openModal = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };
  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        {images && (
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}
      </>
    );
  }
}
