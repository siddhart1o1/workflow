import React from "react";
import { Helmet } from "react-helmet-async";
import propTypes from "prop-types";
function SEO({ title, description, name, type }) {
  return (
    <Helmet prioritizeSeoTags deffaultTitle="IBR InfoTech">
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
}
SEO.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
};

export default SEO;
