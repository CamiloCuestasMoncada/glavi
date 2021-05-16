import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  const imageUrl = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageUrl;
  
}



/*export function getStrapiMedia2(media) {
  const imageUrl2 = media.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media.url;
  return imageUrl2;
  
}*/
