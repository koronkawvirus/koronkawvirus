import React from "react"
import {
    EmailIcon
  } from "react-share";
import { useSiteMetadata } from "../../hooks/use-site-metadata"

export default ({title, url}) => {
  const { site } = useSiteMetadata()
  const subject = site.siteMetadata.title + ": " + title
  const emaillink = 'mailto:' + objectToGetParams({ subject: subject, body: site.siteMetadata.title + "\n" + title + "\n" + url});
  return (
    <a
        className="mx-2"
        href={emaillink}
        target="_blank"
        rel="noopener noreferrer"
    >
        <EmailIcon size={32} round />
    </a>
  )
}

function objectToGetParams(object) {
    const params = Object.entries(object)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  
    return params.length > 0 ? `?${params.join('&')}` : '';
  }