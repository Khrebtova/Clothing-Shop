import DirectoryBanner from "../directory-banner/directory-banner.component";
import hats from '../../assets/categories/hats.jpg';
import jackets from '../../assets/categories/jackets.jpg';
import sneakers from '../../assets/categories/sneakers.jpg';
import womens from '../../assets/categories/women.jpg';
import mens from '../../assets/categories/men.jpg';
import { DirectoryMenuContainer } from "./directory.styles.jsx";

const Directory = () => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: `${hats}`,
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: `${jackets}`,
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: `${sneakers}`,
    },
    {
      id: 4,
      title: "womens",
      imageUrl: `${womens}`,
    },
    {
      id: 5,
      title: "mens",
      imageUrl: `${mens}`,
    },
  ];

  return (
    <DirectoryMenuContainer>
      {categories.map((category) => (
        <DirectoryBanner key={category.id} category={category} />
      ))}
    </DirectoryMenuContainer>
  );
};

export default Directory;
