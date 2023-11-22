import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'API/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import Notiflix from 'notiflix';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: null,
    isLoading: false,
    error: null,
    page: 1,
    isButtonShow: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      if (query !== '') {
        this.fetchImages(query, page);
      }
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await getImages(query, page);

      if (!data.totalHits || !query) {
        this.setState({
          isButtonShow: false,
          error: true,
          isLoading: false,
        });
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        this.setState(prevState => ({
          images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
          isButtonShow: true,
          isLoading: false,
        }));
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({ query }, () => {
      this.fetchImages(query, this.state.page);
    });
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };
  render() {
    const { images, isButtonShow, isLoading } = this.state;
    return (
      <>
        <Searchbar handleSearch={this.handleSubmit} />
        <ImageGallery images={images} />
        {isButtonShow && <LoadMoreButton onClick={this.onLoadMore} />}
        {isLoading && <Loader />}
      </>
    );
  }
}
