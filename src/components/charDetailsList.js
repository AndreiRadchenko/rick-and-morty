export const CharDetails = ({ charInfo: { gender, status, species, origin, type } }) => {
  return (
    <>
      <div>
        <h3>Gender</h3>
        <p>{gender}</p>
      </div>
      <div>
        <h3>Status</h3>
        <p>{status}</p>
      </div>
      <div>
        <h3>Species</h3>
        <p>{species}</p>
      </div>
      <div>
        <h3>Origin</h3>
        <p>{origin}</p>
      </div>
      <div>
        <h3>Type</h3>
        <p>{type}</p>
      </div>
    </>
  );
};
