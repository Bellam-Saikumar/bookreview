import React, { useState } from "react";
import './Home.css';
import Header from "../../components/Header/Header";
import ExploreBooks from "../../components/ExploreBooks/ExploreBooks";
import AppDownload from "../../components/AppDownload/AppDownload";
import FeatureBooks from "../../components/FeatureBooks/FeatureBooks";

function Home() {
  const [category, setCategory] = useState("All");
  const url = "https://bookreview-backend-q0jw.onrender.com"; 

  return (
    <div className="home">
      <Header />
      <ExploreBooks url={url} setCategory={setCategory} />
       <FeatureBooks category={category} url={url} />
      <AppDownload />
    </div>
  );
}

export default Home;
