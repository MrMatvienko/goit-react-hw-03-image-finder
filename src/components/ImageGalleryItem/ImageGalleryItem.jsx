import { Item } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  openModal = () => {
    const { largeImageURL } = this.props.image;
    // Тут викликаємо функцію для відкриття модального вікна, передаючи URL великого зображення
    this.props.openModal(largeImageURL);
  };

  render() {
    const { webformatURL, tags } = this.props.image;

    return (
      <Item>
        <img
          src={webformatURL}
          alt={tags}
          width={300}
          height={200}
          className="gallery-item"
          onClick={this.openModal}
        />
      </Item>
    );
  }
}
