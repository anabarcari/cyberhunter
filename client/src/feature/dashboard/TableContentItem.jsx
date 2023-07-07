import PropTypes from "prop-types";

const TableContentItem = ({ tableContent }) => {
  const { name, description } = { ...tableContent };

  return (
    <>
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </>
  );
};

TableContentItem.propTypes = { tableContent: PropTypes.object };

export default TableContentItem;
