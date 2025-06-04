import useSearch from "@/app/_hooks/useSearch";
import useUtility from "@/app/_hooks/useUtility";

export default function Search({ onSearch, setPageNumber }) {
    const { trans } = useUtility();

    const {
        searchQuery,
        handleInputChange,
        handleSubmit,
        clearSearch,
        clearable
    } = useSearch({ search: '' });

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, onSearch, setPageNumber)}>
                <div className="table-search-wrapper">
                    <div className="input-group">
                        <input
                            type="text"
                            name="search"
                            className="form-control form--control"
                            placeholder={trans('Search by transactions')}
                            value={searchQuery.search}
                            onChange={handleInputChange}
                        />
                        <button type="button" className="clear-search" onClick={() => clearSearch(onSearch, setPageNumber)} disabled={!clearable}>
                            <i className="las la-times"></i>
                        </button>
                        <button className="input-group-text bg--base text-white" type="submit">
                            <i className="las la-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
