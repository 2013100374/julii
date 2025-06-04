import useSearch from '@/app/_hooks/useSearch';
import useUtility from '@/app/_hooks/useUtility';
import { keyToTitle } from '@/lib/helpers';
import React, { useState } from 'react';

export default function Search({ onSearch, setPageNumber, remarks }) {
    const { trans } = useUtility();


    const {
        searchQuery,
        handleInputChange,
        handleSubmit,
        clearSearch,
        clearable
    } = useSearch({ type: '', remark: '', search: '' });

    const [filterIsTrue, setFilterIsTrue] = useState(false)

    return (
        <>
            <div className="filter-search">
                <div className="text-end">
                    <button className='btn btn--base btn-solid' onClick={() => { setFilterIsTrue(!filterIsTrue) }}>
                        <i className='las la-filter'></i>  Filter
                    </button>
                </div>
                {
                    filterIsTrue &&
                    <div className="filter-search-form card custom--card">
                        <div className="card-header flex-between">
                            <h5 className='mb-0'>Filter</h5>
                            <button className='filter-close' onClick={() => { setFilterIsTrue(!filterIsTrue) }}>
                                <i className='las la-times'></i>
                            </button>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => handleSubmit(e, onSearch, setPageNumber)}>
                                <div className="form-group">
                                    <label className="form-label">{trans('Transactions')}</label>
                                    <input
                                        type="text"
                                        name="search"
                                        className="form-control form--control"
                                        value={searchQuery.search}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label d-block">{trans('Type')}</label>
                                    <select
                                        name="type"
                                        className="form-select form--control"
                                        value={searchQuery.type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">{trans('All')}</option>
                                        <option value="plus">{trans('Plus')}</option>
                                        <option value="minus">{trans('Minus')}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label d-block">{trans('Remark')}</label>
                                    <select
                                        name="remark"
                                        className="form-select form--control"
                                        value={searchQuery.remark}
                                        onChange={handleInputChange}
                                    >
                                        {
                                            remarks.map((remark, index) => (
                                                <option key={index} value={remark?.remark}>{keyToTitle(remark?.remark)}</option>
                                            ))
                                        }
                                        <option value="">{trans('All')}</option>
                                    </select>
                                </div>
                                <div className="form-group flex-align flex-nowrap gap-3 mb-0">
                                    <button type="submit" className="btn btn--lg btn--base w-100">
                                        <i className="las la-filter"></i> {trans('Filter')}
                                    </button>
                                    <button type="button" className="btn btn--lg btn--danger w-100" onClick={() => clearSearch(onSearch, setPageNumber)} disabled={!clearable}>
                                        <i className="las la-times"></i> {trans('Clear')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
