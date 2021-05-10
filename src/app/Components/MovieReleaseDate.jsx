import PropTypes from "prop-types";

export default function MovieReleaseDate(props) {
  return <div>{props.releaseDate}</div>;
}

MovieReleaseDate.propTypes = {
  releaseDate: PropTypes.string
};

