import "./directory-banner.styles.scss";

const DirectoryBanner = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="directory-banner-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="banner-body-container">
        <h2>{title.toUpperCase()}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
  );
};

export default DirectoryBanner;
