import DirectoryBanner from "../directory-banner/directory-banner.component";

import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryBanner key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
