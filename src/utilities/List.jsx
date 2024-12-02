import React from 'react';
import PropTypes from 'prop-types';

const List = ({ items, ordered, renderItem, className, style }) => {
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <ListTag className={className} style={style}>
      {items.map((item, index) => (
        <li key={index}>
          {renderItem ? renderItem(item, index) : item}
        </li>
      ))}
    </ListTag>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])).isRequired,
  ordered: PropTypes.bool,
  renderItem: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

List.defaultProps = {
  ordered: false,
  renderItem: null,
  className: '',
  style: {},
};

export default List;
