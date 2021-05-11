import PropTypes from 'prop-types';

export default function MovieTitle(props) {
  return <div>{props.title}</div>;
}

MovieTitle.propTypes = {
  title: PropTypes.string
};
