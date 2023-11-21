import { Component } from 'react';

export class ImageGalleryItem extends Component {
  handleClick = () => {
    const { onImageClick, image } = this.props;
    onImageClick(image);
  };

  render() {
    const { image } = this.props;

    return (
      <li className="gallery-item" onClick={this.handleClick}>
        <img src={image.webformatURL} alt="img" />
      </li>
    );
  }
}
