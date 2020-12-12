import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import {IMIKINO_URL_IMAGE, BACKEND_URL_IMAGE} from '../../../redux/helpers/backendURLs';

export default function HelmetMetaData(props) {
  let location = useLocation();
  let currentUrl = "http://imikino.rw" + location.pathname;
  let quote = props.quote !== undefined ? props.quote : "";
  let title = props.title !== undefined ? `Imikino.rw | ${props.title}` : "Imikino.rw - The Sport World is yours to explore";
  let image = props.image !== undefined ? props.image : "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/118464444_895490777523953_6899795143075920813_o.jpg?_nc_cat=102&ccb=2&_nc_sid=e3f864&_nc_eui2=AeEfg_oFtPNNSi1x-b8jR_icmQqV4J4DQzSZCpXgngNDNLlOr00Y5SzDuqK3wsJqURCxI876CeLAfBmALYVtOl7Q&_nc_ohc=VOhuLoN0n0YAX-IJfx7&_nc_ht=scontent-amt2-1.xx&oh=8696731806e8c3190d9477e902b4b98c&oe=5FF7EEAE";
  let description = props.description !== undefined ? props.description  : "Kurikirana amakuru y'imikino agezweho kuri imikino.rw";
  let hashtag = props.hashtag !== undefined ? props.hashtag : "#imikino.rw";
  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}