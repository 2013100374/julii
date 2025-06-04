function LinkItem({
    isLinkActive,
    isLinkDisabled,
    isLinkUrl,
    linkLabel,
    handlePaginationUrl,
    link
}) {
   
    return (
        <li className={`page-item ${isLinkActive} ${isLinkDisabled}`}>
            {!isLinkUrl ? (
                <span className="page-link">{linkLabel === '‹' ? 'Prev' : (linkLabel === '›' ? 'Next' : linkLabel)}</span>
            ) : (
                <span
                    className="page-link"
                    onClick={() => handlePaginationUrl(link.url)}
                >
                    {linkLabel === '‹' ? 'Prev' : (linkLabel === '›' ? 'Next' : linkLabel)}
                </span>
            )}
        </li>
    );
}

export default function Pagination({ loading, pagination }) {



    const isPaginationValid = pagination && pagination.total > pagination.per_page;

    const handlePaginationUrl = (url) => {
        const page = url.split('page=')[1];
        if (page) {
            const currentUrl = new URL(window.location);

            currentUrl.searchParams.set('page', page);

            window.history.pushState({}, '', currentUrl.toString());
        }
    };

    if (!isPaginationValid || loading) {
        return null;
    }

    return (
        <div className="card-footer">
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {pagination?.links?.map((link, index) => {
                        const isLinkActive = link.active ? 'active' : '';
                        const isLinkDisabled = !link.url ? 'disabled' : '';
                        const isLinkUrl = link.url;
                        const linkLabel = link.label;

                        return (
                            <LinkItem
                                key={index}
                                isLinkActive={isLinkActive}
                                isLinkDisabled={isLinkDisabled}
                                isLinkUrl={isLinkUrl}
                                linkLabel={linkLabel}
                                handlePaginationUrl={handlePaginationUrl}
                                link={link}
                            />
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
