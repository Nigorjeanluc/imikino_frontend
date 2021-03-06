import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import {IMIKINO_URL_IMAGE, BACKEND_URL_IMAGE} from '../../../redux/helpers/backendURLs';

export default function HelmetMetaData(props) {
  const location = useLocation();
  const currentUrl = "https://imikino.rw" + props.slug;
  console.log(props.image, "Images");
  const quote = props.quote !== undefined ? props.quote : "";
  const title = props.title !== undefined ? `Imikino.rw | ${props.title}` : "Imikino.rw - The Sport World is yours to explore";
  const image = props.image !== undefined ? props.image : "imikino";
  const description = props.description !== undefined ? props.description  : "Kurikirana amakuru y'imikino agezweho kuri imikino.rw";
  const hashtag = props.hashtag !== undefined ? props.hashtag : "";
  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      {/* <meta property="image" content={image} /> */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image || require('../../../assets/logo.png')} />
      {/* <meta content="image/*" property="og:image:type" /> */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Imikino" />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}