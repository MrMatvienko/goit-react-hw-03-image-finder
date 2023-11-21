import { Formik } from 'formik';
export const Searchbar = ({ handleSearch }) => {
  return (
    <header className="searchbar">
      <Formik initialValues={{ query: '' }} onSubmit={handleSearch}>
        {formik => {
          return (
            <form className="form">
              <button type="submit" className="button">
                <span className="button-label">Search</span>
              </button>
              <input
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="query"
                value={formik.values.query}
                onChange={formik.handleChange}
              />
            </form>
          );
        }}
      </Formik>
    </header>
  );
};
