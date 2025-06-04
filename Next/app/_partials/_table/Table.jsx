import Pagination from "../Pagination";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

export const Table = ({
  columns,
  loading,
  showPagination = null,
  data,
  skeletonHeight = 40
}) => {

  const paginateContent = (
    <Pagination
      loading={loading}
      pagination={data}
    />
  );

  if (data && data.hasOwnProperty("data") && typeof showPagination !== "boolean") {
    showPagination = true;
  }

  return (
    <>
      <table className="table table table--responsive--lg">
        <TableHeader columns={columns} />
        <TableBody
          loading={loading}
          columns={columns}
          data={data?.data}
          skeletonHeight={skeletonHeight}
        />
      </table>
      {showPagination ? paginateContent : null}
    </>

  );
}
