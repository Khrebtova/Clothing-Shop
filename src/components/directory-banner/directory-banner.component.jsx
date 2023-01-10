import {
  BackgroundImage,
  Body,
  DirectoryBannerContainer,
} from "./directory-banner.styles";
import { useNavigate } from "react-router-dom";

const DirectoryBanner = ({ category }) => {
  const navigate = useNavigate();

  const { imageUrl, title } = category;
  return (
    <DirectoryBannerContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body onClick={() => navigate(`shop/${title}`)}>
        <h2>{title.toUpperCase()}</h2>
        <p>SHOP NOW</p>
      </Body>
    </DirectoryBannerContainer>
  );
};

export default DirectoryBanner;
